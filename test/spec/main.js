define(
    function(require) {
        var identity = require('main');

        describe('identity tests', function() {
            it('should be passed', function() {
                expect(identity.check('440101201401012219')).toBe(true);
            });
            it('should be failed', function() {
                expect(identity.check('450101201401012219')).toBe(false);
            });
        });
    }
);
