from django.db import models

# Create your models here.

class Categoria(models.Model):
    nombreCat = models.CharField(max_length=50)
    id_cat = models.AutoField(db_column='idCategoria', primary_key=True, null=False) 
    
    def __str__(self):
        return self.nombreCat

class Producto(models.Model):
    nombreProducto = models.CharField(max_length=50)
    precio = models.IntegerField()
    id_cat = models.ForeignKey('Categoria',on_delete=models.CASCADE, db_column='idcat') 
    imagen = models.ImageField(upload_to="productos",null=True)
    available=models.BooleanField(default=True)
    def __str__(self):
        return self.nombreProducto
#Para los registros de usuarios como clientes

class Genero(models.Model):
    id_genero  = models.AutoField(db_column='idGenero', primary_key=True) 
    genero     = models.CharField(max_length=20, blank=False, null=False)

    def __str__(self):
        return str(self.genero)

class Cliente(models.Model):
    rut              = models.CharField(primary_key=True, max_length=10)
    nombre           = models.CharField(max_length=20)
    apellido_paterno = models.CharField(max_length=20)
    apellido_materno = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField(blank=False, null=False) 
    id_genero        = models.ForeignKey('Genero',on_delete=models.CASCADE, db_column='idGenero')  
    telefono         = models.CharField(max_length=45)
    email            = models.EmailField(unique=True, max_length=100, blank=True, null=True)
    direccion        = models.CharField(max_length=50, blank=True, null=True)  
    Password         = models.CharField(max_length=20)
    

    def __str__(self):
        return str(self.nombre)+" "+str(self.apellido_paterno)  
    
