from rest_framework import serializers
from apps.cat_wms.models import Centro


class CentroSerializer(serializers.ModelSerializer):
    sociedad_nombre = serializers.CharField(source="sociedad.sociedad", read_only=True)

    class Meta:
        model = Centro
        exclude = ('state', 'created_date', 'modified_date', 'deleted_date')
