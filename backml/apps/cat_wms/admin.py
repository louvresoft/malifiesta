from django.contrib import admin
from .models import *
# Register your models here.


@admin.register(Ubicaciones)
class UbicacionesAdmin(admin.ModelAdmin):
    pass

@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    pass

@admin.register(Sociedad)
class SociedadAdmin(admin.ModelAdmin):
    pass

@admin.register(Centro)
class SociedadAdmin(admin.ModelAdmin):
    pass

@admin.register(Almacenes)
class AlmacenesAdmin(admin.ModelAdmin):
    pass

@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    pass

@admin.register(Clientes)
class ClientesAdmin(admin.ModelAdmin):
    pass

@admin.register(Proveedor)
class ProveedorAdmin(admin.ModelAdmin):
    pass

@admin.register(Flotilla)
class FlotillaAdmin(admin.ModelAdmin):
    pass

@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    pass

# @admin.register(KitProducto)
# class KitPAdmin(admin.ModelAdmin):
#     pass