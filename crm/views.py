import requests
import os
import json
import pycurl
import datetime
import urllib.parse
from hashlib import md5
from io import BytesIO
from django.shortcuts import render
from django.views.generic.base import View
from django.conf import settings


class IndexView(View):
    template_name = 'crm/index.html'

    def send_request_from_curl(self, url, method, request_params):
        request_body = urllib.parse.urlencode(request_params)
        buffer = BytesIO()
        c = pycurl.Curl()
        c.setopt(pycurl.URL, url)
        c.setopt(pycurl.WRITEDATA, buffer)
        c.setopt(pycurl.SSL_VERIFYPEER, False)
        c.setopt(pycurl.SSL_VERIFYHOST, False)
        c.setopt(pycurl.VERBOSE, 1)
        c.setopt(pycurl.POST, 0)
        c.setopt(pycurl.POSTFIELDS, request_body)
        c.perform()
        c.close()
        body = buffer.getvalue()
        print(type(body))
        print(body)
        # res_data = json.dumps(body)
        # print(res_data)
        return body

    def get(self, request, *args, **kwargs):
        ctx = dict()
        subdomain = settings.AMOCRM_SUBDOMAIN
        url_auth = 'https://' + subdomain +'.amocrm.ru/private/api/auth.php?type=json'
        url = 'https://new590a5769b880c.amocrm.ru/private/api/v2/json/leads/list'
        user_data = {
            'USER_LOGIN': settings.AMOCRM_USER,
            'USER_HASH': settings.AMOCRM_HASH,
        }
        # self.send_request_from_curl(url,'GET', user_data)
        r = requests.get(url, user_data)
        print(r)
        results = r.json()
        leads = [lead for lead in results.get('response').get('leads')]

        ctx['leads'] = leads
        return render(request, self.template_name,ctx)
