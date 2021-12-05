from rest_framework.routers import DefaultRouter

from apps.cat_wms.api import views as view

router = DefaultRouter()

router.register('productos', view.ProductoViewSet, basename='productos')
router.register('proveedores', view.ProveedorViewSet, basename='proveedores')
router.register('sociedades', view.SociedadViewSet, basename='sociedades')
router.register('centros', view.CentroViewSet, basename='centros')
router.register('categorias', view.CategoriaViewSet, basename='categorias')

urlpatterns = router.urls
