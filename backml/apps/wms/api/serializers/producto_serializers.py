from rest_framework import serializers
from apps.wms.models import Producto


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto