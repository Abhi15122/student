from rest_framework import serializers
from django.core.validators import RegexValidator
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        validators=[
            RegexValidator(
                regex=r'^[A-Za-z\s]+$', 
                message='Name must contain only letters and spaces'
            )
        ]
    )
    
    class Meta:
        model = Student
        fields = ['id', 'name', 'age', 'email']
        extra_kwargs = {
            'name': {'required': True},
            'age': {'required': True},
            'email': {'required': True}
        }
    
    def validate_name(self, value):
        # Additional name validation
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long")
        return value
    
    def validate_age(self, value):
        # Ensure age is within specified range
        if value < 1 or value > 50:
            raise serializers.ValidationError("Age must be between 1 and 50")
        return value