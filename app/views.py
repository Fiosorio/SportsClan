from django.shortcuts import render,redirect,get_object_or_404,redirect
from .models import Producto, Categoria
from .forms import ProductoForm
from django.contrib import messages
# Create your views here.

def index(request):
    categoria_principal = Categoria.objects.get(nombreCat='Principal')
    productos = Producto.objects.filter(id_cat=categoria_principal)

    data = {
        'productos': productos
    }
    return render(request, 'app/index.html', data)

def calzado(request):
    categoria_calzado = Categoria.objects.get(nombreCat='Calzado')
    productos = Producto.objects.filter(id_cat=categoria_calzado)

    data = {
        'productos': productos
    }
    return render(request, 'app/calzado.html', data)


def accesorios(request):
    categoria_accesorios = Categoria.objects.get(nombreCat='Accesorios')
    productos = Producto.objects.filter(id_cat=categoria_accesorios)

    data = {
        'productos': productos
    }
    return render(request, 'app/accesorios.html', data)

def ropaDeportiva(request):
    categoria_ropa_deportiva = Categoria.objects.get(nombreCat='Ropa Deportiva')
    productos = Producto.objects.filter(id_cat=categoria_ropa_deportiva)

    data = {
        'productos': productos
    }
    return render(request, 'app/ropaDeportiva.html', data)

def inicioSesion(request):
    context={}
    return render(request,'app/inicioSesion.html',context)

def registro(request):
    context={}
    return render(request,'app/registro.html',context)

def mapa(request):
    context={}
    return render(request,'app/mapa.html',context)

def agregar_producto(request):
    data = {'form': ProductoForm()}
    if request.method =='POST':
        formulario = ProductoForm(data=request.POST,files=request.FILES)
        if formulario.is_valid():
            formulario.save()
            data["mensaje"] = "Guardado correctamente"
        else: 
            data["form"] = formulario   
    return render(request,'app/producto/agregar.html',data)


def listar_producto(request):
    productos = Producto.objects.all()
    data = {"productos": productos}

    return render(request,'app/producto/listar.html',data)


def modificar_producto(request, id):
    producto = get_object_or_404(Producto, id=id)
    data = {'form': ProductoForm(instance=producto)}
    if request.method == 'POST':
        formulario = ProductoForm(data=request.POST, files=request.FILES, instance=producto)
        if formulario.is_valid():
            formulario.save()
            messages.success(request,"modificado correctamente!!")
            data["mensaje"] = "Modificado correctamente"
            return redirect(to="listar_producto")
    return render(request, 'app/producto/modificar.html', data)

def eliminar_producto(request,id):
    producto= get_object_or_404(Producto,id=id)
    producto.delete()
    messages.success(request,"eliminado correctamente!!")
    return redirect(to="listar_producto")