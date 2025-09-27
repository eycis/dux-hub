# pylint: disable=wrong-import-order,ungrouped-imports,no-member
from pathlib import Path
import sys
from typing import cast
from logging.config import fileConfig

from alembic import context
from alembic.config import Config
from sqlalchemy import engine_from_config, pool

# --- zpřístupni balíček "app" (počítáme strukturu .../backend/app)
this_file = Path(__file__).resolve()
backend_dir = this_file.parents[1]  # .../backend
sys.path.insert(0, str(backend_dir))

# tyto importy MUSÍ být až po sys.path.insert
from app.db import Base
from app.core.settings import settings
from app.models import experiment  # noqa: F401  (důležité: registruje model)

# Alembic config
config = cast(Config, context.config)

# logging
if config.config_file_name:
    fileConfig(config.config_file_name)

# nastav DB URL z .env (přepíše případný placeholder v alembic.ini)
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# KLÍČOVÉ pro --autogenerate:
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
