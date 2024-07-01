from django.urls import path
from .views import index, calzado,accesorios,inicioSesion,registro,mapa,ropaDeportiva,agregar_producto,listar_producto,modificar_producto,eliminar_producto

urlpatterns = [
    path('index',index, name='index'),
    path('calzado',calzado, name='calzado'),
    path('accesorios',accesorios, name='accesorios'),
    path('inicioSesion',inicioSesion, name='inicioSesion'),
    path('registro',registro, name='registro'),
    path('mapa',mapa, name='mapa'),
    path('ropaDeportiva',ropaDeportiva, name='ropaDeportiva'),
    path('agregar-producto', agregar_producto,name="agregar_producto"),
    path('listar-producto', listar_producto,name="listar_producto"),
    path('modificar-producto/<int:id>/', modificar_producto, name='modificar_producto'),
    path('eliminar-producto/<int:id>/', eliminar_producto, name='eliminar_producto')
]