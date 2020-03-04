# -*- coding: utf-8 -*-

import logging
import random

from odoo import http
from odoo.http import request
from odoo.osv import expression
from odoo.tools import DEFAULT_SERVER_DATETIME_FORMAT
from datetime import date, datetime

logger = logging.getLogger(__name__)


class MainController(http.Controller):
    @http.route(['/awesome_tshirt/slug01'], type='json', auth='user')
    def handler(self):
        return "I am Controller."

