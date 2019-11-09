# -*- coding: utf-8 -*-

{
    'name': 'Pivot to PDF Downloder',
    'version': '10.0.1.0',
    'author': 'Apple Mahmud',
    'category': 'web',
    'summary': 'Pivot to PDF',
    'description': 'Generate PDF from PIVOT',
    'license': 'MIT ',
    'depends': ['base', 'web'],
    'data': [
        'views/assets.xml',
    ],
    'qweb': ['static/src/xml/view.xml'],
    'auto_install': False,
    'installable': True,
    'application': False,
    "external_dependencies": {
        'python': [],
    },

}
