document['addEventListener']('DOMContentLoaded', async function () {
    const a = await new Promise(w => chrome['management']['getSelf'](x => w(x['version'])));
    document['getElementById']('version')['innerText'] = '(version\x20v' + a + ')';
    const b = {
            'Acheson': {
                'lat': 53.548701,
                'lng': -113.76261
            },
            'Ajax': {
                'lat': 43.850814,
                'lng': -79.020296
            },
            'Balzac': {
                'lat': 51.212985,
                'lng': -114.007862
            },
            'Bolton': {
                'lat': 43.875473,
                'lng': -79.734437
            },
            'Brampton': {
                'lat': 43.685271,
                'lng': -79.759924
            },
            'Calgary': {
                'lat': 51.045113,
                'lng': -114.057141
            },
            'Cambridge': {
                'lat': 43.361621,
                'lng': -80.314429
            },
            'Concord': {
                'lat': 43.80011,
                'lng': -79.48291
            },
            'Dartmouth': {
                'lat': 44.67134,
                'lng': -63.57719
            },
            'Edmonton': {
                'lat': 53.54545,
                'lng': -113.49014
            },
            'Etobicoke': {
                'lat': 43.65421,
                'lng': -79.56711
            },
            'Hamilton': {
                'lat': 43.25549,
                'lng': -79.873376
            },
            'Mississauga': {
                'lat': 43.58882,
                'lng': -79.644378
            },
            'Nisku': {
                'lat': 53.337845,
                'lng': -113.531304
            },
            'Ottawa': {
                'lat': 45.425226,
                'lng': -75.699963
            },
            'Rocky\x20View': {
                'lat': 51.18341,
                'lng': -113.93527
            },
            'Scarborough': {
                'lat': 43.773077,
                'lng': -79.257774
            },
            'Sidney': {
                'lat': 48.650629,
                'lng': -123.398604
            },
            'ST.\x20Thomas': {
                'lat': 42.777414,
                'lng': -81.182973
            },
            'Stoney\x20Creek': {
                'lat': 43.21681,
                'lng': -79.76633
            },
            'Toronto': {
                'lat': 43.653524,
                'lng': -79.383907
            },
            'Vancouver': {
                'lat': 49.261636,
                'lng': -123.11335
            },
            'Vaughan': {
                'lat': 43.849270138,
                'lng': -79.535136594
            },
            'Whitby': {
                'lat': 43.897858,
                'lng': -78.943434
            },
            'Windsor': {
                'lat': 42.317438,
                'lng': -83.035225
            }
        }, c = [
            'Bolton',
            'Brampton',
            'Burnaby',
            'Cambridge',
            'Concord',
            'Toronto',
            'Sidney'
        ], d = await chrome['storage']['local']['get']([
            'selectedCity',
            'distance',
            'jobType',
            '__ap',
            'cityTags'
        ]), e = d['selectedCity'] || 'Toronto', f = d['distance'] || '5', g = d['jobType'] || 'Any', h = d['__ap'] || ![], i = d['cityTags'] || [];
    await chrome['storage']['local']['get']()['then'](w => {
        const x = document['getElementById']('activate');
        x ? x['checked'] = w['__ap'] : console['error']('Element\x20with\x20ID\x20\x22activate\x22\x20not\x20found.');
    });
    i['length'] === 0x0 ? chrome['storage']['local']['set']({ 'cityTags': c }, function () {
        console['log']('Default\x20cities\x20added\x20to\x20local\x20storage:', c);
    }) : console['log']('Stored\x20city\x20tags\x20already\x20exist:', i);
    console['log']('Stored\x20data\x20on\x20load:', d), console['log']('Stored\x20city\x20tags:', i);
    const j = document['getElementById']('city'), k = document['getElementById']('distance'), l = document['getElementById']('work_hours'), m = document['getElementById']('activate');
    if (j)
        j['value'] = e;
    if (k)
        k['value'] = f;
    if (l)
        l['value'] = g;
    if (m)
        m['checked'] = h;
    const {
        lat: n,
        lng: o
    } = b[e];
    chrome['storage']['local']['set']({
        'lat': n,
        'lng': o
    }), document['getElementById']('city')['addEventListener']('change', function () {
        const w = this['value'], {
                lat: x,
                lng: y
            } = b[w];
        chrome['storage']['local']['set']({
            'selectedCity': w,
            'lat': x,
            'lng': y
        }), console['log']('Stored\x20city:\x20' + w + ',\x20Lat:\x20' + x + ',\x20Lng:\x20' + y);
    }), document['getElementById']('distance')['addEventListener']('change', function () {
        const w = this['value'];
        chrome['storage']['local']['set']({ 'distance': w }), console['log']('Stored\x20distance:\x20' + w);
    }), document['getElementById']('work_hours')['addEventListener']('change', function () {
        const w = this['value'];
        chrome['storage']['local']['set']({ 'jobType': w }), console['log']('Stored\x20job\x20type:\x20' + w);
    }), document['getElementById']('activate')['addEventListener']('change', async function () {
        chrome['storage']['local']['set']({ '__ap': this['checked'] });
        let [w] = await chrome['tabs']['query']({
            'active': !![],
            'lastFocusedWindow': !![]
        });
        chrome['tabs']['sendMessage'](w['id'], {
            'action': 'activate',
            'status': this['checked']
        });
    }), document['getElementById']('ais_visa_info')['addEventListener']('submit', async function (w) {
        w['preventDefault']();
        let x = document['getElementById']('reset_info');
        x['setAttribute']('disabled', 'disabled'), await new Promise(y => setTimeout(y, 0x1f4)), await chrome['storage']['local']['clear'](), await chrome['storage']['local']['set']({
            '__ap': !![],
            '__cr': 0x0,
            'selectedCity': 'Toronto',
            'lat': 43.653524,
            'lng': -79.383907,
            'distance': '5',
            'jobType': 'Any'
        }), chrome['runtime']['sendMessage']({ 'action': 'logout' }), x['classList']['toggle']('btn-success'), x['innerText'] = 'Success', await new Promise(y => setTimeout(y, 0x3e8)), x['classList']['toggle']('btn-success'), x['removeAttribute']('disabled'), x['innerText'] = 'Reset';
    }), document['getElementById']('contact_us')['addEventListener']('click', function () {
        chrome['tabs']['create']({ 'url': 'https://www.alertmeasap.com/contact' });
    }), document['getElementById']('tutorial')['addEventListener']('click', function () {
        chrome['tabs']['create']({ 'url': 'https://youtu.be/17iWkjXwRJs' });
    });
    function p(w, x = ![]) {
        const y = document['getElementById']('tag-input-box'), z = document['createElement']('div');
        z['classList']['add']('tag'), z['innerHTML'] = w + '\x20<span\x20class=\x22remove-tag\x22>x</span>', y['insertBefore'](z, document['getElementById']('city-input')), document['getElementById']('clear-all')['style']['display'] = 'inline', z['querySelector']('.remove-tag')['addEventListener']('click', function () {
            q(this);
        }), console['log']('Tag\x20added:\x20' + w), console['log']('Current\x20tags\x20in\x20DOM:\x20' + document['querySelectorAll']('.tag')['length']), !x && s(w);
    }
    function q(w) {
        const x = w['parentElement'], y = x['textContent']['trim']()['slice'](0x0, -0x1);
        x['remove'](), t(y), console['log']('Tag\x20removed\x20from\x20UI:\x20' + y), !document['querySelector']('.tag') && (document['getElementById']('clear-all')['style']['display'] = 'none');
    }
    function r() {
        const w = document['querySelectorAll']('.tag');
        w['forEach'](x => x['remove']()), u(), document['getElementById']('clear-all')['style']['display'] = 'none', console['log']('All\x20tags\x20cleared.');
    }
    function s(w) {
        chrome['storage']['local']['get']('cityTags', function (x) {
            let y = x['cityTags'] || [];
            y['push'](w), chrome['storage']['local']['set']({ 'cityTags': y }, function () {
                console['log']('Tag\x20saved\x20to\x20local\x20storage:\x20' + w), console['log']('Current\x20tags\x20in\x20storage:\x20' + y);
            });
        });
    }
    function t(w) {
        chrome['storage']['local']['get']('cityTags', function (x) {
            let y = x['cityTags'] || [];
            console['log']('Before\x20removal,\x20stored\x20city\x20tags:', y), y = y['filter'](z => z['trim']()['toLowerCase']() !== w['trim']()['toLowerCase']()), chrome['storage']['local']['set']({ 'cityTags': y }, function () {
                console['log']('After\x20removal,\x20stored\x20city\x20tags:', y), chrome['storage']['local']['get']('cityTags', function (z) {
                    console['log']('Final\x20check\x20of\x20stored\x20tags:\x20', z['cityTags']);
                });
            });
        });
    }
    function u() {
        chrome['storage']['local']['remove']('cityTags', function () {
            console['log']('All\x20tags\x20cleared\x20from\x20local\x20storage.');
        });
    }
    function v() {
        const w = document['getElementById']('tag-input-box');
        w['querySelectorAll']('.tag')['forEach'](x => x['remove']()), chrome['storage']['local']['get']('cityTags', function (x) {
            const y = x['cityTags'] || [];
            console['log']('Loading\x20tags\x20from\x20storage:\x20' + y), y['forEach'](z => p(z, !![]));
        });
    }
    document['getElementById']('clear-all')['addEventListener']('click', r), document['getElementById']('city-input')['addEventListener']('keyup', function (w) {
        if (w['key'] === 'Enter' && this['value']['trim']() !== '') {
            const x = this['value']['trim']();
            p(x), this['value'] = '';
        }
    }), chrome['runtime']['onMessage']['addListener']((w, x, y) => {
        if (w['action'] === 'playSound') {
            console['log']('Attempting\x20to\x20play\x20sound...');
            const z = new Audio(chrome['runtime']['getURL']('alert.wav'));
            z['play']()['then'](() => {
                console['log']('Sound\x20played\x20successfully.');
            })['catch'](A => {
                console['error']('Failed\x20to\x20play\x20sound:', A);
                const B = document['createElement']('button');
                B['style']['display'] = 'none', document['body']['appendChild'](B), B['addEventListener']('click', () => {
                    z['play']();
                }), console['log']('Triggering\x20hidden\x20button\x20click.'), B['click'](), document['body']['removeChild'](B);
            });
        }
    }), v();
});