from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator, EmailValidator

class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField(
        validators=[
            MinValueValidator(1, message="Age must be at least 1"),
            MaxValueValidator(50, message="Age must be at most 50")
        ]
    )
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator(message="Enter a valid email")]
    )
    
    def __str__(self):
        return f"{self.name} (ID: {self.id})"
    
    class Meta:
        ordering = ['id']