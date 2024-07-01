from django import  forms
from django.forms import ModelForm
from .models import Producto,Categoria,Cliente

class ProductoForm(forms.ModelForm):
    class Meta:
        model= Producto 
        fields = "__all__"
        
        
class ClienteForm(ModelForm):
    class Meta:
        model = Cliente
        fields=['rut',
                'nombre',
                'apellido_paterno',
                'apellido_materno',
                'fecha_nacimiento',
                'id_genero', 
                'telefono',
                'email',
                'direccion',
                'Password'] 
        
        widgets = {
            'fecha_nacimiento': forms.SelectDateWidget(years=range(1970,2100))
        }