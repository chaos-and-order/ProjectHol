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
The main file that runs. 
'''



import logging
import traceback
import sys
import hashlib


from sawtooth_sdk.processor.handler import TransactionHandler
from sawtooth_sdk.processor.exceptions import InvalidTransaction
from sawtooth_sdk.processor.exceptions import InternalError
from sawtooth_sdk.processor.core import TransactionProcessor


from manufacturer import ManufacturerTransactionHandler
from transfer import TransferTransactionHandler
from sales import SalesTransactionHandler


DEFAULT_URL = 'tcp://validator:4004'

LOGGER = logging.getLogger(__name__)

def prefix_hash(data):
    return hashlib.sha512(data.encode('utf-8')).hexdigest()[0:6]

def main():
    '''Entry-point function for all the TPs.'''
    try:
        logging.basicConfig()
        logging.getLogger().setLevel(logging.DEBUG)

        # Register the Transaction Handler and start it.
        processor = TransactionProcessor(DEFAULT_URL)
        processor.add_handler(ManufacturerTransactionHandler(prefix_hash("manufacturing")))
        processor.add_handler(TransferTransactionHandler(prefix_hash("transfer")))
        processor.add_handler(SalesTransactionHandler(prefix_hash("sales")))
        processor.start()
    
    except KeyboardInterrupt:
        pass
    except SystemExit as err:
        raise err
    except BaseException as err:
        traceback.print_exc(file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()



