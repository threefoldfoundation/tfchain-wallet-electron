import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'tfchain.polyfill.encode';
export var buffer_to_hex = function (buffer) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'buffer': var buffer = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var s = '';
	
	    s = Array.prototype.map.call(buffer, function(byte) {
	        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
	    }).join('');
	    
	return s;
};
export var hex_to_buffer = function (s) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var b = null;
	var n = len (s);
	
	    b = [];
	    for (var i = 0; i < n; i += 2) {
	        b.push(parseInt(s.substr(i, 2), 16));
	    }
	    
	return bytes (b);
};
export var int8_to_little_bytes = function (num) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0xff),
	    ];
	    
	return bytes (buf);
};
export var int16_to_little_bytes = function (num) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0x00ff),
	         (num & 0xff00) >> 8,
	    ];
	    
	return bytes (buf);
};
export var int24_to_little_bytes = function (num) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0x0000ff),
	         (num & 0x00ff00) >> 8,
	         (num & 0xff0000) >> 16,
	    ];
	    
	return bytes (buf);
};
export var int32_to_little_bytes = function (num) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0x000000ff),
	         (num & 0x0000ff00) >> 8,
	         (num & 0x00ff0000) >> 16,
	         (num & 0xff000000) >> 24,
	    ];
	    
	return bytes (buf);
};
export var int64_to_little_bytes = function (num) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'num': var num = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var buf = null;
	
	    buf = [
	         (num & 0x00000000000000ff),
	         (num & 0x000000000000ff00) >> 8,
	         (num & 0x0000000000ff0000) >> 16,
	         (num & 0x00000000ff000000) >> 24,
	         (num & 0x000000ff00000000) >> 32,
	         (num & 0x0000ff0000000000) >> 40,
	         (num & 0x00ff000000000000) >> 48,
	         (num & 0xff00000000000000) >> 56,
	    ];
	    
	return bytes (buf);
};
export var str_to_utf8 = function (str) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'str': var str = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var _bytes = null;
	
	    _bytes = [];
	    for (var i = 0; i < str.length; i++) {
	        var c = str.charCodeAt(i);
	        if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
	            var cn = str.charCodeAt(i + 1);
	            if (cn >= 0xdc00 && cn <= 0xdfff) {
	                var pt = (c - 0xd800) * 0x400 + cn - 0xdc00 + 0x10000;
	                
	                _bytes.push(
	                    0xf0 + Math.floor(pt / 64 / 64 / 64),
	                    0x80 + Math.floor(pt / 64 / 64) % 64,
	                    0x80 + Math.floor(pt / 64) % 64,
	                    0x80 + pt % 64
	                );
	                i += 1;
	                continue;
	            }
	        }
	        if (c >= 2048) {
	            _bytes.push(
	                0xe0 + Math.floor(c / 64 / 64),
	                0x80 + Math.floor(c / 64) % 64,
	                0x80 + c % 64
	            );
	        }
	        else if (c >= 128) {
	            _bytes.push(0xc0 + Math.floor(c / 64), 0x80 + c % 64);
	        }
	        else _bytes.push(c);
	    }
	    
	return bytes (_bytes);
};
export var bin_to_int = function (s) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	var x = 0;
	
	    x = parseInt(s, 2)
	    
	var x = int (x);
	return x;
};
export var hex_to_bin = function (s) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (!(s)) {
		return '';
	}
	var output = '';
	
	    for (let i = 0, charsLength = s.length; i < charsLength; i += 2) {
	        const chunk = s.substring(i, i + 2);
	        output += ("00000000" + (parseInt(chunk, 16)).toString(2)).substr(-8);
	    }
	    
	return '0b' + output;
};
export var str_zfill = function (s, n) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
					case 'n': var n = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (len (s) >= n) {
		return s;
	}
	n -= len (s);
	
	    s = '0'.repeat(n) + s
	    
	return s;
};
export var str_rstrip = function (s, c) {
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 's': var s = __allkwargs0__ [__attrib0__]; break;
					case 'c': var c = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	
	    var regExp = new RegExp(c + "+$");
	    s = s.replace(regExp, "");
	    
	return s;
};

//# sourceMappingURL=tfchain.polyfill.encode.map
