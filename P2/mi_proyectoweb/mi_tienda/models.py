from django.db import models

# Create your models here.
class ClaseA(models.Model):
    """Modelo de datos de mis productos"""

    nombre = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    COMBUSTIBLE = (
        ('Diesel', 'Diesel'),
    )
    MOTOR = (
        ('Basic','Basic - 130CV'),
        ('Normal','Normal - 190CV'),
        ('AMG', 'AMG - 280CV'),
    )
    combustible = models.CharField(max_length=10, choices=COMBUSTIBLE)
    motor = models.CharField(max_length=10, choices=MOTOR)
    precio = models.FloatField()

    def __str__(self):
        return self.nombre

class ClaseGLE(models.Model):
    """Modelo de datos de mis productos"""

    nombre = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    COMBUSTIBLE = (
        ('Hibrido', 'Hibrido'),
    )
    MOTOR = (
        ('Normal','Normal - 260CV'),
        ('AMG', 'AMG - 400CV'),
    )
    combustible = models.CharField(max_length=10, choices=COMBUSTIBLE)
    motor = models.CharField(max_length=10, choices=MOTOR)
    precio = models.FloatField()

    def __str__(self):
        return self.nombre

class ClaseAMG(models.Model):
    """Modelo de datos de mis productos"""

    nombre = models.CharField(max_length=50)
    stock = models.IntegerField(default=0)
    COMBUSTIBLE = (
        ('Gasolina', 'Gasolina'),
    )
    MOTOR = (
        ('AMG', 'AMG - 620CV'),
    )
    combustible = models.CharField(max_length=10, choices=COMBUSTIBLE)
    motor = models.CharField(max_length=10, choices=MOTOR)
    precio = models.FloatField()

    def __str__(self):
        return self.nombre

class Pedido(models.Model):
    """Modelo de datos de mis productos"""
    nombre = models.CharField(max_length=50)
    telefono = models.CharField(max_length=50)
    e_mail = models.CharField(max_length=50)
    articulo = models.CharField(max_length=50)
    # -- Usamos el nombre para identificar
    # -- el producto
    def __str__(self):
        return self.nombre
