from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from app.db import Base
from sqlalchemy.sql import func


class Comment(Base):
    __tablename__ = "comments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    text: Mapped[str] = mapped_column(String(500), nullable=False)
    createdAt : Mapped[DateTime]= mapped_column(DateTime(timezone=True), server_default=func.now(), nullable=False) # pylint: disable=not-callable
