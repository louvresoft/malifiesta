from rest_framework import serializers
from apps.cat_wms.models import Categoria


class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        exclude = ('state', 'created_date', 'modified_date', 'deleted_date')