from rest_framework.routers import DefaultRouter

from cat_wms.api.views import UbicacionesViewSet

router_cat = DefaultRouter()

router_cat.register(prefix='cat', basename='cat', viewset=UbicacionesViewSet)