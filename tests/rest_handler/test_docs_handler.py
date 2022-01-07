from unittest import TestCase

from mock import patch, MagicMock

from octoprint_mrbeamdoc import MrBeamDocType, SupportedLanguage, MrBeamModel
from werkzeug.exceptions import NotFound

from octoprint_mrbeam import DocsRestHandlerMixin
from tests.logger.test_logger import LoggerMock


class Test(TestCase):
    def setUp(self):
        super(Test, self).setUp()
        self.docs_handler = DocsRestHandlerMixin()
        self.docs_handler._logger = LoggerMock()

    def test_unknown_model_then_returns_not_found(self):
        self.assertRaises(NotFound, self.docs_handler.get_doc,
                          'unknown',
                          MrBeamDocType.QUICKSTART_GUIDE.value,
                          SupportedLanguage.ENGLISH.value,
                          'pdf')

    def test_unknown_type_then_returns_not_found(self):
        self.assertRaises(NotFound, self.docs_handler.get_doc,
                          MrBeamModel.MRBEAM2.value,
                          'unknown',
                          SupportedLanguage.ENGLISH.value,
                          'pdf')

    def test_unsupported_language_then_returns_not_found(self):
        self.assertRaises(NotFound, self.docs_handler.get_doc,
                          MrBeamModel.MRBEAM2.value,
                          MrBeamDocType.QUICKSTART_GUIDE.value,
                          'unsupported',
                          'pdf')

    @patch('octoprint_mrbeam.rest_handler.docs_handler.send_file')
    def test_existing_file_request_then_send_file_is_called(self, send_file_mock):
        send_file_mock.return_value = MagicMock(status_code=200, response='')
        doc = self.docs_handler.get_doc(MrBeamModel.MRBEAM2.value, MrBeamDocType.QUICKSTART_GUIDE.value,
                                        SupportedLanguage.ENGLISH.value, 'pdf')
        send_file_mock.assert_called_once()