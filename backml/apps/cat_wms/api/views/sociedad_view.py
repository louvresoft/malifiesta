from rest_framework import viewsets
from rest_framework import pagination
from apps.cat_wms.api import serializers as srlzrs


class SociedadViewSet(viewsets.ModelViewSet):
    serializer_class = srlzrs.SociedadSerializer
    pagination_class = pagination.LimitOffsetPagination

    def get_queryset(self, pk=None):
        if pk is None:
            return self.get_serializer().Meta.model.objects.filter(state=True).order_by('-id')
        else:
            return self.get_serializer().Meta.model.objects.filter(state=True, id=pk).first()
