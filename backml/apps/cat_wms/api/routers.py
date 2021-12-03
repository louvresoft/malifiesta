from rest_framework.routers import DefaultRouter

from apps.cat_wms.api import views as view

router = DefaultRouter()

router.register('productos', view.ProductoViewSet, basename='productos')
router.register('proveedores', view.ProveedorViewSet, basename='proveedores')
router.register('sociedades', view.SociedadViewSet, basename='sociedades')

urlpatterns = router.urls
