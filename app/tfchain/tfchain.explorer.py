import random
import tfchain.errors as tferrors
import tfchain.polyfill as jspolyfill

class ExplorerClient:
    """
    Client to get data from a tfchain explorer.
    """

    def __init__(self, addresses):
        if not isinstance(addresses, list) or len(addresses) == 0:
            raise TypeError("addresses expected to be a non-empty list of string-formatted explorer addresses, not {}".format(type(addresses)))
        self._addresses = addresses

    @property
    def addresses(self):
        """
        Addresses of the explorers to use
        """
        return self._addresses

    def get_data(self, endpoint):
        """
        get data from an explorer at the endpoint from any explorer that is available
        on one of the given urls. The list of urls is traversed in random order until
        an explorer returns with a 200 OK status.

        @param endpoint: the endpoint to get the data from
        """
        indices = list(range(len(self._addresses)))
        random.shuffle(indices)
        for idx in indices:
            try:
                address = self._addresses[idx]
                if not isinstance(address, str):
                    raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
                # do the request and check the response
                resource = address+endpoint
                resp = jspolyfill.http_get(resource)
                if resp.code == 200:
                    return resp.data
                if resp.code == 204:
                    raise tferrors.ExplorerNoContent("GET: no content available (code: 204)", endpoint)
                raise tferrors.ExplorerServerError("error (code: {})".format(resp.code), endpoint)
            except Exception as e:
                print("tfchain explorer get exception at endpoint {} on {}: {}".format(endpoint, address, e))
        raise tferrors.ExplorerNotAvailable("no explorer was available", endpoint, self._addresses)

    def post_data(self, endpoint, data):
        """
        put data to an explorer at the endpoint from any explorer that is available
        on one of the given urls. The list of urls is traversed in random order until
        an explorer returns with a 200 OK status.

        @param endpoint: the endpoint to post the data to
        """
        indices = list(range(len(self._addresses)))
        random.shuffle(indices)
        for idx in indices:
            try:
                address = self._addresses[idx]
                if not isinstance(address, str):
                    raise TypeError("explorer address expected to be a string, not {}".format(type(address)))
                resource = address+endpoint
                resp = jspolyfill.http_post(resource, data)
                if resp.code == 200:
                    return resp.data
                raise tferrors.ExplorerServerPostError("POST: unexpected error (code: {}): {}".format(resp.code, resp.data), endpoint, data=data)
            except Exception as e:
                print("tfchain explorer get exception at endpoint {} on {}: {}".format(endpoint, address, e))
                pass
        raise tferrors.ExplorerNotAvailable("no explorer was available", endpoint, self._addresses)
