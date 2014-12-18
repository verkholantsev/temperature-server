(function (data) {
    'use strict';

    var body = document.querySelector('body');
    body.innerHTML = [
        '<table>',
        data.map(function (element) {
            return [
                '<tr>',
                '<td>',
                    element.voltage,
                '</td>',
                '<td>',
                    element.resistance,
                '</td>',
                '<td>',
                    element.temperature,
                '</td>',
                '</tr>'
            ].join('');
        }).join(''),
        '</table>'
    ].join('');
})(window.data);
