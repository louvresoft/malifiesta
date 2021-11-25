from rest_framework import pagination
from rest_framework.response import Response


class CustomPagination(pagination.CursorPagination):
    page_size = 5
    max_page_size = 100
    cursor_query_param = 'c'
    ordering = '-id'