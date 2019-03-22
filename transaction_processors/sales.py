#!/usr/bin/env python3

# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# ------------------------------------------------------------------------------
'''
SalesTransactionHandler class interfaces for Sales Transaction Family.
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

DEFAULT_URL = 'tcp://validator:4004'

LOGGER = logging.getLogger(__name__)

FAMILY_NAME = "sales"

def _hash(data):
    return hashlib.sha512(data.encode('utf-8')).hexdigest()[0:70]

def checkPayload(payloadActions):
    if (payloadActions[0] == 'sale') and payloadActions[1] and payloadActions[2]:
        return True
    else:
        raise InvalidTransaction('Invalid Payload, Must adhere to standards')

class SalesTransactionHandler(TransactionHandler):
    
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

        def saleAsset(context, payloadAttributes, assetAddress):
            state_data = context.get_state([assetAddress])
            bottleData = json.loads((state_data[0].data).decode('utf-8'))
            
            #sanitycheck
            if bottleData['bottleID'] == payloadAttributes[1]:
                bottleData['posSale'] = payloadAttributes[2]
                return bottleData
            else:
                raise InvalidTransaction("Wrong bottle!")

        payloadAttributes = transaction.payload.decode().split(",")
        
        if checkPayload(payloadAttributes):
            assetAddress = _hash(payloadAttributes[1])

        bottleData = saleAsset(context, payloadAttributes, assetAddress)

        #writing the bottleData to state
        state_data = json.dumps(bottleData).encode('utf-8')
        
        addresses = context.set_state({assetAddress: state_data})

        if len(addresses) < 1:
            raise InternalError("State Error")


