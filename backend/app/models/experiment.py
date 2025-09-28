from sqlalchemy import ForeignKey, String, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.db import Base

class Experiment(Base): 
    __tablename__= "experiments"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False, unique=True)
    hypothesis: Mapped[str] = mapped_column(String(1000), nullable=False)
    status: Mapped[str] = mapped_column(String(20), default="draft", nullable=False)

    variants: Mapped[list["ExperimentVariant"]] = relationship(
        back_populates = "experiment", cascade = "all, delete-orphan")

class ExperimentVariant(Base): 
    __tablename__ = "experiment_variants"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    experiment_id : Mapped[int] = mapped_column(ForeignKey("experiments.id", ondelete="CASCADE"))
    key: Mapped[str] = mapped_column(String(10), nullable=False)
    description: Mapped[str | None] = mapped_column(String(200))
    weight: Mapped[int] = mapped_column(Integer, default=50)

    experiment : Mapped["Experiment"] = relationship(back_populates="variants")
