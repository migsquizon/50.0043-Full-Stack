import logging
import logging.handlers
from pythonjsonlogger import jsonlogger

formatter = jsonlogger.JsonFormatter('%(asctime)s %(levelname)s %(name)s %(threadName)s: %(message)s')

log = logging.getLogger()
log.setLevel(logging.DEBUG)
fh = logging.handlers.RotatingFileHandler(
              filename='test.log', maxBytes=2097152, backupCount=5)
fh.setFormatter(formatter)
log.addHandler(fh)

'''res = logging.getLogger('RES')
res.setLevel(logging.DEBUG)
res.addHandler(fh)

stg = logging.getLogger('SET')
stg.setLevel(logging.DEBUG)
stg.addHandler(fh)'''