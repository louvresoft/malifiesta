from rest_framework.viewsets import ModelViewSet
from ..models import Ubicaciones
from .serializers import (UbicacionesSerializer,)

class UbicacionesViewSet(ModelViewSet):
    serializer_class = UbicacionesSerializer
    queryset = Ubicaciones.objects.all()
