from rest_framework import serializers

from ..models import Ubicaciones

class UbicacionesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ubicaciones
        fields = ['ubicacion',]