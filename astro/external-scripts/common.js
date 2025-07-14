// ----------
// Väärtused
// ----------
        // Kuude nimetused eesti keeles
const   months_long_est = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'],
        months_short_est = ['jan', 'veeb', 'mär', 'apr', 'mai', 'jun', 'jul', 'aug', 'sept', 'okt', 'nov', 'dets'],

        // Taevakehade parameetrid ja nimetused eesti keeles
        bodies_params = {
            'Sun' :     {'noun' : 'Päike',   'gen' : 'Päikese',  'with' : 'Päikesega',  'from' : 'Päikesest',  'r' : 695700   },
            'Mercury' : {'noun' : 'Merkuur', 'gen' : 'Merkuuri', 'with' : 'Merkuuriga', 'from' : 'Merkuurist', 'r' :   2439.7 },
            'Venus' :   {'noun' : 'Veenus',  'gen' : 'Veenuse',  'with' : 'Veenusega',  'from' : 'Veenusest',  'r' :   6051.8 },
            'Earth' :   {'noun' : 'Maa',     'gen' : 'Maa',      'with' : 'Maaga',      'from' : 'Maast',      'r' :   6371.0 },
            'Moon' :    {'noun' : 'Kuu',     'gen' : 'Kuu',      'with' : 'Kuuga',      'from' : 'Kuust',      'r' :   1737.4 },
            'Mars' :    {'noun' : 'Marss',   'gen' : 'Marsi',    'with' : 'Marsiga',    'from' : 'Marsist',    'r' :   3389.5 },
            'Jupiter' : {'noun' : 'Jupiter', 'gen' : 'Jupiteri', 'with' : 'Jupiteriga', 'from' : 'Jupiterist', 'r' :  69911   },
            'Saturn' :  {'noun' : 'Saturn',  'gen' : 'Saturni',  'with' : 'Saturniga',  'from' : 'Saturnist',  'r' :  58232   },
            'Uranus' :  {'noun' : 'Uraan',   'gen' : 'Uraani',   'with' : 'Uraaniga',   'from' : 'Uraanist',   'r' :  25362   },
            'Neptune' : {'noun' : 'Neptuun', 'gen' : 'Neptuuni', 'with' : 'Neptuuniga', 'from' : 'Neptuunist', 'r' :  24622   }
        },

        // Linnade koordinaadid ja vaatleja vaikimisi asukoht
        cities = {
            'estcen' :      {'lon' : 24.97, 'lat' : 58.77, 'elev' : 50},
            'Haapsalu' :    {'lon' : 23.54, 'lat' : 58.94, 'elev' :  5},
            'Jõgeva' :      {'lon' : 26.40, 'lat' : 58.74, 'elev' : 75},
            'Jõhvi' :       {'lon' : 27.42, 'lat' : 59.36, 'elev' : 60},
            'Kuressaare' :  {'lon' : 22.49, 'lat' : 58.25, 'elev' :  5},
            'Kärdla' :      {'lon' : 22.75, 'lat' : 59.00, 'elev' :  5},
            'Mustvee' :     {'lon' : 26.95, 'lat' : 58.85, 'elev' : 35},
            'Narva' :       {'lon' : 28.19, 'lat' : 59.38, 'elev' : 25},
            'Paide' :       {'lon' : 25.57, 'lat' : 58.88, 'elev' : 60},
            'Petseri' :     {'lon' : 27.61, 'lat' : 57.81, 'elev' : 85},
            'Põlva' :       {'lon' : 27.07, 'lat' : 58.06, 'elev' : 65},
            'Pärnu' :       {'lon' : 24.50, 'lat' : 58.38, 'elev' :  5},
            'Rakvere' :     {'lon' : 26.36, 'lat' : 59.35, 'elev' : 75},
            'Rapla' :       {'lon' : 24.80, 'lat' : 59.00, 'elev' : 65},
            'Tallinn' :     {'lon' : 24.75, 'lat' : 59.44, 'elev' : 10},
            'Tartu' :       {'lon' : 26.73, 'lat' : 58.38, 'elev' : 35},
            'Tõrva' :       {'lon' : 25.92, 'lat' : 58.00, 'elev' : 55},
            'Valga' :       {'lon' : 26.04, 'lat' : 57.78, 'elev' : 65},
            'Võru' :        {'lon' : 27.00, 'lat' : 57.84, 'elev' : 80},
            'Viljandi' :    {'lon' : 25.60, 'lat' : 58.37, 'elev' : 80}
        };



// -------------
// Funktsioonid
// -------------
// Aja ja arvude esitamine

/**
 * Funktsioon aja trükkimiseks eri vormingutes
 * 
 * @arg {Date | AstroTime}  t
 * @arg {bool}              daylabel - kas trükkida päeva nimi (funktsioon dayname)
 * @arg {bool}              date - kas trükkida kuupäev
 * @arg {string}            months - kuu vorming: 'num', 'short', 'long'
 * @arg {bool}              years - kas trükkida aastaarv
 * @arg {string}            year - aastaarvu vorming vorming: 'short', 'long' (ignoreeritakse, kui years=false)
 * @arg {bool}              time - kas trükkida kellaaeg
 * @arg {bool}              secs - kellaaja trükkimine sekundi täpsusega. NB: kui false, siis *ümardatakse lähima* minutini
 * @arg {bool}              tz - kas trükkida ajavöönd
 * 
 * @returns {string}    Vormindatud aeg tekstina
 */
function timeformat (t, daylabel=false, date=true, months='num', year=true, years='long', time=true, secs=true, tz=false) {

    if      (t instanceof Astronomy.AstroTime)  { t = t.date }
    else if (! t instanceof Date)               { throw('timeformat: argument is not Date or AstroTime'); }

    // Kui sekundeid ei trükita, ümarda aeg lähima minutini
    if (!secs) {t = new Date(Math.round(t.getTime() / 60e3) * 60e3)}

    let out = '';

    // Päeva nimi
    if (daylabel) {
        out += dayname(t);
        if ((date || year || time || tz) && out != '') {out += ', ';}
    }

    // Kuupäev ja kuu
    if (date) {
        if      (months == 'num')    {out += t.getDate() + '.' + String(t.getMonth()+1).padStart(2,'0');}
        else if (months == 'long')   {out += t.getDate() + '. ' + months_long_est[t.getMonth()];}
        else if (months == 'short')  {out += t.getDate() + '. ' + months_short_est[t.getMonth()];}
    }
    
    // Aastaarv
    if (year) {
        if (date) {out += months == 'num' ? '.' : ' ';}
        out +=  t.getFullYear();
        if (years == 'short') {out = out.slice(0, -4) + out.slice(-2)};
    }

    // Kellaaeg
    if (time) {
        if (date || year) {out += ' ';}
        if (secs)   {out += t.getHours() + ':' + String(t.getMinutes()).padStart(2,'0') + ':' + String(t.getSeconds()).padStart(2,'0');}
        else        {out += t.getHours() + ':' + String(t.getMinutes()).padStart(2,'0');}
    }

    // Ajavöönd
    if (tz) {
        if (date || year || time) {out += ' ';}
        out += 'UTC+' + t.getTimezoneOffset()/-60;
    }
    
    return out;
}

/**
 * Funktsioon kuupäeva trükkimiseks
 * 
 * @arg {Date | AstroTime}  t
 * @returns {string}        Kuupäev kujul d-mm-yyyy
 */
function datestring(t) {
    return timeformat(t,false,true,'num','long',true,false).replaceAll('.','-');
}

/**
 * Funktsioon arvuliste väärtuste trükkimiseks eri vormingutes
 * 
 * @arg {number}    n
 * @arg {string}    mode - 'rel' - ümardamine tüvenumbriteni, 'abs' - ümardamine komakohtadeni, 'dms' - kraadid, minutid ja sekundid
 * @arg {number}    digits:
 *                      mode = 'rel' - tüvenumbrite arv, peab olema >1,
 *                      mode = 'abs' - komakohtade arv, võib olla ka negatiivne, nt -2: 2345.63 -> 2300
 *                      mode = 'dms' - 1: kraadi täpsus, 2: kaareminuti täpsus, 3: kaaresekundi täpsus, >3: kaaresekundi komakohad
 * @arg {string}    decimal - kümnendmurru eraldaja
 * 
 * @returns {string}    Vormindatud arv tekstina
 */
function numberformat (n, mode='rel', digits=3, decimal=',') {
    if      (mode == 'rel') {return n.toPrecision(digits).replace('.', decimal);}
    else if (mode == 'abs') {return n.toFixed(digits).replace('.', decimal);}
    else if (mode == 'dms') {
        if      (digits == 1) {return n.toFixed(0) + '°';}
        else if (digits > 1) {
            if (digits > 2) {
                n = Math.round(n*3.6*10**digits)/(10**(digits-3));
                let s = n % 60;
                let m = ((n-s)/60) % 60;
                let d = (n-s-60*m)/3600;
                return d.toFixed(0) + '°' + Math.abs(m).toFixed(0).padStart(2,' ') + "'" + Math.abs(s).toFixed(digits-3).padStart(2,' ').replace('.', decimal) + '"'
            } else {
                n = Math.round(60*n);
                let m = n % 60;
                let d = (n-m)/60;
                return d.toFixed(0) + '°' + Math.abs(m).toFixed(0).padStart(2,' ') + "'"
            }
        }
    }
}

/**
 * Funktsioon päeva nimetuste jaoks
 * 
 * @arg {Date | AstroTime}  t
 * @returns {string}        'eile', 'täna' või 'homme'
 */
function dayname (t) {

    if      (t instanceof Astronomy.AstroTime)  { t = t.date }
    else if (! t instanceof Date)               { throw('dayname: argument is not Date or AstroTime'); }

    let today = new Date();
    let yesterday = new Date();
    let tomorrow = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if      (t.getDate() == today.getDate() && t.getMonth() == today.getMonth() && t.getFullYear() == today.getFullYear())              {return 'täna';}
    else if (t.getDate() == yesterday.getDate() && t.getMonth() == yesterday.getMonth() && t.getFullYear() == yesterday.getFullYear())  {return 'eile';}
    else if (t.getDate() == tomorrow.getDate() && t.getMonth() == tomorrow.getMonth() && t.getFullYear() == tomorrow.getFullYear())     {return 'homme';}
    else    {return '';}
}

/**
 * Funktsioon kuupäevade vahemiku loomiseks. Vahemik luuakse kohaliku aja põhjal, algus- ja lõpphetked on kaasaarvatud.
 * 
 * @arg {Date | AstroTime}  t1 - Vahemiku esimene äär
 * @arg {Date | AstroTime}  t2 - Vahemiku teine äär
 * 
 * @returns {string[]}  List kuupäevadega, formaaditud datestring-funktsiooniga
 */
function daterange(t1, t2) {

    let T1, T2;
    if      (t1 instanceof Astronomy.AstroTime) { T1 = new Date(t1.date.getTime()); }
    else if (t1 instanceof Date)                { T1 = new Date(t1.getTime()); }     
    else                                        { throw('dayname: argument t1 is not Date or AstroTime'); }

    if      (t2 instanceof Astronomy.AstroTime) { T2 = new Date(t2.date.getTime()) }
    else if (t2 instanceof Date)                { T2 = new Date(t2.getTime()); }   
    else                                        { throw('dayname: argument t2 is not Date or AstroTime'); }

    if (T1 > T2) { [T2, T1] = [T1, T2]; }
    T1.setHours(12,0,0,0);
    T2.setHours(12,0,0,0);

    let out = [];
    for ( let T = T1; T <= T2; T.setDate(T.getDate() + 1) ) {
        out.push(datestring(T));
    }

    return out
}

// Viivitus
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Astronoomilised ja geograafilised väärtused

/**
 * Funktsioon ilmakaarte vormindamiseks
 * 
 * @arg {number}   a
 * @arg {string}   mode - 'num', 'name', 'both'
 * 
 * @returns {string}    asimuut (kraadides, ümardatud täisarvudeni), ilmakaare tähis (N, NE, E, ...) või mõlemad
 */
function cardinal (a, mode='both') {
    a = a - 360 * Math.floor(a/360);

    if (mode == 'num') {return a.toFixed(0) + '°';}
    else {
        let dir = ''
        if      (a <  67.5 || a > 292.5) {dir += 'N';}
        else if (a > 112.5 && a < 247.5) {dir += 'S';}
        if      (a >  22.5 && a < 157.5) {dir += 'E';}
        else if (a > 202.5 && a < 337.5) {dir += 'W';}

        if      (mode == 'name') {return dir;}
        else if (mode == 'both') {return a.toFixed(0) + '° (' + dir + ')';}
    }
}

/**
 * Funktsioon kuufaaside nimetamiseks
 * Argumente võib esitada kahel moel: 1) t1 ja loc või 2) t1 ja t2.
 *  1) Veerandfaasi nimetatakse juhul, kui see jääb eelmise ja järgmise põhjapoolse meridiaaniületuse vahele
 *  2) Veerandfaas nimetatakse juhul, kui see jääb vaatlusvahemiku sisse
 * 
 * @arg {Date | AstroTime | ut} t1 - vaatlusarg või vaatlusvahemiku algus
 * @arg {Date | AstroTime | ut} t2 - vaatlusvahemiku lõpp
 * @arg {Observer}              loc - vaatleja asukoht
 * 
 * @returns {string}            Kuu faasi nimetus
 */
function moonphase (t1, t2=null, loc=null) {

    let moonperiod_start,
        moonperiod_end,
        nextquarter;

    if (t2 == null) {
        moonperiod_start = Astronomy.SearchHourAngle('Moon', loc, 12, t1, -1).time;
        moonperiod_end = Astronomy.SearchHourAngle('Moon', loc, 12, t1, 1).time;
    } else {
        moonperiod_start = Astronomy.MakeTime(t1);
        moonperiod_end = Astronomy.MakeTime(t2);
    }
    nextquarter = Astronomy.SearchMoonQuarter(moonperiod_start);

    if (nextquarter.time >= moonperiod_start && nextquarter.time <= moonperiod_end) {
        if      (nextquarter.quarter == 0)  {return 'Kuuloomine';}
        else if (nextquarter.quarter == 1)  {return 'Esimene veerand';}
        else if (nextquarter.quarter == 2)  {return 'Täiskuu';}
        else if (nextquarter.quarter == 3)  {return 'Viimane veerand';}
    } else {
        let phaseangle = t2==null ? Astronomy.MoonPhase(t1): Astronomy.MoonPhase((t1.ut+t2.ut)/2);
        if      (phaseangle < 90)   {return 'Noorkuu';}
        else if (phaseangle < 180)  {return 'Kasvav kuu';}
        else if (phaseangle < 270)  {return 'Kahanev kuu';}
        else                        {return 'Vanakuu';}
    }

}

/**
 * Süsüügia - kahe taevakeha näiva asendi info, vaadelduna kolmandalt
 * 
 * @arg {Date | AstroTime | ut} t
 * @arg {string}                body1 - üks vaadeldavatest taevakehadest
 * @arg {string}                body2 - teine vaadeldavatest taevakehadest
 * @arg {string}                obsbody - vaatleja asukoht (vaikimisi Maa)
 * 
 * @returns {object}    Keys:
 *                          type - sündmuse liik vaatleja taevakehal: none, occultation_p, occultation_c transit_p, transit_c
 *                          bodies - taevakehad kauguse järjekorras vaatlejast
 *                          dist_a - vaatleja taevakeha keskpunkti kaugus vaadeldavaid taevakehi ühendavast sirgest (km)
 *                          dist_c - kaugus täis- või rõngakujulise varjutuse servani vaatleja taevakeha pinnal (km, undefined, kui vaatleja asub vaadeldavate taevakehade vahel)
 *                          dist_p - kaugus osalise varjutuse servani vaatleja taevakeha pinnal (km, undefined, kui vaatleja asub vaadeldavate taevakehade vahel)
 */
function syzygy(t, body1, body2, obsbody='Earth') {

    // Target positions (au)
    const
        p1 = Astronomy.BackdatePosition(t, obsbody, body1, true),
        p2 = Astronomy.BackdatePosition(t, obsbody, body2, true);

    // Distances and radii (km)
    const
        d = Math.hypot(p2.x-p1.x, p2.y-p1.y, p2.z-p1.z)*Astronomy.KM_PER_AU,
        d1 = p1.Length()*Astronomy.KM_PER_AU,
        d2 = p2.Length()*Astronomy.KM_PER_AU,
        r1 = bodies_params[body1].r,
        r2 = bodies_params[body2].r,
        ro = bodies_params[obsbody].r,
        axisdist = crossProduct(p1, p2).Length()*Astronomy.KM_PER_AU**2 / d;


    // Determine geometry, list object by distance from observer
    let names = [],
        smallfirst,     // order of target objects
        r, R, dr, dR;   // r - smaller radius, R - bigger radius
    if      (d1 < d2 && r1 < r2)    { smallfirst=true; names=[body1,body2]; r=r1; R=r2; dr=d1; dR=d2}
    else if (d1 > d2 && r1 > r2)    { smallfirst=true; names=[body2,body1]; r=r2; R=r1; dr=d2; dR=d1}
    else if (d1 > d2 && r1 < r2)    { smallfirst=false; names=[body2,body1]; r=r2; R=r1; dr=d2; dR=d1}
    else                            { smallfirst=false; names=[body1,body2]; r=r1; R=r2; dr=d1; dR=d2}
    

    // Check if observer is positioned between target bodies (using law of cosines)
    if (
        Math.acos( (d**2 + d1**2 - d2**2)/(2*d*d1) ) > Math.PI/2 ||
        Math.acos( (d**2 + d2**2 - d1**2)/(2*d*d2) ) > Math.PI/2
    ) {} else {
        return {
            'type':     'none',
            'bodies':   names,
            'dist_a':   axisdist,
            'dist_c':   undefined,
            'dist_p':   undefined
        };
    }


    // Obscuration cone angles
    const
        partial_angle = Math.asin((R+r)/d),
        central_angle = Math.asin((R-r)/d);

    // Case of smaller body closer than larger (may be occultation or transit)
    if ( smallfirst ) {
        const xr = Math.sqrt(dr**2 - axisdist**2);

        let da = axisdist*Math.cos(central_angle) - ( xr - r*d/(R-r) )*Math.sin(central_angle) - ro,
            dt = axisdist*Math.cos(central_angle) + ( xr - r*d/(R-r) )*Math.sin(central_angle) - ro,
            dp = axisdist*Math.cos(partial_angle) - ( xr + r*d/(R+r) )*Math.sin(partial_angle) - ro;

        // Case of central occultation
        if (dt < 0) {
            return {
                'type':     'occultation_c',
                'bodies':   names,
                'dist_a':   axisdist,
                'dist_c':   dt,
                'dist_p':   dp
            };
        // Case of central transit 
        } else if (da < 0) {
            return {
                'type':     'transit_c',
                'bodies':   names,
                'dist_a':   axisdist,
                'dist_c':   da,
                'dist_p':   dp
            };
        } else if (dp < 0) {
            // Case of partial occultation
            if (r/dr > R/dR) {
                return {
                    'type':     'occultation_p',
                    'bodies':   names,
                    'dist_a':   axisdist,
                    'dist_c':   dt,
                    'dist_p':   dp
                };
            // Case of partial transit
            } else {
                return {
                    'type':     'transit_p',
                    'bodies':   names,
                    'dist_a':   axisdist,
                    'dist_c':   da,
                    'dist_p':   dp
                };
            }
        // Case of no event
        } else {
            return {
                'type':     'none',
                'bodies':   names,
                'dist_a':   axisdist,
                'dist_c':   r/dr > R/dR ? dt : da,
                'dist_p':   dp
            };
        }
    // Case of larger body closer than smaller (always occultation)
    } else {
        const xr = Math.sqrt(dR**2 - axisdist**2);

        let dt = axisdist*Math.cos(central_angle) + ( xr + d + r*d/(R-r) )*Math.sin(central_angle) - ro,
            dp = axisdist*Math.cos(partial_angle) - ( xr + d - r*d/(R+r) )*Math.sin(partial_angle) - ro;

        // Case of central occultation
        if (dt < 0) {
            return {
                'type':     'occultation_c',
                'bodies':   names,
                'dist_a':   axisdist,
                'dist_c':   dt,
                'dist_p':   dp
            };
        // Case of partial occultation
        } else if (dp < 0) {
            return {
                'type':     'occultation_p',
                'bodies':   names,
                'dist_a':   axisdist,
                'dist_c':   dt,
                'dist_p':   dp
            };
        // Case of no event
        } else {
            return {
                'type':     'none',
                'bodies':   names,
                'dist_a':   axisdist,
                'dist_c':   dt,
                'dist_p':   dp
            };
        }
    }
}


// Matemaatika ja geomeetria

/**
 * Funktsioon taevakehade nurkkauguse leidmiseks
 * Argumendiks võivad olla vektorid, J2000 koordinaadid kraadides kujul [lon, lat] või taevakeha nimi - sel juhul kasutatakse selle Maalt näivat asukohta ajal t
 * 
 * @arg {string | Vector | float[2]}    v1 - esimese taevakeha nimi või vektor või koordinaadid
 * @arg {string | Vector | float[2]}    v2 - teise taevakeha nimi või vektor või koordinaadid
 * @arg {Date | AstroTime | ut}         t - ajahetk (ebavajalik vektorite puhul)
 * 
 * @returns {float}     Nurkkaugus kraadides vahemikus [0, 180]
 */
function angdist (v1, v2, t=null) {

    if (typeof(v1) == 'string') {
        v1 = Astronomy.GeoVector(v1, t, true)
    } else if (Array.isArray(v1)) {
        v1 = Astronomy.VectorFromSphere(new Astronomy.Spherical(v1[1],v1[0],1), t);
    }

    if (typeof(v2) == 'string') {
        v2 = Astronomy.GeoVector(v2, t, true)
    } else if (Array.isArray(v2)) {
        v2 = Astronomy.VectorFromSphere(new Astronomy.Spherical(v2[1],v2[0],1), t);
    }

    return Astronomy.AngleBetween(v1, v2);
}

/**
 * Vektori normeerimine
 * 
 * @arg {Vector}        v - normeeritav vektor
 * @returns {Vector}    Normeeritud vektor
 */
/*function vectorNorm (v) {
    const l = v.Length();
    return new Astronomy.Vector(
        v.x/l,
        v.y/l,
        v.z/l,
        v.t
    )
}*/

/**
 * Vektorkorrutis
 * 
 * @arg {Vector}        a
 * @arg {Vector}        b
 * @returns {Vector}    a ja b vektorkorrutis, t on a.t ja b.t keskmine
 */
function crossProduct (a, b) {
    return new Astronomy.Vector(
        a.y*b.z - a.z*b.y,
        a.z*b.x - a.x*b.z,
        a.x*b.y - a.y*b.x,
        Astronomy.MakeTime((a.t.ut + b.t.ut)/2)
    )
}

/**
 * Skalaarkorrutis
 * 
 * @arg {Vector}        a
 * @arg {Vector}        b
 * @returns {float}     a ja b skalaarkorrutis
 */
/*function dotProduct (a, b) {
    return a.x*b.x + a.y*b.y + a.z*b.z
}*/

/**
 * Funktsioon arvulise väärtuse teisendamiseks vahemikust x0-x1 vahemikku y0-y1.
 * Vahemike algus- ja lõppväärtused võivad olla nii negatiivsed kui ka positiivsed ning esimene väärtus võib olla teisest suurem või vastupidi.
 * 
 * @arg {float}     x - interpoleeritav väärtus
 * @arg {float}     x0 - sisendvahemiku esimene väärtus (vastab y0)
 * @arg {float}     x1 - sisendvahemiku teine väärtus (vastab y1)
 * @arg {float}     y0 - väljundvahemiku esimene väärtus (vastab x0)
 * @arg {float}     y1 - väljundvahemiku teine väärtus (vastab x1)
 * @arg {bool}      clip:
 *                      true - väljundväärtus piiratakse vahemikku [y0, y1], ka juhul kui x ei ole vahemikus [x0, x1]
 *                      false - vaikimisi - väljundvahemikku ei piirata
 * 
 * @returns {float} Väljundvahemikku teisendatud väärtus
 */
function interpolate (x, x0, x1, y0, y1, clip=false) {
    y = (y1-y0)*(x-x0)/(x1-x0) + y0;
    if (clip) {
        if (y1 > y0) {
            if      (y > y1) return y1
            else if (y < y0) return y0
            else return y
        } else {
            if      (y < y1) return y1
            else if (y > y0) return y0
            else return y
        }  
    } else return y
}

/**
 * Kolme x,y koordinaadiga määratud parabooli tipu x-koordinaadi leidmine
 * Kõdunud parabooli olukorda ei kontrollita
 * 
 * @arg {float[3]}  x - kolme parabooli punkti x-koordinaadid
 * @arg {float[3]}  y - kolme parabooli punkti y-koordinaadid
 * 
 * @returns {float} Parabooli tipu x-koordinaat (võib asuda etteantud punktide vahemikus või sellest väljas)
 */
function parapeak_x (x, y) {
    const   a = (y[1]-y[0])*x[2],
            b = (y[0]-y[2])*x[1],
            c = (y[2]-y[1])*x[0];

    return ( 0.5 * (a*x[2] + b*x[1] + c*x[0]) / (a+b+c) );
}

/**
 * Funktsioon arvulise väärtuse piiramiseks vahemikku [min, max].
 * Funktsioon eeldab, et min < max, veakontrolli ei ole.
 * 
 * @arg {float}     v - piiratav väärtus
 * @arg {float}     x0 - piiramisvahemiku miinimumväärtus
 * @arg {float}     x1 - piiramisvahemiku maksimumväärtus
 * 
 * @returns {float} Piiratud väärtus
 */
function clamp(v, min, max) {
    return Math.max(min, Math.min(v, max));
}

/**
 * Funktsiooni maksimumide, miinimumide ja nullväärtuste leidmine etteantud vahemikus.
 * Maksimumid ja miinimumid leitakse paraboollähendusega, nullkohad lineaarse lähendusega.
 * Funktsioon otsib alati aja positiivses suunas. Kui T1 > T2, vahetatakse need omavahel ära.
 * 
 * @arg {function}              f - hinnatav funktsioon, peab sõltuma vaid ühest ajaargumendist
 * @arg {Date | AstroTime | ut} T1 - otsitava vahemiku algusaeg
 * @arg {Date | AstroTime | ut} T2 - otsitava vahemiku lõppaeg
 * @arg {string}                type - otsitava ajahetke tüüp:
 *                                  zero - kõik nullväärtused
 *                                  zero_a - nullväärtused, kus funktsioon läbib y-telge tõusvalt
 *                                  zero_d - nullväärtuse, kus funktsioon läbib y-telge langevalt
 *                                  peak - lokaalsed miinimumid ja maksimumid
 *                                  min - lokaalsed miinimumud
 *                                  max - lokaalsed maksimumid
 * @arg {boolean}               res_first:
 *                                  false - (vaikimisi) väljastatakse kõik T1 & T2 vahel leitud hetked
 *                                  true - väljastatakse vaid esimene (T1 lähim) hetk
 * @arg {float}                 init_dt - esmane iteratsioonisammu suurus päevades (vaikimisi (T2-T1)/100, piiratud vahemikku 1 päev kuni 1 h)
 * @arg {float}                 c_tol - koondumistäpsus (vaikimisi u 1 s)
 * @arg {boolean}               iterlimit - maksimaalne iteratsioonide arv iga hetke otsimiseks
 * 
 * @returns {AstroTime | AstroTime[]}   Leitud ajahetked, kui res_first, siis üks aeg, muidu aegade list
 */
function timesearch(f, T1, T2, type, res_first=false, init_dt=null, c_tol = 1e-5, iterlimit=15) {

    T1 = Astronomy.MakeTime(T1);
    T2 = Astronomy.MakeTime(T2);
    if (T1.ut > T2.ut) { [T2, T1] = [T1, T2]; }

    let dt,
        candidates = [],
        results = [];

    // Esialgse dt sammu määramine, kui pole ette antud
    if (typeof(init_dt) == 'number') {
        dt = init_dt;
    } else {
        dt = clamp( (T2.ut-T1.ut)/100, 0.04, 1 );
    }

    // Miinimumid ja maksimumid
    if (!type.includes('zero')) {

        // Kandidaatide leidmine
        for ( let t0=T1, t1=T1.AddDays(dt), t2=t1.AddDays(dt);  t1.ut<T2.ut;  t0=t1, t1=t2, t2=t2.AddDays(dt) ) {
        
            const   f0 = f(t0),
                    f1 = f(t1),
                    f2 = f(t2);

            // Maksimumid
            if (type != 'min' && f1 > f0 && f1 > f2) { candidates.push({'t':[t0,t1,t2],'f':[f0,f1,f2]}); if (res_first) {break} }
            // Miinimumid
            if (type != 'max' && f1 < f0 && f1 < f2) { candidates.push({'t':[t0,t1,t2],'f':[f0,f1,f2]}); if (res_first) {break} }
        }

        // Täpse väärtuse itereerimine
        for (let c of candidates) {

            let count = 1,  // Iteratsioonide loendur
                factor = 1; // dt vähendamise tegur
            
            do {
                tc = Astronomy.MakeTime(parapeak_x(c.t.map(value => value.ut), c.f));

                // Koondumisviga - suurenda dt sammu 2x
                if (tc.ut < c.t[0].ut || tc.ut > c.t[2].ut) {
                    factor /= 2;
                
                // Edukas koondumine
                } else if (Math.abs(tc.ut - c.t[1].ut) < c_tol) {
                    if (tc.ut >= T1.ut && tc.ut <= T2.ut) {
                        results.push(tc);
                    }
                    break;

                } else {
                    count += 1;
                    
                    // Lõpeta kui iteratsioonide hulk on liiga suur
                    if (count > iterlimit) {
                        console.log(
                            "Warning: iteration limit reached: " + timeformat(tc.date)
                            + ', remaining error: ' + numberformat(Math.abs(tc.ut - c.t[1].ut)*3600*24, 'rel', 3) + ' s'
                        );

                        results.push(tc);
                        break;
                    
                    // Järgmine iteratsioonisamm
                    // (2 x väiksem kui dt on alla u 15 min, muidu 8 korda väiksem)
                    } else {
                        dt/factor < 1e-2 ? factor *= 2 : factor *= 8;
                    }
                }
                
                // Järgmise iteratsiooni punktid
                c.t = [tc.AddDays(-dt/factor), tc, tc.AddDays(dt/factor)];
                c.f = c.t.map(value => f(value));

            } while (count <= iterlimit)
        }

    // Nullid
    } else {

        // Kandidaatide leidmine
        for ( let t0=T1, t1=T1.AddDays(dt);  t0.ut<T2.ut;  t0=t1, t1=t0.AddDays(dt) ) {
        
            const   f0 = f(t0),
                    f1 = f(t1);

            // Tõususõlmed
            if (type != 'zero_d' && f0 < 0 && f1 > 0) { candidates.push({'t':[t0,t1],'f':[f0,f1]}); if (res_first) {break} }
            // Loojangusõlmed
            if (type != 'zero_a' && f0 > 0 && f1 < 0) { candidates.push({'t':[t0,t1],'f':[f0,f1]}); if (res_first) {break} }
        }

        // Täpse väärtuse itereerimine
        for (let c of candidates) {

            let count = 1,  // Iteratsioonide loendur
                factor = 2; // dt vähendamise tegur
            
            do {
                tc = Astronomy.MakeTime( interpolate(0, c.f[0], c.f[1], c.t[0].ut, c.t[1].ut) );
                
                /*console.log( count + ' | ' + factor + ' | '
                    + timeformat(tc.date) + ' | '
                    + numberformat((c.t[1].ut-c.t[0].ut)*3600*12,'rel',3) + ' | '
                    + numberformat(c.f[0], 'rel',3) + ' | '
                    + numberformat(c.f[1], 'rel',3)
                );*/

                // Koondumisviga - suurenda dt sammu 2x
                if (tc.ut < c.t[0].ut || tc.ut > c.t[1].ut) {
                    factor /= 2;
                
                // Edukas koondumine
                } else if (Math.abs(tc.ut - (c.t[0].ut + c.t[1].ut)/2) < c_tol) {
                    if (tc.ut >= T1.ut && tc.ut <= T2.ut) {
                        results.push(tc);
                    }
                    break;

                } else {
                    count += 1;
                    
                    // Lõpeta kui iteratsioonide hulk on liiga suur
                    if (count > iterlimit) {
                        console.log(
                            "Warning: iteration limit reached: " + timeformat(tc.date)
                            + ', remaining error: ' + numberformat(Math.abs(tc.ut - (c.t[0].ut + c.t[1].ut)/2)*3600*24, 'rel', 3) + ' s'
                        );

                        results.push(tc);
                        break;
                    
                    // Järgmine iteratsioonisamm
                    // (2 x väiksem kui dt on alla u 15 min, muidu 8 korda väiksem)
                    } else {
                        dt/factor < 1e-2 ? factor *= 2 : factor *= 8;
                    }
                }
                
                // Järgmise iteratsiooni punktid
                c.t = [tc.AddDays(-dt/factor), tc.AddDays(dt/factor)];
                c.f = c.t.map(value => f(value));

            } while (count <= iterlimit)
        }

    }


    if(res_first)   { return results[0]; }
    else            { return results; }
}