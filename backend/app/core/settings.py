from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_PREFIX: str = "/api"
    CORS_ORIGINS: list[str] = ["http://localhost:4200"]

settings = Settings()