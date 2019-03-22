#!/usr/bin/env python3

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Enikku ezhuthan alle ariyu mothalali, vaayikkan ariyillallo 
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ------------------------------------------------------------------------------
'''
ManufacturerTransactionHandler class interfaces for Transfer Transaction Family.
'''

import traceback
import sys
import hashlib
import logging
import json

from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction
from sawtooth_sdk.processor.exceptions import InternalError
from sawtooth_sdk.processor.core import TransactionProcessor




# For Docker:
DEFAULT_URL = 'tcp://validator:4004'

LOGGER = logging.getLogger(__name__)

FAMILY_NAME = "manufacturing"



def checkPayload(bottle):
        
        if (bottle[0] == 'create') and bottle[1] and bottle[2] and bottle[3] and bottle[4]:
            return True
        else:
            raise InvalidTransaction('Invalid Payload, Must adhere to standards')

def _hash(data):
        return hashlib.sha512(data.encode('utf-8')).hexdigest()[0:70]



class ManufacturerTransactionHandler(TransactionHandler):

    def __init__(self, namespace):
        self._namespace  = namespace

    @property
    def family_name(self):
        return FAMILY_NAME

    @property
    def family_versions(self):
        return ['1.0']

    @property
    def namespaces(self):
        return [self._namespace]
    


    def apply(self, transaction, context):  
        bottleAttributes = transaction.payload.decode().split(",")
        if checkPayload(bottleAttributes):
            pass
        
        assetAddress = _hash(bottleAttributes[1])

        bottleData = {
            'bottleID': bottleAttributes[1], 
            'liqType': bottleAttributes[2], 
            'mfrID': bottleAttributes[3], 
            'mfrTime': bottleAttributes[4]
        }

        state_data = (json.dumps(bottleData)).encode('utf-8')
        
        addresses = context.set_state({assetAddress: state_data})
        
        if len(addresses) < 1:
            raise InternalError("State Error")

    