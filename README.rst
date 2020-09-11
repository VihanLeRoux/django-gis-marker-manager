==============
Marker manager
==============

GIS marker manager is a web based application where the user
creates markers that keep location based files.

Detailed documentation is in the "docs" directory.

Quick start
-----------

1. Add "mapapp" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = [
        ...
        'mapapp',
    ]

2. Include the mapapp URLconf in your project urls.py like this::

    path('', include('mapapp.urls')),

3. Run ``python manage.py migrate`` to create the mapapp model.

4. Start the development server and visit http://127.0.0.1:8000
   to get started.