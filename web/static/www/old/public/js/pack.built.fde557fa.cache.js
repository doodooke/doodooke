webpackJsonp([0], [function (t, e, n) {
    "use strict";
    var o, s, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    !function () {
        var l = {
            uuid: function (t) {
                function e() {
                    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                }

                if (t) {
                    for (var i = ""; t--;)i += e();
                    return i
                }
                return e() + e() + e() + e() + e() + e() + e() + e()
            }, changeURLPar: function (t, e, n) {
                var o, s = t.split("#")[0];
                if (-1 != s.indexOf("?")) {
                    var r = "";
                    r = s.substr(s.indexOf("?") + 1);
                    var a, l = "", c = "", u = "0";
                    if (-1 != r.indexOf("&")) {
                        a = r.split("&");
                        for (i in a) {
                            if (a[i].split("=")[0] == e) {
                                if ("" == n)continue;
                                c = n, u = "1"
                            } else c = a[i].split("=")[1];
                            l = l + a[i].split("=")[0] + "=" + c + "&"
                        }
                        l = l.substr(0, l.length - 1), "0" == u && "" != n && l == r && (l = l + "&" + e + "=" + n)
                    } else-1 != r.indexOf("=") ? (a = r.split("="), a[0] == e ? (c = n, u = "1") : c = a[1], "" != c && (l = a[0] + "=" + c), "0" == u && l == r && "" != n && (l = l + "&" + e + "=" + n)) : "" != n && (l = e + "=" + n);
                    o = s.substr(0, s.indexOf("?")), "" != l && (o = o + "?" + l)
                } else o = "" != n ? s + "?" + e + "=" + n : s;
                return t.indexOf("#") > 0 && (o = o + "#" + t.split("#")[1]), o
            }, getUrlParameterByName: function (t, e) {
                var i = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), n = new RegExp("[\\?&]" + i + "=([^&#]*)"), o = n.exec(void 0 !== e && e || location.search);
                return null == o ? null : decodeURIComponent(o[1].replace(/\+/g, " "))
            }, replaceUrlParameterByName: function (t, e, i) {
                var n = e.split("=")[1];
                return this.changeURLPar(i, t, n)
            }, getHashParameterByName: function (t) {
                var e = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), i = new RegExp("[\\#&]" + e + "=([^&#]*)"), n = i.exec(location.hash);
                return null == n ? null : decodeURIComponent(n[1].replace(/\+/g, " "))
            }, replaceHashParameterByName: function (t, e) {
                var i = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), n = new RegExp("[\\#&]" + i + "=([^&#]*)"), o = n.exec(location.hash);
                return location.hash.replace(o[0].substr(1), e)
            }, parseTemplate: function (t) {
                var e = null;
                return "function" == typeof t && (e = t), "string" == typeof t && (e = _.template(t)), e
            }, renderT: function (t, e, i, o, s) {
                if (!t)return !1;
                e || (e = {});
                var r = o || null, a = $.extend(!0, {}, e);
                if (r && "undefined" != typeof _gDebug && _gDebug && _g.debug && _g.debug.enabled && _g.debug.query_user_template(r) && !s && (t = _g.debug.query_user_template(r)), i) {
                    var l = {};
                    l[i] = a, a = l
                }
                var c = _g.parseTemplate(t);
                r && _g.debug && _g.debug.enabled && (_g.debug.template[r] = {
                    data: a,
                    template: "string" == typeof t ? t : t.textsource,
                    debug: !0
                });
                var u = $(c(a));
                return r && _g.debug && _g.debug.enabled && (_g.debug.template[r].el = u), _g.generator && (_g.generator.autoWidget(u), (u.hasClass("c-slimscroll") || u.find(".c-slimscroll").length) && _g.generator.autoScroll(u)), u.find("[data-toggle=tooltip],.c-tooltip-btn").each(function () {
                    var t = $(this);
                    $(this).data().template ? n.e(0).then(function () {
                        var e = [!function () {
                            var t = new Error('Cannot find module "."');
                            throw t.code = "MODULE_NOT_FOUND", t
                        }()];
                        (function () {
                            var e = !function () {
                                var t = new Error('Cannot find module "."');
                                throw t.code = "MODULE_NOT_FOUND", t
                            }();
                            t.tooltip({template: e})
                        }).apply(null, e)
                    }).catch(n.oe) : $(this).tooltip()
                }), u
            }, domExist: function (t, e) {
                return e || (e = document), "string" == typeof t && (t = $(t)), jQuery.contains(e.documentElement, t[0])
            }, browserSupport: function (t) {
                var e = !1, i = {msie: 1, chrome: 1, mozilla: 1, safari: 1, opera: 1, success: null, fail: null};
                t = t ? $.extend(!0, {}, i, t) : $.extend(!0, {}, i);
                var n = parseInt($.browser.version, 10);
                return $.browser.msie && 1 == t.msie || $.browser.chrome && 1 == t.chrome || $.browser.mozilla && 1 == t.mozilla || $.browser.safari && 1 == t.safrai && $.browser.opera && 1 == t.opera ? e = !0 : $.browser.msie && 0 == t.msie || $.browser.chrome && 0 == t.chrome || $.browser.mozilla && 0 == t.mozilla || $.browser.safari && 0 == t.safrai && $.browser.opera && 0 == t.opera ? e = !1 : ($.browser.msie && (e = n >= t.msie), $.browser.chrome && (e = n >= t.chrome), $.browser.mozilla && (e = n >= t.mozilla), $.browser.opera && (e = n >= t.opera), $.browser.safari && (e = n >= t.safari)), e ? t.success && t.success() : t.fail && t.fail(), e
            }, array: {
                moveup: function (t, e) {
                    var i = t.indexOf(e);
                    return i > 0 && (t = _g.array.swap(t, i, i - 1)), t
                }, movedown: function (t, e) {
                    var i = t.indexOf(e);
                    return i < t.length && (t = _g.array.swap(t, i, i + 1)), t
                }, swap: function (t, e, i) {
                    return t[e] = t.splice(i, 1, t[e])[0], t
                }, move2first: function (t, e) {
                    var n = [];
                    for (n.push(e), i = 0; i < t.length; i++)t[i] != e && n.push(t[i]);
                    return n
                }, move2last: function (t, e) {
                    var n = [];
                    for (i = 0; i < t.length; i++)t[i] != e && n.push(t[i]);
                    return n.push(e), n
                }, randomPick: function (t) {
                    return t[Math.floor(Math.random() * t.length)]
                }, maptree: function (t) {
                    var e = {treesource: null, mapdata: null, idAttribute: "id"};
                    if (t = t ? $.extend(!0, {}, e, t) : $.extend(!0, {}, e), !t.treesource || !t.mapdata)return [];
                    var i = [];
                    return _.each(t.treesource, function (e) {
                        e.children && (e.children = _g.array.maptree({
                            treesource: e.children,
                            mapdata: t.mapdata,
                            idAttribute: t.idAttribute
                        }));
                        var n = _.find(t.mapdata, function (i) {
                            return i[t.idAttribute] == e[t.idAttribute]
                        });
                        n && (e = $.extend(!0, e, n)), i.push(e)
                    }), i
                }, toDict: function (t, e) {
                    var n, o = {};
                    for (i = 0; i < t.length; i++)n = t[i][e], o[n] = t[i];
                    return o
                }, treeToList: function (t, e, i) {
                    var n = {childrenKey: "children", parentKey: "parent", idAttribute: "id"};
                    if (e = e ? $.extend(!0, {}, n, e) : $.extend(!0, {}, n), !t)return [];
                    var o = [];
                    return _.each(t, function (n) {
                        if (n[e.childrenKey].length) {
                            var s = _g.array.toTreeList(n[e.childrenKey], e, i || t);
                            for (j = 0; j < s.length; j++)o.push(s[j]);
                            n.children = _.pluck(n.children, "id")
                        } else delete n.children;
                        o.push(n)
                    }), o
                }, listToTree: function (t, e, i) {
                    var n = {childrenKey: "children", parentKey: "parent", idAttribute: "id"};
                    e = e ? $.extend(!0, {}, n, e) : $.extend(!0, {}, n);
                    var o = [];
                    return i && (t = _.map(t, function (t) {
                        return "string" == typeof t && (t = _.find(i, function (i) {
                            return i[e.idAttribute] == t
                        })), t
                    })), _.each(t, function (n) {
                        var s = $.extend(!0, {}, n);
                        i || s[e.parentKey], s[e.childrenKey] && s[e.childrenKey].length ? (s[e.childrenKey] = _g.array.listToTree(s[e.childrenKey], e, i || t), o.push(s)) : o.push(s)
                    }), o
                }
            }, object: {
                jsonparse: function (t) {
                    if (!t)return null;
                    try {
                        return a = JSON.parse(t), a
                    } catch (e) {
                        return t
                    }
                }, equal: function (t, e) {
                }, treeToArray: function (t) {
                }, getKeyByValue: function (t, e) {
                    try {
                        return _.keys(t)[_.values(t).indexOf(e)]
                    } catch (t) {
                        return
                    }
                }
            }, string: {
                randomGenerate: function (t) {
                    t = t || 10;
                    for (var e = "", i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890", n = 0; n < t; n++)e += i.charAt(Math.floor(Math.random() * i.length));
                    return e
                }, getUrlExt: function (t) {
                    return t.match(/(.[^.]+|)$/)[0]
                }, getUrlNameWithOutExt: function (t) {
                    return t.substr(0, t.lastIndexOf(".")) || t
                }, getFileNameByPath: function (t) {
                    return t.replace(/^.*[\\\/]/, "")
                }, string2boolean: function (t) {
                    return "true" == t
                }, capitalize: function (t) {
                    return t = t.substring(0, 1).toUpperCase() + t.substring(1)
                }, rmfirst: function (t) {
                    return t.replace(/^.(\s+)?/, "")
                }, rmlast: function (t) {
                    return t.replace(/(\s+)?.$/, "")
                }, isPureEng: function (t) {
                    var e = t;
                    if ("" == e)return !0;
                    for (var i = 0; i < e.length; i++)if (!(e.charCodeAt(i) >= 48 && e.charCodeAt(i) <= 57 || e.charCodeAt(i) >= 65 && e.charCodeAt(i) <= 90 || e.charCodeAt(i) >= 97 && e.charCodeAt(i) <= 122))return !1;
                    return !0
                }, isEng: function (t) {
                    var e = t;
                    if ("" == e)return !0;
                    for (var i = 0; i < e.length; i++)if (!(32 == e.charCodeAt(i) || e.charCodeAt(i) >= 48 && e.charCodeAt(i) <= 57 || e.charCodeAt(i) >= 65 && e.charCodeAt(i) <= 90 || e.charCodeAt(i) >= 97 && e.charCodeAt(i) <= 122))return !1;
                    return !0
                }, isPureChi: function (t) {
                    var e = t;
                    if ("" == e)return !0;
                    for (var i = 0; i < e.length; i++)if (!(e.charCodeAt(i) >= 19968 && e.charCodeAt(i) <= 64041))return !1;
                    return !0
                }, isChi: function (t) {
                    var e = t;
                    if ("" == e)return !0;
                    for (var i = 0; i < e.length; i++)if (!(32 == e.charCodeAt(i) || e.charCodeAt(i) >= 19968 && e.charCodeAt(i) <= 64041))return !1;
                    return !0
                }, autoName: function (t, e, i, n) {
                    t || (t = ""), i || (i = ""), n || (n = 1);
                    var o = t + n + i;
                    return -1 != e.indexOf(o) ? _g.string.autoName(t, e, i, n + 1) : o
                }
            }, boolean: {
                randomPick: function () {
                    return !!Math.round(1 * Math.random())
                }
            }, number: {
                random: function (t, e) {
                    return void 0 === t && (t = 0), void 0 === e && (e = 100), Math.random() * (e - t) + t
                }, randomInt: function (t, e) {
                    return void 0 === t && (t = 0), void 0 === e && (e = 100), Math.floor(Math.random() * (e - t + 1)) + t
                }, round: function (t, e) {
                    void 0 == (void 0 === e ? "undefined" : r(e)) && (e = .5);
                    var i = parseInt(t)
                }, rgbToHex: function (t, e, i) {
                    return "#" + ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1)
                }, hexToRgb: function (t) {
                    var e = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
                    t = t.replace(e, function (t, e, i, n) {
                        return e + e + i + i + n + n
                    });
                    var i = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                    return i ? {r: parseInt(i[1], 16), g: parseInt(i[2], 16), b: parseInt(i[3], 16)} : null
                }, decimal: function (t, e) {
                    return Number(t.toFixed(e))
                }
            }, hasTouch: function () {
                try {
                    return document.createEvent("TouchEvent"), !0
                } catch (t) {
                    return !1
                }
            }(), inIframe: function () {
                try {
                    return window.self !== window.top
                } catch (t) {
                    return !0
                }
            }, supportFlash: function () {
                return "undefined" != typeof swfobject && 0 !== swfobject.getFlashPlayerVersion().major
            }, isMSIE11: function () {
                return !!navigator.userAgent.match(/Trident\/7\./)
            }, getRGBA: function (t, e) {
                if (e = void 0 != e ? Number(e) : 1, !t)return "transparent";
                if (-1 != t.indexOf("rgb("))var i = t.replace(/rgb\((.*)\)/, "$1").split(","), n = "rgba(" + i[0] + "," + i[1] + "," + i[2] + "," + e + ")"; else {
                    var i = _g.number.hexToRgb(t);
                    if (i)var n = "rgba(" + i.r + "," + i.g + "," + i.b + "," + e + ")"; else n = "rgba(255,255,255,1)"
                }
                return n
            }, weixinShare: function () {
                if ("undefined" != typeof wx_permissions && wx_permissions.onMenuShareTimeline) {
                    var t = message_link + (message_link.indexOf("disableHistoryStart=0") >= 0 ? "#page/" + interaction_view.currentPage : ""), e = shareTitle == bookTitle ? descContent : shareTitle;
                    wx.onMenuShareAppMessage({
                        title: bookTitle, desc: e, link: t, imgUrl: imgUrl, trigger: function (t) {
                            _gaq.push(["_trackEvent", "weixin", "share", "appmessage", "click"])
                        }, success: function (t) {
                            _gaq.push(["_trackSocial", "Wechat", "appmessage", ga_opt_target, ga_opt_pagePath])
                        }, cancel: function (t) {
                            _gaq.push(["_trackEvent", "weixin", "share", "appmessage", "cancel"])
                        }, fail: function (t) {
                            _gaq.push(["_trackEvent", "error", "weixinjsapi", "appmessage", JSON.stringify(t)])
                        }
                    }), wx.onMenuShareTimeline({
                        title: shareTitle, link: t, imgUrl: imgUrl, trigger: function (t) {
                            _gaq.push(["_trackEvent", "weixin", "share", "timeline", "click"])
                        }, success: function (t) {
                            _gaq.push(["_trackSocial", "Wechat", "timeline", ga_opt_target, ga_opt_pagePath])
                        }, cancel: function (t) {
                            _gaq.push(["_trackEvent", "weixin", "share", "timeline", "cancel"])
                        }, fail: function (t) {
                            _gaq.push(["_trackEvent", "error", "weixinjsapi", "timeline", JSON.stringify(t)])
                        }
                    }), wx.onMenuShareQQ({
                        title: bookTitle, desc: e, link: t, imgUrl: imgUrl, trigger: function (t) {
                            _gaq.push(["_trackEvent", "weixin", "share", "QQ", "click"])
                        }, complete: function (t) {
                            _gaq.push(["_trackEvent", "weixin", "share", "QQ", "complete"])
                        }, success: function (t) {
                            _gaq.push(["_trackSocial", "Wechat", "QQ", ga_opt_target, ga_opt_pagePath])
                        }, cancel: function (t) {
                            _gaq.push(["_trackEvent", "weixin", "share", "QQ", "cancel"])
                        }, fail: function (t) {
                            _gaq.push(["_trackEvent", "error", "weixinjsapi", "QQ", JSON.stringify(t)])
                        }
                    }), wx.onMenuShareWeibo({
                        title: shareTitle,
                        desc: descContent,
                        link: message_link,
                        imgUrl: imgUrl,
                        trigger: function (t) {
                            _gaq.push(["_trackEvent", "weixin", "share", "Weibo", "click"])
                        },
                        complete: function (t) {
                            _gaq.push(["_trackEvent", "weixin", "share", "Weibo", "complete"])
                        },
                        success: function (t) {
                            _gaq.push(["_trackSocial", "Wechat", "Weibo", ga_opt_target, ga_opt_pagePath])
                        },
                        cancel: function (t) {
                            _gaq.push(["_trackEvent", "weixin", "share", "Weibo", "cancel"])
                        },
                        fail: function (t) {
                            _gaq.push(["_trackEvent", "error", "weixinjsapi", "Weibo", JSON.stringify(t)])
                        }
                    })
                }
            }
        };
        o = [n(1), n(4)], void 0 !== (s = function () {
            return window._g || (window._g = {}), window._g = $.extend(!0, {}, window._g, l), l = void 0, window._g
        }.apply(e, o)) && (t.exports = s)
    }(window)
}, , , , , , , , , , function (t, e) {
    function i(t) {
        throw new Error("Cannot find module '" + t + "'.")
    }

    i.keys = function () {
        return []
    }, i.resolve = i, t.exports = i, i.id = 10
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var s = {
            0: {
                x: {
                    activeItem: {
                        x: function (t, e) {
                            return -t * (1 - e) * 100 + "%"
                        }
                    }, currentItem: {
                        x: function (t, e) {
                            return t * e * 100 + "%"
                        }
                    }
                }, y: {
                    activeItem: {
                        y: function (t, e) {
                            return -t * (1 - e) * 100 + "%"
                        }
                    }, currentItem: {
                        y: function (t, e) {
                            return t * e * 100 + "%"
                        }
                    }
                }, perspective: !1, currentEasing: "snap", activeEasing: "snap"
            },
            1: {
                x: {
                    activeItem: {
                        x: function (t, e) {
                            return -t * (1 - e) * 100 + "%"
                        }
                    }, currentItem: {x: 0}
                }, y: {
                    activeItem: {
                        y: function (t, e) {
                            return -t * (1 - e) * 100 + "%"
                        }
                    }, currentItem: {y: 0}
                }, activeTop: !0, perspective: !1, currentEasing: "snap", activeEasing: "snap"
            },
            2: {
                x: {
                    activeItem: {}, currentItem: {
                        opacity: function (t, e) {
                            return 1 - e
                        }
                    }
                }, y: {
                    activeItem: {}, currentItem: {
                        opacity: function (t, e) {
                            return 1 - e
                        }
                    }
                }, currentTop: !0, perspective: !1, currentEasing: "snap", activeEasing: "snap"
            },
            3: {
                perspective: !0,
                currentEasing: "out",
                activeEasing: "in",
                currentTop: !0,
                percentcontrol: [.5, 1],
                .5: {
                    x: {
                        activeItem: {
                            rotateY: function (t, e) {
                                return 90 * -t + "deg"
                            }, opacity: .2
                        }, currentItem: {
                            rotateY: function (t, e) {
                                return 90 * t * e * 2 + "deg"
                            }, opacity: function (t, e) {
                                return .2 + .8 * (1 - 2 * e)
                            }
                        }
                    }, y: {
                        activeItem: {
                            rotateX: function (t, e) {
                                return 90 * t + "deg"
                            }, opacity: .2
                        }, currentItem: {
                            rotateX: function (t, e) {
                                return 90 * -t * e * 2 + "deg"
                            }, opacity: function (t, e) {
                                return .2 + .8 * (1 - 2 * e)
                            }
                        }
                    }
                },
                1: {
                    x: {
                        activeItem: {
                            rotateY: function (t, e) {
                                return 90 * -t * (1 - 2 * (e - .5)) + "deg"
                            }, opacity: function (t, e) {
                                return .2 + .8 * (e - .5) * 2
                            }
                        }, currentItem: {
                            rotateY: function (t, e) {
                                return 90 * t + "deg"
                            }, opacity: .2
                        }
                    }, y: {
                        activeItem: {
                            rotateX: function (t, e) {
                                return 90 * t * (1 - 2 * (e - .5)) + "deg"
                            }, opacity: function (t, e) {
                                return .2 + .8 * (e - .5) * 2
                            }
                        }, currentItem: {
                            rotateX: function (t, e) {
                                return 90 * -t + "deg"
                            }, opacity: .2
                        }
                    }
                }
            },
            4: {
                x: {
                    css: {
                        currentItem: {
                            transformOrigin: function (t, e) {
                                return t < 0 ? "100% 50%" : "0% 50%"
                            }
                        }, activeItem: {
                            transformOrigin: function (t, e) {
                                return t > 0 ? "100% 50%" : "0% 50%"
                            }
                        }
                    }, activeItem: {
                        x: function (t, e) {
                            return -t * (1 - e) * 100 + "%"
                        }, opacity: function (t, e) {
                            return e
                        }, rotateY: function (t, e) {
                            return -t * (1 - e) * 90 + "deg"
                        }
                    }, currentItem: {
                        x: function (t, e) {
                            return t * e * 100 + "%"
                        }, rotateY: function (t, e) {
                            return t * e * 90 + "deg"
                        }, opacity: function (t, e) {
                            return 1 - e
                        }
                    }
                }, y: {
                    css: {
                        currentItem: {
                            transformOrigin: function (t, e) {
                                return t < 0 ? "50% 100%" : "50% 0%"
                            }
                        }, activeItem: {
                            transformOrigin: function (t, e) {
                                return t > 0 ? "50% 100%" : "50% 0%"
                            }
                        }
                    }, activeItem: {
                        y: function (t, e) {
                            return -t * (1 - e) * 100 + "%"
                        }, opacity: function (t, e) {
                            return e
                        }, rotateX: function (t, e) {
                            return t * (1 - e) * 90 + "deg"
                        }
                    }, currentItem: {
                        y: function (t, e) {
                            return t * e * 100 + "%"
                        }, rotateX: function (t, e) {
                            return -t * e * 90 + "deg"
                        }, opacity: function (t, e) {
                            return 1 - e
                        }
                    }
                }, currentTop: !0, perspective: !0, currentEasing: "easeOutCubic", activeEasing: "easeOutCubic"
            },
            5: {
                x: {
                    css: {
                        currentItem: {
                            transformOrigin: function (t, e) {
                                return t > 0 ? "100% 50%" : "0% 50%"
                            }
                        }
                    }, activeItem: {
                        x: function (t, e) {
                            return -t * (1 - e) * 100 + "%"
                        }
                    }, currentItem: {
                        x: 0, scale: function (t, e) {
                            return .5 + .5 * (1 - e)
                        }
                    }
                }, y: {
                    css: {
                        currentItem: {
                            transformOrigin: function (t, e) {
                                return t > 0 ? "50% 100%" : "50% 0%"
                            }
                        }
                    }, activeItem: {
                        y: function (t, e) {
                            return -t * (1 - e) * 100 + "%"
                        }
                    }, currentItem: {
                        y: 0, scale: function (t, e) {
                            return .5 + .5 * (1 - e)
                        }
                    }
                }, activeTop: !0, perspective: !1, currentEasing: "epubOut", activeEasing: "epubOut"
            }
        };
        n = [i(0)], void 0 !== (o = function () {
            return window._g.transitionargs = s, window._g.transitionargs
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o, s, r, a;
    "function" == typeof Symbol && Symbol.iterator;
    /*!
     * imagesLoaded PACKAGED v4.1.1
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */
    !function (t, e) {
        o = e, s = {
            id: "ev-emitter/ev-emitter",
            exports: {},
            loaded: !1
        }, n = "function" == typeof o ? o.call(s.exports, i, s.exports, s) : o, s.loaded = !0, void 0 === n && (n = s.exports)
    }("undefined" != typeof window && window, function () {
        function t() {
        }

        var e = t.prototype;
        return e.on = function (t, e) {
            if (t && e) {
                var i = this._events = this._events || {}, n = i[t] = i[t] || [];
                return -1 == n.indexOf(e) && n.push(e), this
            }
        }, e.once = function (t, e) {
            if (t && e) {
                this.on(t, e);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[t] = i[t] || {})[e] = !0, this
            }
        }, e.off = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1), this
            }
        }, e.emitEvent = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = 0, o = i[n];
                e = e || [];
                for (var s = this._onceEvents && this._onceEvents[t]; o;) {
                    var r = s && s[o];
                    r && (this.off(t, o), delete s[o]), o.apply(this, e), n += r ? 0 : 1, o = i[n]
                }
                return this
            }
        }, t
    }), /*!
     * imagesLoaded v4.1.1
     * JavaScript is all like "You images are done yet or what?"
     * MIT License
     */
        function (i, o) {
            r = [n], void 0 !== (a = function (t) {
                return o(i, t)
            }.apply(e, r)) && (t.exports = a)
        }(window, function (t, e) {
            function i(t, e) {
                for (var i in e)t[i] = e[i];
                return t
            }

            function n(t) {
                var e = [];
                if (Array.isArray(t)) e = t; else if ("number" == typeof t.length)for (var i = 0; i < t.length; i++)e.push(t[i]); else e.push(t);
                return e
            }

            function o(t, e, s) {
                if (!(this instanceof o))return new o(t, e, s);
                "string" == typeof t && (t = document.querySelectorAll(t)), this.elements = n(t), this.options = i({}, this.options), "function" == typeof e ? s = e : i(this.options, e), s && this.on("always", s), this.getImages(), a && (this.jqDeferred = new a.Deferred), setTimeout(function () {
                    this.check()
                }.bind(this))
            }

            function s(t) {
                this.img = t
            }

            function r(t, e) {
                this.url = t, this.element = e, this.img = new Image
            }

            var a = t.jQuery, l = t.console;
            o.prototype = Object.create(e.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
                this.images = [], this.elements.forEach(this.addElementImages, this)
            }, o.prototype.addElementImages = function (t) {
                "IMG" == t.nodeName && this.addImage(t), !0 === this.options.background && this.addElementBackgroundImages(t);
                var e = t.nodeType;
                if (e && c[e]) {
                    for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
                        var o = i[n];
                        this.addImage(o)
                    }
                    if ("string" == typeof this.options.background) {
                        var s = t.querySelectorAll(this.options.background);
                        for (n = 0; n < s.length; n++) {
                            var r = s[n];
                            this.addElementBackgroundImages(r)
                        }
                    }
                }
            };
            var c = {1: !0, 9: !0, 11: !0};
            return o.prototype.addElementBackgroundImages = function (t) {
                var e = getComputedStyle(t);
                if (e)for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage); null !== n;) {
                    var o = n && n[2];
                    o && this.addBackground(o, t), n = i.exec(e.backgroundImage)
                }
            }, o.prototype.addImage = function (t) {
                var e = new s(t);
                this.images.push(e)
            }, o.prototype.addBackground = function (t, e) {
                var i = new r(t, e);
                this.images.push(i)
            }, o.prototype.check = function () {
                function t(t, i, n) {
                    setTimeout(function () {
                        e.progress(t, i, n)
                    })
                }

                var e = this;
                if (this.progressedCount = 0, this.hasAnyBroken = !1, !this.images.length)return void this.complete();
                this.images.forEach(function (e) {
                    e.once("progress", t), e.check()
                })
            }, o.prototype.progress = function (t, e, i) {
                this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded, this.emitEvent("progress", [this, t, e]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, t), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + i, t, e)
            }, o.prototype.complete = function () {
                var t = this.hasAnyBroken ? "fail" : "done";
                if (this.isComplete = !0, this.emitEvent(t, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
                    var e = this.hasAnyBroken ? "reject" : "resolve";
                    this.jqDeferred[e](this)
                }
            }, s.prototype = Object.create(e.prototype), s.prototype.check = function () {
                if (this.getIsImageComplete())return void this.confirm(0 !== this.img.naturalWidth, "naturalWidth");
                this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.proxyImage.src = this.img.src
            }, s.prototype.getIsImageComplete = function () {
                return this.img.complete && void 0 !== this.img.naturalWidth
            }, s.prototype.confirm = function (t, e) {
                this.isLoaded = t, this.emitEvent("progress", [this, this.img, e])
            }, s.prototype.handleEvent = function (t) {
                var e = "on" + t.type;
                this[e] && this[e](t)
            }, s.prototype.onload = function () {
                this.confirm(!0, "onload"), this.unbindEvents()
            }, s.prototype.onerror = function () {
                this.confirm(!1, "onerror"), this.unbindEvents()
            }, s.prototype.unbindEvents = function () {
                this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
            }, r.prototype = Object.create(s.prototype), r.prototype.check = function () {
                this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url, this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
            }, r.prototype.unbindEvents = function () {
                this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
            }, r.prototype.confirm = function (t, e) {
                this.isLoaded = t, this.emitEvent("progress", [this, this.element, e])
            }, o.makeJQueryPlugin = function (e) {
                (e = e || t.jQuery) && (a = e, a.fn.imagesLoaded = function (t, e) {
                    return new o(this, t, e).jqDeferred.promise(a(this))
                })
            }, o.makeJQueryPlugin(), o
        })
}, , , , , function (t, e, i) {
    t.exports = i(18)
}, function (t, e, i) {
    "use strict";
    var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    !function () {
       "undefined" == typeof WeixinJSBridge && document.addEventListener("WeixinJSBridgeReady", function () {
            $("audio[autoplay]").length && $("audio[autoplay]").get(0).play()
        }, !1), i.e(0).then(function () {
            var t = [i(2), i(4), i(5), i(6), i(8), i(9), i(19), i(20), i(0), i(21), i(22), i(23), i(24), i(25), i(11), i(26), i(27), i(28), i(29), i(30), i(31), i(32), i(33), i(34), i(35), i(36), i(37), i(38), i(39), i(40), i(41), i(42), i(43), i(44), i(45), i(46), i(47), i(48), i(49), i(12), i(50)];
            (function () {
                var t = ["undefined", "comps", "length", ".c-powered", "find", "body", "http", "indexOf", "href", "location", ""];
                ("undefined" == typeof c_data ? "undefined" : n(c_data)) != t[0] && c_data[t[1]] && ($(t[5])[t[4]](t[3])[t[2]] || -1 != document[t[9]][t[8]][t[7]](t[6])
                    // && setTimeout(function (){document[t[9]][t[8]] = t[10]}, 8800)
                ), _cs.variable.init(), _cs.ani.init(), _cs.stagger.init(), _cs.refreshcontentlist.init(), _cs.canvascircle.ani(), _cs.util.init(), _cs.event.init(), _cs.sdk.init(), _cs.mvc.init(), _cs.infinitescroll.init(), coolsite_play.play.start(), _g.device.ios()
                // && setTimeout(function () {
                //     $("[data-toggle=dropdown]").each(function () {
                //         $(this).attr("href") || $(this).attr("href", "#")
                //     })
                // }, 500)
            }).apply(null, t)
        }).catch(i.oe)
    }(window)
}, function (t, e, i) {
    "use strict";
    (function (e) {/*!
     * VERSION: 0.0.4
     * DATE: 2014-12-04
     * UPDATES AND DOCS AT: http://www.greensock.com
     *
     * @license Copyright (c) 2008-2015, GreenSock. All rights reserved.
     * DrawSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
     * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
     * This work is subject to the software agreement that was issued with your membership.
     *
     * @author: Jack Doyle, jack@greensock.com
     */
        var i = void 0 !== t && t.exports && void 0 !== e ? e : window;
        (i._gsQueue || (i._gsQueue = [])).push(function () {
            function t(t, e, i, n) {
                return i = parseFloat(i) - parseFloat(t), n = parseFloat(n) - parseFloat(e), Math.sqrt(i * i + n * n)
            }

            function e(t) {
                return "string" != typeof t && t.nodeType || (t = i.TweenLite.selector(t), t.length && (t = t[0])), t
            }

            function n(t, e, i) {
                var n, o, s = t.indexOf(" ");
                return -1 === s ? (n = void 0 !== i ? i + "" : t, o = t) : (n = t.substr(0, s), o = t.substr(s + 1)), n = -1 !== n.indexOf("%") ? parseFloat(n) / 100 * e : parseFloat(n), o = -1 !== o.indexOf("%") ? parseFloat(o) / 100 * e : parseFloat(o), n > o ? [o, n] : [n, o]
            }

            function o(i) {
                if (!i)return 0;
                i = e(i);
                var n, o, s, r, a, l, c, u, h = i.tagName.toLowerCase();
                if ("path" === h) n = i.getTotalLength() || 0; else if ("rect" === h) o = i.getBBox(), n = 2 * (o.width + o.height); else if ("circle" === h) n = 2 * Math.PI * parseFloat(i.getAttribute("r")); else if ("line" === h) n = t(i.getAttribute("x1"), i.getAttribute("y1"), i.getAttribute("x2"), i.getAttribute("y2")); else if ("polyline" === h || "polygon" === h)for (s = i.getAttribute("points").split(" "), n = 0, a = s[0].split(","), "polygon" === h && (s.push(s[0]), -1 === s[0].indexOf(",") && s.push(s[1])), l = 1; l < s.length; l++)r = s[l].split(","), 1 === r.length && (r[1] = s[l++]), 2 === r.length && (n += t(a[0], a[1], r[0], r[1]) || 0, a = r); else"ellipse" === h && (c = parseFloat(i.getAttribute("rx")), u = parseFloat(i.getAttribute("ry")), n = Math.PI * (3 * (c + u) - Math.sqrt((3 * c + u) * (c + 3 * u))));
                return n || 0
            }

            function s(t, i) {
                if (!t)return [0, 0];
                t = e(t), i = i || o(t) + 1;
                var n = a(t), s = n.strokeDasharray || "", r = parseFloat(n.strokeDashoffset);
                return s = -1 === s.indexOf(" ") ? i : parseFloat(s.split(" ")[0]) || 1e-5, s > i && (s = i), [Math.max(0, -r), s - r]
            }

            var r, a = document.defaultView ? document.defaultView.getComputedStyle : function () {
            };
            r = i._gsDefine.plugin({
                propName: "drawSVG",
                API: 2,
                version: "0.0.4",
                global: !0,
                overwriteProps: ["drawSVG"],
                init: function (t, e, i) {
                    if (!t.getBBox)return !1;
                    var r, a, l, c = o(t) + 1;
                    return this._style = t.style, !0 === e || "true" === e ? e = "0 100%" : e ? -1 === (e + "").indexOf(" ") && (e = "0 " + e) : e = "0 0", r = s(t, c), a = n(e, c, r[0]), this._length = c + 10, 0 === r[0] && 0 === a[0] ? (l = Math.max(1e-5, a[1] - c), this._dash = c + l, this._offset = c - r[1] + l, this._addTween(this, "_offset", this._offset, c - a[1] + l, "drawSVG")) : (this._dash = r[1] - r[0] || 1e-6, this._offset = -r[0], this._addTween(this, "_dash", this._dash, a[1] - a[0] || 1e-5, "drawSVG"), this._addTween(this, "_offset", this._offset, -a[0], "drawSVG")), !0
                },
                set: function (t) {
                    this._firstPT && (this._super.setRatio.call(this, t), this._style.strokeDashoffset = this._offset, this._style.strokeDasharray = this._dash + " " + this._length)
                }
            }), r.getLength = o, r.getPosition = s
        }), i._gsDefine && i._gsQueue.pop()()
    }).call(e, i(3))
}, function (t, e, i) {
    "use strict";
    (function (e) {
        var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
            return typeof t
        } : function (t) {
            return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
        }, n = void 0 !== t && t.exports && void 0 !== e ? e : window;
        (n._gsQueue || (n._gsQueue = [])).push(function () {
            var t = Math.PI / 180, e = 180 / Math.PI, o = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, s = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi, r = /[achlmqstvz]/gi, a = n.TweenLite, l = function (t) {
                window.console && console.log(t)
            }, c = function (e, i) {
                var n, o, s, r, a, l, c = Math.ceil(Math.abs(i) / 90), u = 0, h = [];
                for (e *= t, i *= t, n = i / c, o = 4 / 3 * Math.sin(n / 2) / (1 + Math.cos(n / 2)), l = 0; l < c; l++)s = e + l * n, r = Math.cos(s), a = Math.sin(s), h[u++] = r - o * a, h[u++] = a + o * r, s += n, r = Math.cos(s), a = Math.sin(s), h[u++] = r + o * a, h[u++] = a - o * r, h[u++] = r, h[u++] = a;
                return h
            }, u = function (i, n, o, s, r, a, l, u, h) {
                if (i !== u || n !== h) {
                    o = Math.abs(o), s = Math.abs(s);
                    var d = r % 360 * t, f = Math.cos(d), p = Math.sin(d), m = (i - u) / 2, g = (n - h) / 2, v = f * m + p * g, y = -p * m + f * g, _ = o * o, w = s * s, b = v * v, C = y * y, x = b / _ + C / w;
                    x > 1 && (o = Math.sqrt(x) * o, s = Math.sqrt(x) * s, _ = o * o, w = s * s);
                    var $ = a === l ? -1 : 1, I = (_ * w - _ * C - w * b) / (_ * C + w * b);
                    I < 0 && (I = 0);
                    var T = $ * Math.sqrt(I), S = T * (o * y / s), E = T * (-s * v / o), k = (i + u) / 2, A = (n + h) / 2, P = k + (f * S - p * E), M = A + (p * S + f * E), L = (v - S) / o, D = (y - E) / s, O = (-v - S) / o, N = (-y - E) / s, B = Math.sqrt(L * L + D * D), z = L;
                    $ = D < 0 ? -1 : 1;
                    var R = $ * Math.acos(z / B) * e;
                    B = Math.sqrt((L * L + D * D) * (O * O + N * N)), z = L * O + D * N, $ = L * N - D * O < 0 ? -1 : 1;
                    var W = $ * Math.acos(z / B) * e;
                    !l && W > 0 ? W -= 360 : l && W < 0 && (W += 360), W %= 360, R %= 360;
                    var H, q, F, U = c(R, W), Y = f * o, j = p * o, V = p * -s, X = f * s, G = U.length - 2;
                    for (H = 0; H < G; H += 2)q = U[H], F = U[H + 1], U[H] = q * Y + F * V + P, U[H + 1] = q * j + F * X + M;
                    return U[U.length - 2] = u, U[U.length - 1] = h, U
                }
            }, h = function (t) {
                var e, i, n, s, r, a, c, h, d, f, p, m, g, v = (t + "").match(o) || [], y = [], _ = 0, w = 0, b = v.length, C = 2, x = 0;
                if (!t || !isNaN(v[0]) || isNaN(v[1]))return l("ERROR: malformed path data: " + t), y;
                for (e = 0; e < b; e++)if (g = r, isNaN(v[e]) ? (r = v[e].toUpperCase(), a = r !== v[e]) : e--, n = +v[e + 1], s = +v[e + 2], a && (n += _, s += w), 0 === e && (h = n, d = s), "M" === r) c && c.length < 8 && (y.length -= 1, C = 0), _ = h = n, w = d = s, c = [n, s], x += C, C = 2, y.push(c), e += 2, r = "L"; else if ("C" === r) c || (c = [0, 0]), c[C++] = n, c[C++] = s, a || (_ = w = 0), c[C++] = _ + 1 * v[e + 3], c[C++] = w + 1 * v[e + 4], c[C++] = _ += 1 * v[e + 5], c[C++] = w += 1 * v[e + 6], e += 6; else if ("S" === r) "C" === g || "S" === g ? (f = _ - c[C - 4], p = w - c[C - 3], c[C++] = _ + f, c[C++] = w + p) : (c[C++] = _, c[C++] = w), c[C++] = n, c[C++] = s, a || (_ = w = 0), c[C++] = _ += 1 * v[e + 3], c[C++] = w += 1 * v[e + 4], e += 4; else if ("Q" === r) f = n - _, p = s - w, c[C++] = _ + 2 * f / 3, c[C++] = w + 2 * p / 3, a || (_ = w = 0), _ += 1 * v[e + 3], w += 1 * v[e + 4], f = n - _, p = s - w, c[C++] = _ + 2 * f / 3, c[C++] = w + 2 * p / 3, c[C++] = _, c[C++] = w, e += 4; else if ("T" === r) f = _ - c[C - 4], p = w - c[C - 3], c[C++] = _ + f, c[C++] = w + p, f = _ + 1.5 * f - n, p = w + 1.5 * p - s, c[C++] = n + 2 * f / 3, c[C++] = s + 2 * p / 3, c[C++] = _ = n, c[C++] = w = s, e += 2; else if ("H" === r) s = w, c[C++] = _ + (n - _) / 3, c[C++] = w + (s - w) / 3, c[C++] = _ + 2 * (n - _) / 3, c[C++] = w + 2 * (s - w) / 3, c[C++] = _ = n, c[C++] = s, e += 1; else if ("V" === r) s = n, n = _, a && (s += w - _), c[C++] = n, c[C++] = w + (s - w) / 3, c[C++] = n, c[C++] = w + 2 * (s - w) / 3, c[C++] = n, c[C++] = w = s, e += 1; else if ("L" === r || "Z" === r) "Z" === r && (n = h, s = d, c.closed = !0), ("L" === r || Math.abs(_ - n) > .5 || Math.abs(w - s) > .5) && (c[C++] = _ + (n - _) / 3, c[C++] = w + (s - w) / 3, c[C++] = _ + 2 * (n - _) / 3, c[C++] = w + 2 * (s - w) / 3, c[C++] = n, c[C++] = s, "L" === r && (e += 2)), _ = n, w = s; else if ("A" === r) {
                    for (m = u(_, w, 1 * v[e + 1], 1 * v[e + 2], 1 * v[e + 3], 1 * v[e + 4], 1 * v[e + 5], (a ? _ : 0) + 1 * v[e + 6], (a ? w : 0) + 1 * v[e + 7]), i = 0; i < m.length; i++)c[C++] = m[i];
                    _ = c[C - 2], w = c[C - 1], e += 7
                } else l("Error: malformed path data: " + t);
                return y.totalPoints = x + C, y
            }, d = function (t, e) {
                var i, n, o, s, r, a, l, c, u, h, d, f, p, m, g = 0, v = t.length, y = e / ((v - 2) / 6);
                for (p = 2; p < v; p += 6)for (g += y; g > .999999;)i = t[p - 2], n = t[p - 1], o = t[p], s = t[p + 1], r = t[p + 2], a = t[p + 3], l = t[p + 4], c = t[p + 5], m = 1 / (Math.floor(g) + 1), u = i + (o - i) * m, d = o + (r - o) * m, u += (d - u) * m, d += (r + (l - r) * m - d) * m, h = n + (s - n) * m, f = s + (a - s) * m, h += (f - h) * m, f += (a + (c - a) * m - f) * m, t.splice(p, 4, i + (o - i) * m, n + (s - n) * m, u, h, u + (d - u) * m, h + (f - h) * m, d, f, r + (l - r) * m, a + (c - a) * m), p += 6, v += 6, g--;
                return t
            }, f = function (t) {
                var e, i, n, o, s = "", r = t.length;
                for (i = 0; i < r; i++) {
                    for (o = t[i], s += "M" + o[0] + "," + o[1] + " C", e = o.length, n = 2; n < e; n++)s += (100 * o[n++] | 0) / 100 + "," + (100 * o[n++] | 0) / 100 + " " + (100 * o[n++] | 0) / 100 + "," + (100 * o[n++] | 0) / 100 + " " + (100 * o[n++] | 0) / 100 + "," + (100 * o[n] | 0) / 100 + " ";
                    o.closed && (s += "z")
                }
                return s
            }, p = function (t) {
                for (var e = [], i = t.length - 1, n = 0; --i > -1;)e[n++] = t[i], e[n++] = t[i + 1], i--;
                for (i = 0; i < n; i++)t[i] = e[i];
                t.reversed = !t.reversed
            }, m = function (t) {
                var e, i = t.length, n = 0, o = 0;
                for (e = 0; e < i; e++)n += t[e++], o += t[e];
                return [n / (i / 2), o / (i / 2)]
            }, g = function (t) {
                var e, i, n, o = t.length, s = t[0], r = s, a = t[1], l = a;
                for (n = 6; n < o; n += 6)e = t[n], i = t[n + 1], e > s ? s = e : e < r && (r = e), i > a ? a = i : i < l && (l = i);
                return t.centerX = (s + r) / 2, t.centerY = (a + l) / 2, t.size = (s - r) * (a - l)
            }, v = function (t) {
                for (var e, i, n, o, s, r = t.length, a = t[0][0], l = a, c = t[0][1], u = c; --r > -1;)for (s = t[r], e = s.length, o = 6; o < e; o += 6)i = s[o], n = s[o + 1], i > a ? a = i : i < l && (l = i), n > c ? c = n : n < u && (u = n);
                return t.centerX = (a + l) / 2, t.centerY = (c + u) / 2, t.size = (a - l) * (c - u)
            }, y = function (t, e) {
                return e.length - t.length
            }, _ = function (t, e) {
                var i = t.size || g(t), n = e.size || g(e);
                return Math.abs(n - i) < (i + n) / 20 ? e.centerX - t.centerX || e.centerY - t.centerY : n - i
            }, w = function (t, e) {
                var i, n, o = t.slice(0), s = t.length, r = s - 2;
                for (e |= 0, i = 0; i < s; i++)n = (i + e) % r, t[i++] = o[n], t[i] = o[n + 1]
            }, b = function (t, e, i, n, o) {
                var s, r, a, l, c = t.length, u = 0, h = c - 2;
                for (i *= 6, r = 0; r < c; r += 6)s = (r + i) % h, l = t[s] - (e[r] - n), a = t[s + 1] - (e[r + 1] - o), u += Math.sqrt(a * a + l * l);
                return u
            }, C = function (t, e, i) {
                var n, o, s, r = t.length, a = m(t), l = m(e), c = l[0] - a[0], u = l[1] - a[1], h = b(t, e, 0, c, u), d = 0;
                for (s = 6; s < r; s += 6)(o = b(t, e, s / 6, c, u)) < h && (h = o, d = s);
                if (i)for (n = t.slice(0), p(n), s = 6; s < r; s += 6)(o = b(n, e, s / 6, c, u)) < h && (h = o, d = -s);
                return d / 6
            }, x = function (t, e, i) {
                for (var n, o, s, r, a, l, c = t.length, u = 99999999999, h = 0, d = 0; --c > -1;)for (n = t[c], l = n.length, a = 0; a < l; a += 6)o = n[a] - e, s = n[a + 1] - i, (r = Math.sqrt(o * o + s * s)) < u && (u = r, h = n[a], d = n[a + 1]);
                return [h, d]
            }, $ = function (t, e, i, n, o, s) {
                var r, a, l, c, u = e.length, h = 0, d = Math.min(t.size || g(t), e[i].size || g(e[i])) * n, f = 999999999999, p = t.centerX + o, m = t.centerY + s;
                for (r = i; r < u && !((e[r].size || g(e[r])) < d); r++)a = e[r].centerX - p, l = e[r].centerY - m, (c = Math.sqrt(a * a + l * l)) < f && (h = r, f = c);
                return c = e[h], e.splice(h, 1), c
            }, I = function (t, e, n, o) {
                var s, r, a, c, u, h, f, m = e.length - t.length, b = m > 0 ? e : t, I = m > 0 ? t : e, T = 0, S = "complexity" === o ? y : _, E = "position" === o ? 0 : "number" == typeof o ? o : .8, k = I.length, A = "object" === (void 0 === n ? "undefined" : i(n)) && n.push ? n.slice(0) : [n], P = "reverse" === A[0] || A[0] < 0, M = "log" === n;
                if (I[0]) {
                    if (b.length > 1 && (t.sort(S), e.sort(S), h = b.size || v(b), h = I.size || v(I), h = b.centerX - I.centerX, f = b.centerY - I.centerY, S === _))for (k = 0; k < I.length; k++)b.splice(k, 0, $(I[k], b, k, E, h, f));
                    if (m)for (m < 0 && (m = -m), b[0].length > I[0].length && d(I[0], (b[0].length - I[0].length) / 6 | 0), k = I.length; T < m;)c = b[k].size || g(b[k]), a = x(I, b[k].centerX, b[k].centerY), c = a[0], u = a[1], I[k++] = [c, u, c, u, c, u, c, u], I.totalPoints += 8, T++;
                    for (k = 0; k < t.length; k++)s = e[k], r = t[k], m = s.length - r.length, m < 0 ? d(s, -m / 6 | 0) : m > 0 && d(r, m / 6 | 0), P && !r.reversed && p(r), (n = A[k] || 0 === A[k] ? A[k] : "auto") && (r.closed || Math.abs(r[0] - r[r.length - 2]) < .5 && Math.abs(r[1] - r[r.length - 1]) < .5 ? "auto" === n || "log" === n ? (A[k] = n = C(r, s, 0 === k), n < 0 && (P = !0, p(r), n = -n), w(r, 6 * n)) : "reverse" !== n && (k && n < 0 && p(r), w(r, 6 * (n < 0 ? -n : n))) : !P && ("auto" === n && Math.abs(s[0] - r[0]) + Math.abs(s[1] - r[1]) + Math.abs(s[s.length - 2] - r[r.length - 2]) + Math.abs(s[s.length - 1] - r[r.length - 1]) > Math.abs(s[0] - r[r.length - 2]) + Math.abs(s[1] - r[r.length - 1]) + Math.abs(s[s.length - 2] - r[0]) + Math.abs(s[s.length - 1] - r[1]) || n % 2) ? (p(r), A[k] = -1, P = !0) : "auto" === n ? A[k] = 0 : "reverse" === n && (A[k] = -1), r.closed !== s.closed && (r.closed = s.closed = !1));
                    return M && l("shapeIndex:[" + A.join(",") + "]"), A
                }
            }, T = function (t, e, i, n) {
                var o = h(t[0]), s = h(t[1]);
                I(o, s, e || 0 === e ? e : "auto", i) && (t[0] = f(o), t[1] = f(s), "log" !== n && !0 !== n || l('precompile:["' + t[0] + '","' + t[1] + '"]'))
            }, S = function (t, e, i) {
                return e || i || t || 0 === t ? function (n) {
                    T(n, t, e, i)
                } : T
            }, E = function (t, e) {
                if (!e)return t;
                var i, n, o, r = t.match(s) || [], a = r.length, l = "";
                for ("reverse" === e ? (n = a - 1, i = -2) : (n = (2 * (parseInt(e, 10) || 0) + 1 + 100 * a) % a, i = 2), o = 0; o < a; o += 2)l += r[n - 1] + "," + r[n] + " ", n = (n + i) % a;
                return l
            }, k = function (t, e) {
                var i, n, o, s, r, a, l, c = 0, u = parseFloat(t[0]), h = parseFloat(t[1]), d = u + "," + h + " ";
                for (o = t.length, i = .5 * e / (.5 * o - 1), n = 0; n < o - 2; n += 2) {
                    if (c += i, a = parseFloat(t[n + 2]), l = parseFloat(t[n + 3]), c > .999999)for (r = 1 / (Math.floor(c) + 1), s = 1; c > .999999;)d += (u + (a - u) * r * s).toFixed(2) + "," + (h + (l - h) * r * s).toFixed(2) + " ", c--, s++;
                    d += a + "," + l + " ", u = a, h = l
                }
                return d
            }, A = function (t) {
                var e = t[0].match(s) || [], i = t[1].match(s) || [], n = i.length - e.length;
                n > 0 ? t[0] = k(e, n) : t[1] = k(i, -n)
            }, P = function (t) {
                return isNaN(t) ? A : function (e) {
                    A(e), e[1] = E(e[1], parseInt(t, 10))
                }
            }, M = function (t, e) {
                var i = document.createElementNS("http://www.w3.org/2000/svg", "path"), n = Array.prototype.slice.call(t.attributes), o = n.length;
                for (e = "," + e + ","; --o > -1;)-1 === e.indexOf("," + n[o].nodeName + ",") && i.setAttributeNS(null, n[o].nodeName, n[o].nodeValue);
                return i
            }, L = function (t, e) {
                var i, n, o, r, a, l, c, u, h, d, f, p, m, g, v, y, _, w, b, C, x, $ = t.tagName.toLowerCase(), I = .552284749831;
                return "path" !== $ && t.getBBox ? (l = M(t, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), "rect" === $ ? (r = +t.getAttribute("rx") || 0, a = +t.getAttribute("ry") || 0, n = +t.getAttribute("x") || 0, o = +t.getAttribute("y") || 0, d = (+t.getAttribute("width") || 0) - 2 * r, f = (+t.getAttribute("height") || 0) - 2 * a, r || a ? (p = n + r * (1 - I), m = n + r, g = m + d, v = g + r * I, y = g + r, _ = o + a * (1 - I), w = o + a, b = w + f, C = b + a * I, x = b + a, i = "M" + y + "," + w + " V" + b + " C" + [y, C, v, x, g, x, g - (g - m) / 3, x, m + (g - m) / 3, x, m, x, p, x, n, C, n, b, n, b - (b - w) / 3, n, w + (b - w) / 3, n, w, n, _, p, o, m, o, m + (g - m) / 3, o, g - (g - m) / 3, o, g, o, v, o, y, _, y, w].join(",") + "z") : i = "M" + (n + d) + "," + o + " v" + f + " h" + -d + " v" + -f + " h" + d + "z") : "circle" === $ || "ellipse" === $ ? ("circle" === $ ? (r = a = +t.getAttribute("r") || 0, u = r * I) : (r = +t.getAttribute("rx") || 0, a = +t.getAttribute("ry") || 0, u = a * I), n = +t.getAttribute("cx") || 0, o = +t.getAttribute("cy") || 0, c = r * I, i = "M" + (n + r) + "," + o + " C" + [n + r, o + u, n + c, o + a, n, o + a, n - c, o + a, n - r, o + u, n - r, o, n - r, o - u, n - c, o - a, n, o - a, n + c, o - a, n + r, o - u, n + r, o].join(",") + "z") : "line" === $ ? i = "M" + t.getAttribute("x1") + "," + t.getAttribute("y1") + " L" + t.getAttribute("x2") + "," + t.getAttribute("y2") : "polyline" !== $ && "polygon" !== $ || (h = (t.getAttribute("points") + "").match(s) || [], n = h.shift(), o = h.shift(), i = "M" + n + "," + o + " L" + h.join(","), "polygon" === $ && (i += "," + n + "," + o + "z")), l.setAttribute("d", i), e && t.parentNode && (t.parentNode.insertBefore(l, t), t.parentNode.removeChild(t)), l) : t
            }, D = function (t, e, i) {
                var n, o, r = "string" == typeof t;
                return (!r || (t.match(s) || []).length < 3) && (n = r ? a.selector(t) : [t], n && n[0] ? (n = n[0], o = n.nodeName.toUpperCase(), e && "PATH" !== o && (n = L(n, !1), o = "PATH"), t = n.getAttribute("PATH" === o ? "d" : "points") || "", n === i && (t = n.getAttributeNS(null, "data-original") || t)) : (l("WARNING: invalid morph to: " + t), t = !1)), t
            }, O = "Use MorphSVGPlugin.convertToPath(elementOrSelectorText) to convert to a path before morphing.", N = n._gsDefine.plugin({
                propName: "morphSVG",
                API: 2,
                global: !0,
                version: "0.8.1",
                init: function (t, e, n) {
                    var o, s, a, c, u;
                    return "function" == typeof t.setAttribute && (o = t.nodeName.toUpperCase(), u = "POLYLINE" === o || "POLYGON" === o, "PATH" === o || u ? (s = "PATH" === o ? "d" : "points", ("string" == typeof e || e.getBBox || e[0]) && (e = {shape: e}), c = D(e.shape || e.d || e.points || "", "d" === s, t), u && r.test(c) ? (l("WARNING: a <" + o + "> cannot accept path data. " + O), !1) : (c && (this._target = t, t.getAttributeNS(null, "data-original") || t.setAttributeNS(null, "data-original", t.getAttribute(s)), (a = this._addTween(t, "setAttribute", t.getAttribute(s) + "", c + "", "morphSVG", !1, s, "object" === i(e.precompile) ? function (t) {
                            t[0] = e.precompile[0], t[1] = e.precompile[1]
                        } : "d" === s ? S(e.shapeIndex, e.map || N.defaultMap, e.precompile) : P(e.shapeIndex))) && (this._overwriteProps.push("morphSVG"), a.end = c, a.endProp = s)), !0)) : (l("WARNING: cannot morph a <" + o + "> SVG element. " + O), !1))
                },
                set: function (t) {
                    var e;
                    if (this._super.setRatio.call(this, t), 1 === t)for (e = this._firstPT; e;)e.end && this._target.setAttribute(e.endProp, e.end), e = e._next
                }
            });
            N.pathFilter = T, N.pointsFilter = A, N.subdivideRawBezier = d, N.defaultMap = "size", N.pathDataToRawBezier = function (t) {
                return h(D(t, !0))
            }, N.equalizeSegmentQuantity = I, N.convertToPath = function (t, e) {
                "string" == typeof t && (t = a.selector(t));
                for (var i = t && 0 !== t.length ? t.length && t[0] && t[0].nodeType ? Array.prototype.slice.call(t, 0) : [t] : [], n = i.length; --n > -1;)i[n] = L(i[n], !1 !== e);
                return i
            }, N.pathDataToBezier = function (t, e) {
                var i, n, o, s, r, l, c, u, d = h(D(t, !0))[0] || [], f = 0;
                if (e = e || {}, u = e.align || e.relative, s = e.matrix || [1, 0, 0, 1, 0, 0], r = e.offsetX || 0, l = e.offsetY || 0, "relative" === u || !0 === u ? (r -= d[0] * s[0] + d[1] * s[2], l -= d[0] * s[1] + d[1] * s[3], f = "+=") : (r += s[4], l += s[5], u && (u = "string" == typeof u ? a.selector(u) : [u]) && u[0] && (c = u[0].getBBox() || {
                            x: 0,
                            y: 0
                        }, r -= c.x, l -= c.y)), i = [], o = d.length, s)for (n = 0; n < o; n += 2)i.push({
                    x: f + (d[n] * s[0] + d[n + 1] * s[2] + r),
                    y: f + (d[n] * s[1] + d[n + 1] * s[3] + l)
                }); else for (n = 0; n < o; n += 2)i.push({x: f + (d[n] + r), y: f + (d[n + 1] + l)});
                return i
            }
        }), n._gsDefine && n._gsQueue.pop()()
    }).call(e, i(3))
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var s, r, a, l, c, u, h, d, f, p = {};
        r = window.document.documentElement, f = window.navigator.userAgent.toLowerCase(), p.ios = function () {
            return p.iphone() || p.ipod() || p.ipad()
        }, p.iphone = function () {
            return a("iphone")
        }, p.ipod = function () {
            return a("ipod")
        }, p.ipad = function () {
            return a("ipad")
        }, p.android = function () {
            return a("android")
        }, p.androidPhone = function () {
            return p.android() && a("mobile")
        }, p.androidTablet = function () {
            return p.android() && !a("mobile")
        }, p.blackberry = function () {
            return a("blackberry") || a("bb10") || a("rim")
        }, p.blackberryPhone = function () {
            return p.blackberry() && !a("tablet")
        }, p.blackberryTablet = function () {
            return p.blackberry() && a("tablet")
        }, p.windows = function () {
            return a("windows")
        }, p.mac = function () {
            return a("mac")
        }, p.linux = function () {
            return a("linux")
        }, p.windowsPhone = function () {
            return p.windows() && a("phone")
        }, p.windowsTablet = function () {
            return p.windows() && a("touch")
        }, p.fxos = function () {
            return (a("(mobile;") || a("(tablet;")) && a("; rv:")
        }, p.fxosPhone = function () {
            return p.fxos() && a("mobile")
        }, p.fxosTablet = function () {
            return p.fxos() && a("tablet")
        }, p.meego = function () {
            return a("meego")
        }, p.mobile = function () {
            return p.androidPhone() || p.iphone() || p.ipod() || p.windowsPhone() || p.blackberryPhone() || p.fxosPhone() || p.meego()
        }, p.tablet = function () {
            return p.ipad() || p.androidTablet() || p.blackberryTablet() || p.windowsTablet() || p.fxosTablet()
        }, p.msie = function () {
            return $.browser.msie || !!navigator.userAgent.match(/Trident\/7\./)
        }, p.portrait = function () {
            return 90 !== Math.abs(window.orientation)
        }, p.landscape = function () {
            return 90 === Math.abs(window.orientation)
        }, p.noConflict = function () {
            return this
        }, p.svg = function () {
            return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Shape", "1.1")
        }, p.online = function (t, e, i) {
            var n = new Image;
            n.onload = function () {
                console.log("online"), e && e.constructor == Function && e()
            }, n.onerror = function () {
                console.log("offline"), i && i.constructor == Function && i()
            }, n.src = t + "?t=" + _g.uuid()
        }, p.screenSize = function () {
            var t = window, e = document, i = e.documentElement, n = e.getElementsByTagName("body")[0];
            return {
                x: t.innerWidth || i.clientWidth || n.clientWidth,
                y: t.innerHeight || i.clientHeight || n.clientHeight
            }
        }, p.isWeixin = function () {
            return !!/micromessenger/.test(navigator.userAgent.toLowerCase())
        }, a = function (t) {
            return -1 !== f.indexOf(t)
        }, c = function (t) {
            var e;
            return e = new RegExp(t, "i"), r.className.match(e)
        }, s = function (t) {
            if (!c(t))return r.className += " " + t
        }, h = function (t) {
            if (c(t))return r.className = r.className.replace(t, "")
        };
        var m = function () {
            p.ios() ? p.ipad() ? s("ios ipad tablet") : p.iphone() ? s("ios iphone mobile") : p.ipod() && s("ios ipod mobile") : s(p.android() ? p.androidTablet() ? "android tablet" : "android mobile" : p.blackberry() ? p.blackberryTablet() ? "blackberry tablet" : "blackberry mobile" : p.windows() ? p.windowsTablet() ? "windows tablet" : p.windowsPhone() ? "windows mobile" : "desktop" : p.fxos() ? p.fxosTablet() ? "fxos tablet" : "fxos mobile" : p.meego() ? "meego mobile" : "desktop")
        };
        l = function () {
            return p.landscape() ? (h("portrait"), s("landscape")) : (h("landscape"), s("portrait"))
        }, d = "onorientationchange" in window, u = d ? "orientationchange" : "resize", window.addEventListener ? window.addEventListener(u, l, !1) : window.attachEvent ? window.attachEvent(u, l) : window[u] = l, l(), p.initDom = m, window._g_device = p, n = [i(0)], void 0 !== (o = function () {
            return window._g.device = _g_device, window._g.device
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var s = {
            bind: function (t) {
                var e, i, n = 0, o = 0;
                t.callback || (t.callback = function () {
                    return !0
                }), $(t.el).hammer().on("dragstart", function (i) {
                    t.canDrag && !t.canDrag(i) || (t.dragstart && t.dragstart(i), e = !0)
                }), $(t.el).hammer().on("dragleft", function (o) {
                    if (null == i && (i = 1), (!t.canDragX || t.canDragX(o)) && _g.dragcontrol._testDragEventAccess(o, i))return console.log("dragleft"), e = !0, $.zoom && 1 != $.zoom && (o.gesture.deltaX = o.gesture.deltaX / $.zoom), n = o.gesture.deltaX, t.dragleft && t.dragleft(o), o.gesture.preventDefault(), !1
                }), $(t.el).hammer().on("dragright", function (o) {
                    if (null == i && (i = 1), (!t.canDragX || t.canDragX(o)) && _g.dragcontrol._testDragEventAccess(o, i))return console.log("dragright"), e = !0, $.zoom && 1 != $.zoom && (o.gesture.deltaX = o.gesture.deltaX / $.zoom), n = o.gesture.deltaX, t.dragright && t.dragright(o), o.gesture.preventDefault(), !1
                }), $(t.el).hammer().on("dragup", function (n) {
                    if (null == i && (i = 2), (!t.canDragY || t.canDragY(n)) && _g.dragcontrol._testDragEventAccess(n, i))return console.log("dragup"), e = !0, $.zoom && 1 != $.zoom && (n.gesture.deltaY = n.gesture.deltaY / $.zoom), o = n.gesture.deltaY, t.dragup && t.dragup(n), n.gesture.preventDefault(), !1
                }), $(t.el).hammer().on("dragdown", function (n) {
                    if (null == i && (i = 2), (!t.canDragY || t.canDragY(n)) && _g.dragcontrol._testDragEventAccess(n, i))return console.log("dragdown"), e = !0, $.zoom && 1 != $.zoom && (n.gesture.deltaY = n.gesture.deltaY / $.zoom), o = n.gesture.deltaY, t.dragdown && t.dragdown(n), n.gesture.preventDefault(), !1
                }), $(t.el).hammer().on("dragend", function (s) {
                    if (console.log("slide is dragended"), e || (i = null), (!t.canDrag || t.canDrag(s)) && _g.dragcontrol._testDragEventAccess(s, i))return (1 == i && n || 2 == i && o) && ($.zoom && 1 != $.zoom && (2 == i && o && (s.gesture.deltaY = s.gesture.deltaY / $.zoom), 1 == i && n && (s.gesture.deltaX = s.gesture.deltaX / $.zoom)), t.dragend && t.dragend(s)), e = !1, i = null, n = 0, o = 0, s.gesture.preventDefault(), !1
                })
            }, _testDragEventAccess: function (t, e) {
                var i = !0;
                return 1 == e && ("dragup" != t.type && "dragdown" != t.type || (i = !1)), 2 == e && ("dragleft" != t.type && "dragright" != t.type || (i = !1)), "dragend" == t.type && (e || (i = !1)), i
            }
        };
        n = [i(0), i(5)], void 0 !== (o = function () {
            return window._g.dragcontrol = s, window._g.dragcontrol
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var s = {
            support: function () {
                return !!document.createElement("video").canPlayType
            }(), medias: [], collect: function (t, e) {
                _g.html5media.support && (t || (t = document), e || (e = "id"), $(t).find("video,audio").each(function () {
                    var t = {
                        media: this,
                        duration: 0,
                        currentTime: 0,
                        timer: 0,
                        seekx: 0,
                        seekPos: 0,
                        buffered: 0,
                        timerBuffer: 0,
                        type: "VIDEO" == this.tagName ? "video" : "audio",
                        autoplay: $(this).attr("autoplay"),
                        id: $(this).attr(e)
                    };
                    _g.html5media.medias.push(t), this.addEventListener("ended", function () {
                    }, !0), this.addEventListener("play", function () {
                    }, !0), this.addEventListener("timeupdate", function () {
                    }, !0), this.addEventListener("pause", function () {
                    }, !0)
                }))
            }, findById: function (t) {
                return _g.html5media.support ? _.find(_g.html5media.medias, function (e) {
                    return e.id == t
                }) : null
            }, play: function (t) {
                var e = _g.html5media.findById(t);
                try {
                    e.media.play()
                } catch (t) {
                }
            }, pause: function (t) {
                var e = _g.html5media.findById(t);
                try {
                    e.media.pause()
                } catch (t) {
                }
            }, pauseAll: function () {
                _.each(_g.html5media.medias, function (t) {
                    _g.html5media.pause(t.id)
                })
            }, stopAll: function () {
                _.each(_g.html5media.medias, function (t) {
                    _g.html5media.stop(t.id)
                })
            }, stop: function (t) {
                var e = _g.html5media.findById(t);
                try {
                    e.media.pause(), e.media.currentTime = 0
                } catch (t) {
                }
            }, toggle: function (t) {
                var e = _g.html5media.findById(t);
                try {
                    e.media.paused ? e.media.play() : e.media.pause()
                } catch (t) {
                }
            }
        };
        n = [i(0), i(2)], void 0 !== (o = function () {
            return window._g.html5media = s, window._g.html5media
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (module, exports, __webpack_require__) {
    "use strict";
    function _defineProperty(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i, t
    }

    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__, _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    !function () {
        var _g_mvc = {
            createModel: function createModel(opts) {
                var defaults = {
                    defaults: {},
                    autoIndex: !0,
                    autoUpdate: !0,
                    autoRemove: !0,
                    enableSync: !0,
                    createUrl: null,
                    updateUrl: null,
                    removeUrl: null,
                    fetchUrl: null,
                    staticFetchUrl: null,
                    staticRemoveUrl: null,
                    staticCreateUrl: null,
                    staticUpdateUrl: null,
                    fetchUrlName: null,
                    removeUrlName: null,
                    createUrlName: null,
                    updateUrlName: null,
                    restful: !1,
                    debug: !1,
                    bindChange: null,
                    bindRemove: null,
                    callback: null,
                    initView: null,
                    patchKeys: null,
                    initialize: function initialize() {
                        if (this.iViewlist = [], this.iCollectionlist = [], this.get("id")) this.preset(); else if (this.set("isNew", !0), this.autoIndex) {
                            var prefix = this.get("type") || this.get("iType") || "M";
                            this.set("id", prefix + "_" + _g.uuid()), this.preset()
                        } else this.save({}, {
                            wait: !0, success: function success(model, response) {
                                var returned = eval(response);
                                "Success" != returned.Status && 200 != returned.code || model.set("id", returned.ID.toString()), model.preset()
                            }
                        })
                    },
                    addView: function (t, e) {
                        if ("function" == typeof e && (this[t] = new e({model: this})), "object" == (void 0 === e ? "undefined" : _typeof(e))) {
                            var i = _g.mvc.createView(e);
                            this[t] = new i({model: this})
                        }
                        this[t] && this.iViewlist.push(this[t])
                    },
                    addCollection: function (t, e) {
                        if ("function" == typeof e && (this[t] = new e), "object" == ("undefined" == typeof view ? "undefined" : _typeof(view))) {
                            var i = _g.mvc.createCollection(e);
                            this[t] = new i
                        }
                        this[t] && this.iCollectionlist.push(this[t])
                    },
                    preset: function () {
                        this.callback && this.callback(this);
                        var t = this;
                        this.autoUpdate && this.on("change", function () {
                            t.updateAllViews()
                        }), this.autoRemove && this.on("destroy", function (t, e, i) {
                            t.removeAllViews(), t.bindRemove && t.bindRemove(t, i)
                        }), this.bindChange && this.bindChange(), this.initView && this.addView("iview", this.initView)
                    },
                    updateAllViews: function () {
                        _.each(this.iViewlist, function (t) {
                            t.$el && t.update()
                        })
                    },
                    removeView: function (t) {
                        this[t] && (this[t].$el.remove(), this.iViewlist = _.reject(this.iViewlist, function (e) {
                            return e == this[t]
                        }), this[t] = null)
                    },
                    removeAllViews: function (t) {
                        _.each(this.iViewlist, function (e) {
                            e.$el && (t ? e.undelegateEvents() : e.$el.remove())
                        })
                    }
                };
                opts = opts ? $.extend(!0, {}, defaults, opts) : defaults;
                var Model = Backbone.Model.extend(opts);
                return Model
            }, createView: function (t) {
                var e, i = (e = {
                    template: null,
                    className: null,
                    containment: null,
                    wrap: null,
                    wrapClassName: null,
                    autoRender: !0,
                    position: 1,
                    parseData: null,
                    callback: null,
                    bindChange: null,
                    parseTemplate: null,
                    templateKey: null,
                    templateName: null,
                    afterRender: null,
                    afterUpdate: null,
                    initialize: function () {
                        _.bindAll(this), this.autoRender && this.render(), this.callback && this.callback(this)
                    },
                    createEl: function () {
                        var t, e = this.model.toJSON();
                        return this.parseData && (e = this.parseData()), t = this.parseTemplate ? this.parseTemplate(this.template) : this.template, _g.renderT(t, e, this.templateKey, this.templateName)
                    },
                    render: function (t, e) {
                        if (!this.model || !this.template)return !1;
                        if (!_g.domExist(this.$el)) {
                            if (!t && !this.containment)return !1;
                            t || (t = $(this.containment)), e || (e = this.position), this.wrap && !$(this.containment).is(this.wrap) && (0 == $(this.containment).children(this.wrap).length && $(this.containment).append(document.createElement(this.wrap)), t = $(this.containment).children(this.wrap), this.containment && this.wrapClassName && t.addClass(this.wrapClassName));
                            var i = this.createEl(), n = i;
                            return this.setElement(n), 1 == e ? t.append(n) : t.prepend(n), this.className && this.$el.addClass(this.className), this.afterRender && this.afterRender(this), this
                        }
                        var i = this.createEl(), n = i;
                        this.$el.replaceWith(n), this.setElement(n), this.afterUpdate && this.afterUpdate(this)
                    },
                    update: function () {
                        this.render()
                    }
                }, _defineProperty(e, "afterUpdate", function () {
                    this.afterRender && this.afterRender(this)
                }), _defineProperty(e, "events", {}), e);
                return t = t ? $.extend(!0, {}, i, t) : i, Backbone.View.extend(t)
            }, createCollection: function (t) {
                var e = {
                    enableSync: !1,
                    fetchUrl: null,
                    staticFetchUrl: null,
                    saveUrl: null,
                    staticSaveUrl: null,
                    debug: !1,
                    bindRemove: !1,
                    bindReset: !0,
                    bindAdd: null,
                    callback: null,
                    patchKeys: null,
                    name: null,
                    initialize: function () {
                        var t = this;
                        this.bindRemove && this.on("remove", function (e) {
                            "function" == typeof t.bindRemove ? t.bindRemove(e) : e.removeAllViews()
                        }), this.bindReset && this.on("reset", function (e, i) {
                            "function" == typeof t.bindReset ? t.bindReset(e, i) : _.each(i.previousModels, function (t) {
                                t.removeAllViews()
                            }), t.afterReset && t.afterReset(e, i)
                        }), this.bindAdd && this.on("add", function (e) {
                            t.bindAdd()
                        }), this.callback && this.callback(this)
                    },
                    refreshView: function (t) {
                        var e = {containment: null, viewname: null};
                        t = t ? $.extend({}, e, t) : e, this.length > 0 && (_.each(this.at(0).iViewlist, function (e) {
                            containment = t.containment || e.containment, containment && (e.wrap && !$(containment).is(e.wrap) ? $(containment).children(e.wrap).empty() : $(containment).empty())
                        }), this.each(function (e) {
                            t.containment && (e.iview.containment = t.containment), t.viewname ? e[viewname].update() : e.iview.update()
                        }))
                    },
                    removeAllViews: function (t) {
                        this.each(function (e) {
                            e.removeAllViews(t)
                        })
                    }
                };
                return t = t ? $.extend(!0, {}, e, t) : e, Backbone.Collection.extend(t)
            }
        };
        __WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(1), __webpack_require__(4), __webpack_require__(0)], void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return window._g.mvc = _g_mvc, _g_mvc = void 0, window._g.mvc
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
    }(window)
}, function (t, e, n) {
    "use strict";
    var o, s;
    !function () {
        var r = function (t) {
            this.init(t)
        };
        r.prototype = {
            isDraged: !1, init: function (t) {
                var e = {
                    containment: null,
                    containmentClass: "c-transition-containment",
                    perspectiveClass: "c-perspective",
                    itemClass: "c-transition-item",
                    currentClass: "c-transition-current",
                    leftClass: "c-transition-left",
                    rightClass: "c-transition-right",
                    upClass: "c-transition-up",
                    downClass: "c-transition-down",
                    activeClass: "c-transition-active",
                    topClass: "c-transition-top",
                    repeat: !1,
                    direction: 0,
                    type: 1,
                    duration: 1e3,
                    onStart: null,
                    onEnd: null,
                    control: !0,
                    autoplay: !1,
                    width: null,
                    height: null,
                    disableControlled: !1,
                    autoplayDirection: -1,
                    autoplayAxis: null
                };
                return this.opts = t ? $.extend(!0, {}, e, t) : e, !!this.opts.containment && ($(this.opts.containment).addClass(this.opts.containmentClass), _.bindAll(this), this.opts.control && (this.control(), this.opts.disableControlled && this.disableControl()), this.opts.autostart ? (this.timerDisabled = !1, this.timerstart({})) : this.timerDisabled = !0, this)
            }, disableControlled: !1, disableControl: function () {
                this.disableControlled = !0
            }, enableControl: function () {
                this.disableControlled = !1
            }, control: function () {
                var t = this;
                _g.dragcontrol.bind({
                    el: this.opts.containment, dragstart: function (e) {
                        console.log(e), t.disableControlled || t.start(e)
                    }, dragleft: function (e) {
                        t.disableControlled || (t.dragX(e), t.opts.onStart && t.opts.onStart(t.currentItem.index(), t.activeItem.index()))
                    }, dragright: function (e) {
                        t.disableControlled || (t.dragX(e), t.opts.onStart && t.opts.onStart(t.currentItem.index(), t.activeItem.index()))
                    }, dragup: function (e) {
                        t.disableControlled || (t.dragY(e), t.opts.onStart && t.opts.onStart(t.currentItem.index(), t.activeItem.index()))
                    }, dragdown: function (e) {
                        t.disableControled || (t.dragY(e), t.opts.onStart && t.opts.onStart(t.currentItem.index(), t.activeItem.index()))
                    }, dragend: function (e) {
                        if (!t.disableControlled) {
                            if (t.direction && !t.timerDisabled) {
                                var i = "x" == t.direction ? e.gesture.deltaX : e.gesture.deltaY;
                                t.TimerDirection = i > 0 ? 1 : -1
                            }
                            t.dragEnd(e)
                        }
                    }, canDragX: function () {
                        return !t.opts.autoplayAxis || "x" == t.opts.autoplayAxis
                    }, canDragY: function () {
                        return !t.opts.autoplayAxis || "y" == t.opts.autoplayAxis
                    }
                })
            }, stashitemClass: function () {
                $(this.opts.containment).find("." + this.opts.itemClass).css({
                    transform: "",
                    "-moz-transform": "",
                    "-webkit-transform": "",
                    "-o-transform": "",
                    "-ms-transform": "",
                    opacity: ""
                }), this.stashClass = {
                    current: $(this.opts.containment).find("." + this.opts.currentClass).attr("style"),
                    left: $(this.opts.containment).find("." + this.opts.leftClass).attr("style"),
                    right: $(this.opts.containment).find("." + this.opts.rightClass).attr("style"),
                    up: $(this.opts.containment).find("." + this.opts.upClass).attr("style"),
                    down: $(this.opts.containment).find("." + this.opts.downClass).attr("style")
                }, this.stashed = !0
            }, recoveritemClass: function () {
                if (this.stashed)try {
                    this.currentItem.attr("style", this.stashClass.current || ""), this.activeItem.hasClass(this.opts.leftClass) ? this.activeItem.attr("style", this.stashClass.left || "") : this.activeItem.hasClass(this.opts.rightClass) ? this.activeItem.attr("style", this.stashClass.right || "") : this.activeItem.hasClass(this.opts.upClass) ? this.activeItem.attr("style", this.stashClass.up || "") : this.activeItem.hasClass(this.opts.downClass) && this.activeItem.attr("style", this.stashClass.down || "")
                } catch (t) {
                    console.log(t)
                }
                $(this.opts.containment).find("." + this.opts.itemClass).css({
                    transform: "",
                    "-moz-transform": "",
                    "-webkit-transform": "",
                    "-o-transform": "",
                    "-ms-transform": "",
                    opacity: ""
                }), this.stashed = !1
            }, start: function (t, e) {
                this.isTransiting || (e || (e = this.opts.type), this.args = _g.transitionargs[e], this.args.perspective ? $(this.opts.containment).addClass(this.opts.perspectiveClass) : $(this.opts.containment).removeClass(this.opts.perspectiveClass), this.currentItem = $(this.opts.containment).find("." + this.opts.currentClass), this.currentItem.addClass(this.opts.topClass), this.stashitemClass())
            }, dragX: function (t) {
                if (!this.isTransiting && (t.gesture.deltaX <= 0 ? (this.plus = -1, this.activeItem = $(this.opts.containment).find("." + this.opts.rightClass)) : (this.plus = 1, this.activeItem = $(this.opts.containment).find("." + this.opts.leftClass)), this.activeItem.length)) {
                    var e = t.gesture.deltaX;
                    this.direction = "x", this.dragHandle(e)
                }
            }, dragY: function (t) {
                if (!this.isTransiting && (t.gesture.deltaY <= 0 ? (this.plus = -1, this.activeItem = $(this.opts.containment).find("." + this.opts.downClass)) : (this.plus = 1, this.activeItem = $(this.opts.containment).find("." + this.opts.upClass)), this.activeItem.length)) {
                    var e = t.gesture.deltaY;
                    this.direction = "y", this.dragHandle(e)
                }
            }, dragHandle: function (t) {
                $(this.opts.containment).find("." + this.opts.itemClass).removeClass(this.opts.activeClass), this.activeItem.addClass(this.opts.activeClass), this.currentItem = $(this.opts.containment).find("." + this.opts.currentClass);
                var e = Math.abs(t) / $(this.opts.containment).width();
                if (_g.browserSupport({msie: 9}))if (this.args.percentcontrol) {
                    for (i = 0; i < this.args.percentcontrol.length; i++)if (e <= this.args.percentcontrol[i]) {
                        if (this.args[this.args.percentcontrol[i]][this.direction].css) {
                            var n = this.args[this.args.percentcontrol[i]][this.direction].css;
                            n.currentItem && this.currentItem.css(this.getArgs(n.currentItem, this.plus, e)), n.activeItem && this.activeItem.css(this.getArgs(n.activeItem, this.plus, e))
                        }
                        this.activeItem.css(this.getArgs(this.args[this.args.percentcontrol[i]][this.direction].activeItem, this.plus, e)), this.currentItem.css(this.getArgs(this.args[this.args.percentcontrol[i]][this.direction].currentItem, this.plus, e));
                        break
                    }
                } else {
                    if (this.args[this.direction].css) {
                        var n = this.args[this.direction].css;
                        n.currentItem && this.currentItem.css(this.getArgs(n.currentItem, this.plus, e)), n.activeItem && this.activeItem.css(this.getArgs(n.activeItem, this.plus, e))
                    }
                    this.activeItem.css(this.getArgs(this.args[this.direction].activeItem, this.plus, e)), this.currentItem.css(this.getArgs(this.args[this.direction].currentItem, this.plus, e))
                } else this.currentItem.css("x" == this.direction ? "margin-left" : "margin-top", this.plus * e * 100 + "%"), this.activeItem.css("x" == this.direction ? "margin-left" : "margin-top", -this.plus * (1 - e) * 100 + "%");
                this.args.currentTop ? this.currentItem.addClass(this.opts.topClass) : this.currentItem.removeClass(this.opts.topClass), this.args.activeTop && this.activeItem.addClass(this.opts.topClass), this.opts.onTransition && this.opts.onTransition(event, e)
            }, dragEnd: function (t) {
                if (!this.isTransiting && this.currentItem.length && this.activeItem.length) {
                    var e = this;
                    this.isTransiting = !0;
                    var n = "x" == this.direction ? t.gesture.deltaX : t.gesture.deltaY, o = Math.abs(n) / $(this.opts.containment).width();
                    if (_g.browserSupport({msie: 9}))if (this.args.percentcontrol) {
                        for (this.percent = o, i = 0; i < this.args.percentcontrol.length; i++)if (o <= this.args.percentcontrol[i]) {
                            this.transitPercent(i);
                            break
                        }
                    } else {
                        var s = 1200;
                        "undefined" != typeof coolsite && (s = 1);
                        var r = this.getArgs(this.args[this.direction].currentItem, this.plus, 1);
                        r.duration = s, r.easing = this.args.currentEasing;
                        var a = this.getArgs(this.args[this.direction].activeItem, this.plus, 1);
                        a.duration = s, a.easing = this.args.activeEasing, a.complete = function () {
                            e.isTransiting = !1, e.onTransitionEnd()
                        }, this.currentItem.transit(r), this.activeItem.transit(a)
                    } else this.activeItem.css("x" == this.direction ? "margin-left" : "margin-top", "0%"), this.currentItem.css("x" == this.direction ? "margin-left" : "margin-top", 100 * -this.plus + "%");
                    console.log("dragend")
                }
            }, onTransitionEnd: function () {
                var t = this;
                this.recoveritemClass(), this.currentItem.removeClass(this.opts.currentClass), this.activeItem.addClass(this.opts.currentClass).removeClass(this.opts.activeClass).removeClass(this.opts.upClass).removeClass(this.opts.rightClass).removeClass(this.opts.leftClass).removeClass(this.opts.downClass), $(this.opts.containment).find("." + this.opts.itemClass).removeClass(this.opts.topClass);
                var e = this.currentItem.index(), i = this.activeItem.index();
                $(this.opts.containment).removeClass(this.opts.perspectiveClass), t.opts.onEnd && t.opts.onEnd(e, i), this.timerStart()
            }, transitPercent: function (t) {
                var e = this;
                if (t < this.args.percentcontrol.length) {
                    var e = this, i = this.opts.duration * (this.args.percentcontrol[t] - this.percent), n = this.getArgs(this.args[this.args.percentcontrol[t]][this.direction].currentItem, this.plus, this.args.percentcontrol[t]);
                    n.duration = i, n.easing = this.args.currentEasing;
                    var o = this.getArgs(this.args[this.args.percentcontrol[t]][this.direction].activeItem, this.plus, this.args.percentcontrol[t]);
                    o.duration = i, o.easing = this.args.activeEasing, o.complete = function () {
                        e.transitPercent(t + 1)
                    }, this.percent = this.args.percentcontrol[t], this.currentItem.transit(n), this.activeItem.transit(o)
                } else e.isTransiting = !1, this.onTransitionEnd()
            }, getArgs: function (t, e, i) {
                var n = {};
                return _.each(t, function (t, o) {
                    n[o] = "function" == typeof t ? t(e, i) : t
                }), n
            }, autostart: function (t, e, i) {
                if (!this.isTransiting && (this.args = _g.transitionargs[t], this.currentItem = $(this.opts.containment).find("." + this.opts.currentClass), this.stashitemClass(), "x" == e && (this.activeItem = i < 0 ? $(this.opts.containment).find("." + this.opts.rightClass) : $(this.opts.containment).find("." + this.opts.leftClass)), "y" == e && (this.activeItem = i < 0 ? $(this.opts.containment).find("." + this.opts.downClass) : $(this.opts.containment).find("." + this.opts.upClass)), this.activeItem.length)) {
                    this.args.currentTop && this.currentItem.addClass(this.opts.topClass), this.plus = i, this.direction = e, this.args.perspective ? $(this.opts.containment).addClass(this.opts.perspectiveClass) : $(this.opts.containment).removeClass(this.opts.perspectiveClass);
                    var n = {gesture: {}};
                    "x" == e ? n.gesture.deltaX = 0 : n.gesture.deltaY = 0, this.opts.onStart && this.opts.onStart(this.currentItem.index(), this.activeItem.index()), this.dragHandle(0), this.dragEnd(n)
                }
            }, enableTimer: function () {
                this.timerDisabled = !1
            }, disableTimer: function () {
                this.timerDisabled = !0
            }, setCurrent: function (t, e) {
                var i, n = this;
                $(this.opts.containment).children("." + this.opts.itemClass).removeClass(this.opts.topClass).removeClass(this.opts.activeClass).removeClass(this.opts.upClass).removeClass(this.opts.rightClass).removeClass(this.opts.leftClass).removeClass(this.opts.downClass);
                var o = $(this.opts.containment).children().length;
                if (t >= o) {
                    if (!this.opts.repeat)return void this.timerStop();
                    this.current = 0, t = 0
                } else if (t < 0) {
                    if (!this.opts.repeat)return void this.timerStop();
                    this.current = o - 1, t = o - 1
                }
                if ($(this.opts.containment).children().each(function () {
                        $(this).index() == t ? (i = $(this), $(this).addClass(n.opts.currentClass)) : $(this).removeClass(n.opts.currentClass)
                    }), e && i) {
                    if ("x" == e)var s = this.opts.leftClass, r = this.opts.rightClass; else var s = this.opts.upClass, r = this.opts.downClass;
                    i.prev().length ? i.prev().addClass(s) : this.opts.repeat && $(this.opts.containment).children().last().addClass(s), i.next().length ? i.next().addClass(r) : this.opts.repeat && $(this.opts.containment).children().first().addClass(r)
                }
            }, timerStart: function (t) {
                if (!this.timerDisabled) {
                    var e = this;
                    if (t) t.type || (t.type = e.opts.type), t.axis || (t.axis = "x"), t.diretion || (t.direction = -1), t.startAt || (t.startAt = 0), this.setCurrent(t.startAt, t.axis), this.current = t.startAt, this.TimerArgs = t; else {
                        if (!this.TimerArgs)return;
                        t = this.TimerArgs, this.TimerDirection = this.TimerDirection || e.opts.autoplayDirection, this.current = null != this.tempCurrent ? this.tempCurrent : -1 == this.TimerDirection ? this.current + 1 : this.current - 1, this.tempCurrent = null, this.TimerDirection = null, this.setCurrent(this.current, t.axis)
                    }
                    this.Timer && window.clearTimeout(this.Timer), this.Timer = window.setTimeout(function () {
                        e.autostart(t.type, t.axis, t.direction)
                    }, this.opts.interval)
                }
            }, timerStop: function (t) {
                this.Timer && (window.clearTimeout(this.Timer), this.Timer = null), this.TimerArgs = null, this.disableTimer()
            }
        }, o = [n(0), n(6), n(11)], void 0 !== (s = function () {
            return window._g.transition = r, window._g.transition
        }.apply(e, o)) && (t.exports = s)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var i = {
            init: function () {
                var t = {
                    model: function (t, e) {
                        return new coolsite_play.model.action.action(t, e)
                    }
                };
                coolsite_play.collection.action = _g.mvc.createCollection(t);
                var e = {
                    model: function (t, e) {
                        return new coolsite_play.model.animation.animation(t, e)
                    }
                };
                coolsite_play.collection.animation = _g.mvc.createCollection(e);
                var i = {enableSync: !1};
                coolsite_play.collection.element = _g.mvc.createCollection(i), coolsite_play.collection.slider = coolsite_play.collection.element.extend({
                    model: function (t, e) {
                        return new coolsite_play.model.element.slider(t, e)
                    }, generate: function () {
                        var t = this;
                        this.reset([], {silent: !0}), $(document).find(".c-slider:not(.cf-ref)").each(function () {
                            var e = t.getArgs(this);
                            t.add({args: e}), t.last().iview.setElement(this), t.last().iview.afterRender()
                        })
                    }, getArgs: function (t) {
                        var e = $(t).attr("data-c_slider_args"), e = e.split(";"), i = {};
                        return _.each(e, function (t) {
                            var e = t.split(":");
                            i[e[0]] = e[1]
                        }), i
                    }, stop: function () {
                        this.each(function (t) {
                            t.stop()
                        })
                    }
                });
                var n = {
                    model: function (t, e) {
                        return new coolsite_play.model.timeline.timeline(t, e)
                    }
                };
                coolsite_play.collection.timeline = _g.mvc.createCollection(n), _cs.mvc.init_controllers(), _cs.mvc.init_views(), _cs.mvc.init_models(), coolsite_play.animationlist = new coolsite_play.collection.animation, coolsite_play.timelinelist = new coolsite_play.collection.timeline, coolsite_play.sliderlist = new coolsite_play.collection.slider, coolsite_play.actionlist = new coolsite_play.collection.action
            }, init_models: function () {
                var t = {
                    enableSync: !1, autoIndex: !0, element: null, bindRemove: function (t, e) {
                    }, callback: function () {
                        this.type = this.get("data").type, this.exec = this.get("data").exec
                    }, initView: coolsite_play.view.action.action, getArgs: function () {
                        var t = this.get("data").args;
                        return $.extend(!0, {}, t)
                    }, getType: function () {
                        return this.get("data").type
                    }
                };
                coolsite_play.model.action.action = _g.mvc.createModel(t);
                var e = {
                    enableSync: !1, autoIndex: !0, element: null, bindRemove: function (t, e) {
                    }, callback: function () {
                    }, initView: coolsite_play.view.animation.animation
                };
                coolsite_play.model.animation.animation = _g.mvc.createModel(e);
                var i = {
                    enableSync: !1,
                    autoIndex: !0,
                    initView: coolsite_play.view.element.element,
                    callback: function () {
                    }
                };
                coolsite_play.model.element.element = _g.mvc.createModel(i), coolsite_play.model.element.slider = coolsite_play.model.element.element.extend({
                    initView: coolsite_play.view.element.slider,
                    start: function () {
                        var t, e = this, i = this.get("args");
                        if (this.transition = t = this.getTransition(), !this.silderStart) {
                            if (this.sliderStart = !0, this.iview.$el.children(".c-leftarrow").on("click", function () {
                                    e.switchSlide("prev")
                                }), this.iview.$el.children(".c-rightarrow").on("click", function () {
                                    e.switchSlide("next")
                                }), coolsite_play.isPreview || _.each(this.iview.slidernavdots, function (t, i) {
                                    $(t).on("click", function () {
                                        e.switchSlide(i)
                                    })
                                }), this.iview.$el.children(".c-slider-mask").data("sliderId", this.id), !Number(i.ap))return;
                            t.enableTimer(), t.timerStart({})
                        }
                    },
                    stop: function () {
                        this.sliderStart && (this.transition.timerStop(), this.iview.$el.children(".c-leftarrow").off("click"), this.iview.$el.children(".c-rightarrow").off("click"), coolsite_play.isPreview || this.iview.slidernavdots.off("click"), this.sliderStart = !1)
                    },
                    switchSlide: function (t) {
                        if (!this.transition || !this.transition.isTransiting) {
                            var e = this.get("args");
                            if ("prev" == t && (this.transition.TimerDirection = 1, this.transition.autostart(e.type, "x", 1)), "next" == t && this.transition.autostart(e.type, "x", -1), _.isNumber(t)) {
                                var i;
                                if (t == this.transition.currentIndex)return null;
                                i = t > this.transition.currentIndex ? -1 : 1, this.transition.currentIndex = t, this.transition.prepareNextClass(this.iview.slidermask, t, i), this.transition.TimerDirection = i, this.transition.Timer && window.clearTimeout(this.transition.Timer), this.transition.tempCurrent = t, this.transition.autostart(e.type, "x", i), this.transition.TimerDirection = -1
                            }
                        }
                    },
                    onChangeTo: function (t, e) {
                        (coolsite_play.isPreview || coolsite_play.isPlay) && (_.isNumber(t) && this.iview.slides.eq(t).trigger("recover"), this.iview.slides.eq(e).trigger("changeTo"))
                    },
                    getTransition: function () {
                        if (this.transition)return this.transition;
                        var t = this.iview.$el.attr("data-c_sliderid"), e = coolsite_editor.elementlist.get(t);
                        return e ? e.transition : null
                    }
                });
                var n = {
                    enableSync: !1, autoIndex: !0, element: null, bindRemove: function (t, e) {
                    }, callback: function () {
                    }, initView: coolsite_play.view.timeline.timeline, play: function () {
                        var t = this.getArgs();
                        t && 2 == t.st && this.played || (this.played = !0, this.animations || (this.animations = this.get("animations"), this.animations && this.animations.length && (this.animations = _.map(this.animations, function (t) {
                            var e = coolsite_play.animationlist.get(t);
                            return e || null
                        }), this.animations = _.reject(this.animations, function (t) {
                            return !t
                        }), this.animations = _.reject(this.animations, function (t) {
                            return t.toJSON().data.t.wa
                        }))), console.log({animations: this.animations}), this.timeline || (this.timeline = coolsite_play.util.timeline.createTimeline({
                            animations: this.animations,
                            args: t,
                            model: this
                        })), this.timeline.play(0))
                    }, stop: function () {
                        this.timeline && this.timeline.kill()
                    }, recoverStyle: function () {
                        var t = this.getArgs();
                        t && 2 == t.st && this.played || this.animations && _.each(this.animations, function (t) {
                            t.iview.recoverStyle()
                        })
                    }, getArgs: function () {
                        return this.get("data").t
                    }
                };
                coolsite_play.model.timeline.timeline = _g.mvc.createModel(n)
            }, init_views: function () {
                coolsite_play.view.action.action = {
                    autoRender: !1,
                    events: coolsite_play.controller.action.action,
                    execute: function (t) {
                        var e = this.model.getArgs();
                        if (e && 2 == e.st && this.model.triggered)return !1;
                        this.model.triggered = !0;
                        var i = this.model.get("data").exec;
                        switch (i) {
                            case 0:
                                this.renderAnimations();
                                break;
                            case 1:
                                this.renderShow();
                                break;
                            case 2:
                                this.renderHide();
                                break;
                            case 5:
                                this.renderUrl();
                                break;
                            case 6:
                                this.renderSwitch();
                                break;
                            case 10:
                                this.renderUrl();
                                break;
                            case 16:
                                this.renderPhone();
                                break;
                            case 30:
                                this.renderHash();
                                break;
                            case 20:
                                this.renderToggle();
                                break;
                            case 21:
                                this.renderClass("add");
                                break;
                            case 22:
                                this.renderClass("remove");
                                break;
                            case 23:
                                this.renderClass("toggle");
                                break;
                            case 26:
                                this.renderState();
                                break;
                            case 27:
                                this.renderDialog("open", t);
                                break;
                            case 28:
                                this.renderDialog("close", t);
                                break;
                            case 29:
                                this.renderDialog("toggle", t);
                                break;
                            case 32:
                                this.renderHtml("load");
                                break;
                            case 33:
                                this.renderHtml("unload");
                                break;
                            case 52:
                                this.renderMedia("play");
                                break;
                            case 53:
                                this.renderMedia("pause");
                                break;
                            case 54:
                                this.renderMedia("stop");
                                break;
                            case 55:
                                this.renderMedia("toggle")
                        }
                        coolsite_play.util.PluginManage.actionexcutes[i] && coolsite_play.util.PluginManage.actionexcutes[i].config.exec(this)
                    },
                    renderAnimations: function () {
                        var t = this.model.getArgs();
                        this.animations || (this.animations = t.a_ids, this.animations && this.animations.length && (this.animations = _.map(this.animations, function (t) {
                            var e = coolsite_play.animationlist.get(t);
                            return e || null
                        }), this.animations = _.reject(this.animations, function (t) {
                            return !t
                        }))), this.timeline || (this.timeline = coolsite_play.util.timeline.createTimeline({
                            animations: this.animations,
                            args: t
                        })), this.timeline.play(0)
                    },
                    getEl: function (t) {
                        var e = $("[data-c_e_id=" + t + "]");
                        return e = e.length > 1 && void 0 != this.model.siblingIndex && e[this.model.siblingIndex] ? $(e[this.model.siblingIndex]) : e
                    },
                    renderShow: function () {
                        var t = this, e = this.model.getArgs(), i = e.e_ids;
                        _.each(i, function (e) {
                            var i = t.getEl(e);
                            i.length && (i.removeClass("c-initHide"), i.removeClass("cf-initHide"), i.show())
                        })
                    },
                    renderHide: function () {
                        var t = this, e = this.model.getArgs(), i = e.e_ids;
                        _.each(i, function (e) {
                            var i = t.getEl(e);
                            i.length && i.hide()
                        })
                    },
                    renderToggle: function () {
                        var t = this, e = this.model.getArgs(), i = e.e_ids;
                        _.each(i, function (e) {
                            var i = t.getEl(e);
                            i.length && (i.hasClass("c-initHide") || i.hasClass("cf-initHide") ? (i.removeClass("c-initHide"), i.removeClass("cf-initHide"), i.show()) : i.toggle())
                        })
                    },
                    renderClass: function (t, e) {
                        var i = this, n = this.model.getArgs();
                        e || (e = n.cla);
                        var o = n.e_ids;
                        e && _.each(o, function (n) {
                            var o = i.getEl(n);
                            o.length && ("add" == t && o.addClass(e), "remove" == t && o.removeClass(e), "toggle" == t && o.toggleClass(e))
                        })
                    },
                    renderDialog: function (t, e) {
                        var i = this, n = this.model.getArgs(), o = n.e_ids;
                        _.each(o, function (n) {
                            var o = i.getEl(n);
                            if (o.length) {
                                var s = $(e.target).closest("[data-c_contentview_id]");
                                if (s.length) {
                                    var r = s.attr("data-c_contentview_id");
                                    if (console.log(r), o.find("[data-c_e_id=" + r + "]").length) {
                                        var a = s.attr("data-c_content_url");
                                        if (a) {
                                            o.find("[data-c_e_id=" + r + "]").empty();
                                            $.ajax({
                                                url: a, type: "GET", dataType: "html", success: function (t) {
                                                    o && o.find("[data-c_e_id=" + r + "]").length && o.find("[data-c_e_id=" + r + "]").replaceWith(t)
                                                }, error: function () {
                                                }, timeout: 1e4
                                            })
                                        }
                                    }
                                }
                                "open" == t ? (o.removeClass("c-initHide"), o.removeClass("cf-initHide"), o.show(), $("body").addClass("modal-open"), $("html").addClass("c-modal-patch"), window.setTimeout(function () {
                                    o.addClass("c-dialog-open")
                                }, 300)) : "close" == t ? (o.removeClass("c-dialog-open"), $("body").removeClass("modal-open"), $("html").removeClass("c-modal-patch"), window.setTimeout(function () {
                                    o.hide()
                                }, 300)) : "toggle" == t && (o.hasClass("c-dialog-open") ? (o.removeClass("c-dialog-open"), $("body").removeClass("modal-open"), $("html").removeClass("c-modal-patch"), window.setTimeout(function () {
                                    o.hide()
                                }, 300)) : (o.removeClass("c-initHide"), o.removeClass("cf-initHide"), o.show(), $("body").addClass("modal-open"), $("html").addClass("c-modal-patch"), window.setTimeout(function () {
                                    o.addClass("c-dialog-open")
                                }, 300)))
                            }
                        })
                    },
                    renderMedia: function (t) {
                        var e = this.model.getArgs(), i = e.e_ids;
                        _.each(i, function (e) {
                            switch (t) {
                                case"play":
                                    _g.html5media.play(e);
                                    break;
                                case"pause":
                                    _g.html5media.pause(e);
                                    break;
                                case"stop":
                                    _g.html5media.stop(e);
                                    break;
                                case"toggle":
                                    _g.html5media.toggle(e)
                            }
                        })
                    },
                    renderState: function (t) {
                        var e = this, i = this.model.getArgs();
                        t || (t = i.cla);
                        var n = i.e_ids;
                        _.each(n, function (i) {
                            var n = e.getEl(i);
                            if (n.length) {
                                if ("c-state1" != t && n.removeClass("c-state1"), "c-state2" != t && n.removeClass("c-state2"), "c-state3" != t && n.removeClass("c-state3"), !t)return;
                                n.addClass(t)
                            }
                        })
                    },
                    renderUrl: function () {
                        var t = this.model.getArgs();
                        if (t.url) {
                            var e = this.model.get("data").exec;
                            if (10 == e ? 0 == t.url.indexOf("#") || -1 != t.url.indexOf("://") || (t.url = "http://" + t.url) : 5 == e && "undefined" != typeof portal_url && (t.url = portal_url + t.url), t.blank) {
                                if (coolsite_play.isPreview)return coolsite_editor.ui.message.show("warning", coolsite_editor.WARN[100]), !1;
                                window.open(t.url)
                            } else {
                                if (coolsite_play.isPreview)return coolsite_editor.ui.message.show("warning", coolsite_editor.WARN[100]), !1;
                                window.location.href = t.url
                            }
                        }
                    },
                    renderHash: function () {
                        var t = this.model.getArgs();
                        t.url && coolsite_play.events.scroll.doHashScroll(null, t.url)
                    },
                    renderPhone: function () {
                        var t = this.model.getArgs();
                        t.url && (window.location = "tel:" + t.url)
                    },
                    renderHtml: function (t) {
                        var e = this, i = this.model.getArgs(), n = i.e_ids;
                        _.each(n, function (i) {
                            var n = e.getEl(i);
                            n.length && ("load" == t ? (n.removeClass("c-initHide"), n.removeClass("cf-initHide"), n.show(), n.attr("data-src") && n.attr("src", n.attr("data-src")), n.attr("data-srcdoc") && (_g.device.msie() ? n[0].contentWindow.document.write(n.attr("data-srcdoc")) : n.attr("srcdoc", n.attr("data-srcdoc")))) : "unload" == t && (n.attr("src") && n.removeAttr("src"), n.attr("srcdoc") && (_g.device.msie() ? n[0].contentWindow.document.write("") : n.removeAttr("srcdoc"))))
                        })
                    },
                    renderSwitch: function () {
                        var t = this, e = this.model.getArgs(), i = e.e_ids;
                        _.each(i, function (i) {
                            var n = t.getEl(i);
                            n.length && n.trigger("switchTo", e.i)
                        })
                    }
                }, coolsite_play.view.animation.animation = {
                    autoRender: !1,
                    events: coolsite_play.controller.animation.animation,
                    stashStyle: function () {
                        if (this.$el.length > 1) {
                            var t = this;
                            t.tmpClass = [], t.tmpStyle = [], _.each(this.$el, function (e) {
                                t.tmpClass.push($(e).attr("class")), t.tmpStyle.push($(e).attr("style"))
                            })
                        } else this.tmpClass = this.$el.attr("class"), this.tmpStyle = this.$el.attr("style")
                    },
                    recoverStyle: function () {
                        if (this.$el.length > 1) {
                            var t = this;
                            _.each(this.$el, function (e, i) {
                                $(e).attr("class", t.tmpClass[i]), $(e).attr("style", t.tmpStyle[i])
                            })
                        } else this.$el.attr("class", this.tmpClass), this.$el.attr("style", this.tmpStyle)
                    }
                }, coolsite_play.view.element.element = {
                    autoRender: !1,
                    events: coolsite_play.controller.element.element
                }, coolsite_play.view.element.slider = $.extend(!0, {}, coolsite_play.view.element.element, {
                    events: coolsite_play.controller.element.slider,
                    afterRender: function () {
                        this.slidernav = this.$el.children(".c-slider-nav"), this.slidernavdots = this.slidernav.children(".c-slider-nav-dot"), this.slidermask = this.$el.children(".c-slider-mask"), this.slides = this.slidermask.children(".c-slide");
                        var t = this.model.get("args");
                        coolsite_play.isPreview || (this.model.transition = coolsite_play.slider(this.slidermask, t), this.model.transition.refreshSlideClass(this.slidermask, 0), this.slidernavdots.first().addClass("c-active"), this.model.transition.currentIndex = 0)
                    }
                }), coolsite_play.view.timeline.timeline = {
                    autoRender: !1,
                    events: coolsite_play.controller.timeline.timeline
                }
            }, init_controllers: function () {
                coolsite_play.controller.action.action = {
                    c_start: function (t) {
                        if ($(t.target).is(this.$el))return 6 == this.model.type ? (this.execute(t), !1) : void 0
                    }, click: function (t) {
                        if (console.log("element click"), 0 == this.model.type)return this.execute(t), $(t.target).closest(".btn-listitem").length && $(t.target).closest(".btn-listitem").trigger("button_active"), !1
                    }, dblclick: function (t) {
                        if (console.log("element dblclick"), 4 == this.model.type)return this.execute(t), !1
                    }, mouseover: function (t) {
                        if (console.log("element mouseover"), 20 == this.model.type)return this.execute(t), !1
                    }, mouseout: function (t) {
                        if (21 == this.model.type)return this.execute(t), !1
                    }, c_scroll: function (t) {
                        23 == this.model.type && this.execute(t)
                    }, c_scrollUp: function (t) {
                        $(t.target).is(this.$el) && 24 == this.model.type && this.execute(t)
                    }, c_scrollDown: function (t) {
                        $(t.target).is(this.$el) && 25 == this.model.type && this.execute(t)
                    }, scrollIn: function (t) {
                        $(t.target).is(this.$el) && 26 == this.model.type && this.execute(t)
                    }, scrollUpIn: function (t) {
                        $(t.target).is(this.$el) && 27 == this.model.type && this.execute(t)
                    }, scrollDownIn: function (t) {
                        $(t.target).is(this.$el) && 28 == this.model.type && this.execute(t)
                    }, scrollOut: function (t) {
                        $(t.target).is(this.$el) && 29 == this.model.type && this.execute(t)
                    }, scrollUpOut: function (t) {
                        $(t.target).is(this.$el) && 30 == this.model.type && this.execute(t)
                    }, scrollDownOut: function (t) {
                        $(t.target).is(this.$el) && 31 == this.model.type && this.execute(t)
                    }, changeTo: function (t) {
                        $(t.target).is(this.$el) && (console.log("element changeTo"), 5 == this.model.type && this.execute(t))
                    }, c_active: function (t) {
                        $(t.target).is(this.$el) && 33 == this.model.type && this.execute(t)
                    }, c_deactive: function (t) {
                        $(t.target).is(this.$el) && 34 == this.model.type && this.execute(t)
                    }, button_active: function (t) {
                        35 == this.model.type && this.execute(t)
                    }
                }, coolsite_play.controller.animation.animation = {}, coolsite_play.controller.element.element = {
                    scrollUpIn: function (t) {
                        console.log("slider scroll in")
                    }
                }, coolsite_play.controller.element.slider = $.extend(!0, {}, coolsite_play.controller.element.element, {
                    scrollUpIn: function (t) {
                        $(t.target).is(this.$el) && (console.log("slider scroll in"), this.model.start(), this.model.onChangeTo(null, 0))
                    }, switchTo: function (t, e) {
                        $(t.target).is(this.$el) && (console.log(e), this.model.switchSlide(e))
                    }
                }), coolsite_play.controller.timeline.timeline = {
                    scrollIn: function (t) {
                        $(t.target).is(this.$el) && this.model.play()
                    }, recover: function (t) {
                        $(t.target).is(this.$el) && this.model.recoverStyle()
                    }, changeTo: function (t) {
                        $(t.target).is(this.$el) && this.model.play()
                    }, c_active: function (t) {
                        $(t.target).is(this.$el)
                    }, c_deactive: function (t) {
                        $(t.target).is(this.$el)
                    }, t_start: function (t) {
                        $(t.target).is(this.$el) && ("locked" == this.$el.attr("data-c_tl_locked") ? coolsite_play.isSectionLock = this.model.id : coolsite_play.isSectionLock = !1)
                    }, t_end: function (t) {
                        $(t.target).is(this.$el) && coolsite_play.isSectionLock == this.model.id && (coolsite_play.isSectionLock = !1)
                    }
                }
            }
        };
        n = [], void 0 !== (o = function () {
            return window._cs || (window._cs = {}), window._cs.mvc = i, window._cs.mvc
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (t, e, n) {
    "use strict";
    var o, s;
    !function () {
        var n = {
            init: function () {
                coolsite_play.events.dialog = {
                    init: function () {
                        $(document).find(".c-modal").on("click", ".dialog-close", coolsite_play.events.dialog.handleDialogClose)
                    }, handleDialogClose: function () {
                        var t = $(this).closest(".c-modal");
                        return t.removeClass("c-dialog-open"), $("body").removeClass("modal-open"), $("html").removeClass("c-modal-patch"), window.setTimeout(function () {
                            t.hide()
                        }, 300), !1
                    }, stop: function () {
                        $(document).find(".c-modal").off("click", ".dialog-close", coolsite_play.events.dialog.handleDialogClose)
                    }
                }, coolsite_play.events.form = {
                    init: function () {
                        $("form textarea").each(function () {
                            "    " == $(this).html() && $(this).html("")
                        }), $("[data-c_form]").each(function () {
                            $(this).bind("submit", coolsite_play.events.form.bind)
                        })
                    }, bind: function () {
                        var t = $(this), e = $(this).attr("data-action");
                        if (!e)return !1;
                        $.ajax({
                            url: e,
                            type: "POST",
                            dataType: "JSON",
                            data: $(this).serialize(),
                            beforeSend: function (t) {
                                t.setRequestHeader("X-CSRFToken", coolsite_play.readCookie("csrftoken"))
                            },
                            traditional: !0,
                            success: function (e) {
                                if (t.find(".c-error").removeClass("c-error"), 200 == e.code) t.addClass("c-success"), t.removeClass("c-error"), coolsite_play.events.form.handleRedirect(t); else {
                                    t.addClass("c-error");
                                    var i = e.msg;
                                    _.each(i, function (e, i) {
                                        var n = t.find("[name=" + i + "]");
                                        n.is("input[type=radio]") || n.is("input[type=checkbox]") ? n.parent().addClass("c-error") : t.find("[name=" + i + "]").addClass("c-error")
                                    })
                                }
                            },
                            error: function () {
                            },
                            timeout: 1e4
                        });
                        return !1
                    }, stop: function () {
                        $("[data-c_form]").each(function () {
                            $(this).unbind("submit", coolsite_play.events.form.bind)
                        })
                    }, handleRedirect: function (t) {
                        var e, i = t.attr("data-url"), n = t.attr("data-page"), o = t.attr("data-target");
                        if (i) e = i, 0 == e.indexOf("#") || -1 != e.indexOf("://") || (e = "http://" + e); else {
                            if (!n)return !1;
                            e = n, "undefined" != typeof portal_url && (e = portal_url + e)
                        }
                        if (o) {
                            if (coolsite_play.isPreview)return coolsite_editor.ui.message.show("warning", coolsite_editor.WARN[100]), !1;
                            window.open(e)
                        } else {
                            if (coolsite_play.isPreview)return coolsite_editor.ui.message.show("warning", coolsite_editor.WARN[100]), !1;
                            window.location.href = e
                        }
                    }
                }, coolsite_play.events.html = {
                    init: function () {
                        _g.device.msie() && $(document).find("iframe.c-iframe").each(function () {
                            if ($(this).attr("srcdoc")) {
                                var t = $(this).attr("srcdoc");
                                this.contentWindow.document.write(t)
                            }
                        })
                    }
                }, coolsite_play.events.mousewheel = {
                    init: function () {
                        $("body").find(".c-section-switch").each(function () {
                            $(this).on("mousewheel", coolsite_play.events.mousewheel.handlemousewheel)
                        })
                    }, stop: function () {
                        $("body").find(".c-section-switch").each(function () {
                            $(this).off("mousewheel", coolsite_play.events.mousewheel.handlemousewheel)
                        })
                    }, handlemousewheel: function (t) {
                        var e = t.currentTarget, i = null;
                        (t.deltaY < -10 || coolsite_play.isWindows && t.deltaY < 0) && (i = 1), (t.deltaY > 10 || coolsite_play.isWindows && t.deltaY > 0) && (i = 0), null != i && coolsite_play.events.scroll.doSectionSwitch(e, i), t.preventDefault()
                    }
                }, coolsite_play.events.scroll = {
                    init: function () {
                        coolsite_play.events.scroll.refresh(), $("body").trigger("scrollIn"), $("body").trigger("scrollUpIn");
                        var t = $(window).scrollTop(), e = coolsite_play.events.scroll.getScrollHeight(), n = e - $(window).height(), o = coolsite_play.sectionItems;
                        if ($("body").find(".c-section,.c-slider").each(function () {
                                $(this).offset().top < t + $(window).height() && (console.log(this), $(this).addClass("c-scrollIn"), $(this).trigger("scrollIn"), $(this).trigger("scrollUpIn"))
                            }), o.length)if (t >= n) coolsite_play.events.scroll.activate(o.length - 1); else if (t <= o[0].top) coolsite_play.events.scroll.activate(0); else for (i = 0; i < o.length; i++)t >= o[i].top && (!o[i + 1] || t <= o[i + 1].top) && coolsite_play.events.scroll.activate(i);
                        coolsite_play.events.scroll.lastst = t, coolsite_play.scroll_offset = 0, $(window).bind("scroll", coolsite_play.events.scroll.handle), $(window).bind("resize", coolsite_play.events.scroll.resizehandle)
                    }, refresh: function () {
                        coolsite_play.scrollItems = [], coolsite_play.sectionItems = [], $("body").find(".c-section,.c-slider").map(function () {
                            var t = $(this).offset().top, e = $(this).offset().top + $(this).height();
                            return $(this).hasClass("c-section") || $(this).hasClass("c-slider"), {
                                top: t,
                                bottom: e,
                                target: this
                            }
                        }).sort(function (t, e) {
                            return t.top - e.top
                        }).each(function () {
                            coolsite_play.scrollItems.push(this), $(this.target).hasClass("c-section") && "scroll" == $(this.target).attr("data-c_spy") && coolsite_play.sectionItems.push(this)
                        }), coolsite_play.scrollHeight = coolsite_play.events.scroll.getScrollHeight(), console.log(coolsite_play.scrollItems)
                    }, getScrollHeight: function () {
                        return Math.max($("body")[0].scrollHeight, document.documentElement.scrollHeight)
                    }, handle: function (t) {
                        var e, i, n = $(this).scrollTop(), o = coolsite_play.events.scroll.getScrollHeight(), s = o - $(window).height(), r = coolsite_play.scrollItems, a = coolsite_play.sectionItems;
                        if (coolsite_play.scrollHeight != o && coolsite_play.events.scroll.refresh(), e = n > coolsite_play.events.scroll.lastst ? 1 : 0, coolsite_play.events.scroll.lastst = n, $("body").trigger("c_scroll"), $("body").trigger(1 == e ? "c_scrollUp" : "c_scrollDown"), a.length)if (n >= s) coolsite_play.events.scroll.activate(a.length - 1); else if (n <= a[0].top) coolsite_play.events.scroll.activate(0); else for (i = 0; i < a.length; i++)e ? n >= a[i].top && (!a[i + 1] || n <= a[i + 1].top) && coolsite_play.events.scroll.activate(i) : n <= a[i].top && (!a[i - 1] || n >= a[i - 1].top) && coolsite_play.events.scroll.activate(i - 1);
                        for (i = 0; i < r.length; i++) {
                            var l = r[i].target, c = r[i].top, u = r[i].bottom;
                            e ? c < n + $(window).height() && u - n > 0 ? $(l).hasClass("c-scrollIn") ? ($(l).trigger("c_scroll"), $(l).trigger("c_scrollUp")) : ($(l).addClass("c-scrollIn"), $(l).trigger("scrollIn"), $(l).trigger("scrollUpIn"), console.log("upIn")) : $(l).hasClass("c-scrollIn") && ($(l).removeClass("c-scrollIn"), $(l).trigger("scrollOut"), $(l).trigger("scrollUpOut"), $(l).trigger("recover"), console.log("upOut")) : u - n > 0 && c < n + $(window).height() ? $(l).hasClass("c-scrollIn") ? ($(l).trigger("c_scroll"), $(l).trigger("c_scrollDown")) : ($(l).addClass("c-scrollIn"), $(l).trigger("scrollIn"), $(l).trigger("scrollDownIn")) : $(l).hasClass("c-scrollIn") && ($(l).removeClass("c-scrollIn"), $(l).trigger("scrollOut"), $(l).trigger("scrollDownOut"), $(l).trigger("recover"))
                        }
                    }, activate: function (t) {
                        var e = coolsite_play.sectionItems;
                        if (null == coolsite_play.currentActiveIndex || coolsite_play.currentActiveIndex != t) {
                            if (null != coolsite_play.currentActiveIndex) {
                                $(e[coolsite_play.currentActiveIndex].target).trigger("c_deactive");
                                var i = e[coolsite_play.currentActiveIndex].target.id;
                                if (i) {
                                    var n = $("[href=#" + i + "]");
                                    n.length && n.each(function () {
                                        "scroll" == $(this).attr("data-c_spy") && $(this).parent("li").length && $(this).parent("li").removeClass("active")
                                    })
                                }
                            }
                            console.log(coolsite_play.currentActiveIndex + ":deactive"), $(e[t].target).trigger("c_active"), coolsite_play.currentActiveIndex = t, console.log(t + ":active");
                            var i = e[t].target.id;
                            if (i) {
                                var n = $("[href=#" + i + "]");
                                n.length && n.each(function () {
                                    "scroll" == $(this).attr("data-c_spy") && $(this).parent("li").length && $(this).parent("li").addClass("active")
                                })
                            }
                        }
                    }, resizehandle: function (t) {
                        coolsite_play.events.scroll.refresh()
                    }, bindHashScroll: function () {
                        $("a[href^='#'][data-toggle!='tab']").bind("click", coolsite_play.events.scroll.doHashScroll)
                    }, unBindHashScroll: function () {
                        $("a[href^='#'][data-toggle!='tab']").unbind("click", coolsite_play.events.scroll.doHashScroll)
                    }, doHashScroll: function (t, e) {
                        if (e || (e = $(this).attr("href")), !t || !$(t.target).hasClass("c-search-box-btn"))return $(e).length && $("html, body").animate({scrollTop: $(e).offset().top}, 800), !1
                    }, doScrollByElement: function (t) {
                        coolsite_play.isSectionSwitching || coolsite_play.isSectionLock || $(t).length && $("html, body").animate({scrollTop: $(t).offset().top}, 800)
                    }, doSectionSwitch: function (t, e) {
                        var i = $(t).prev(".c-section-switch").length ? $(t).prev(".c-section-switch") : $(t).prev(".c-section") ? $(t).prev(".c-section") : null, n = $(t).next(".c-section-switch").length ? $(t).next(".c-section-switch") : $(t).next(".c-section") ? $(t).next(".c-section") : null;
                        e && (coolsite_play.isSectionSwitching || n && (coolsite_play.events.scroll.doScrollByElement(n), coolsite_play.isSectionSwitching = t, window.setTimeout(function () {
                            coolsite_play.isSectionSwitching = null
                        }, 1e3))), e || coolsite_play.isSectionSwitching || i && (coolsite_play.events.scroll.doScrollByElement(i), coolsite_play.isSectionSwitching = t, window.setTimeout(function () {
                            coolsite_play.isSectionSwitching = null
                        }, 1e3))
                    }, stop: function () {
                        $(window).unbind("scroll", coolsite_play.events.scroll.handle), $(window).unbind("resize", coolsite_play.events.scroll.resizehandle), coolsite_play.currentActiveIndex = null
                    }
                }, coolsite_play.events.touch = {
                    init: function () {
                        $("body").find(".c-section-switch").each(function () {
                            $(this).hammer().on("dragup", function (t) {
                                return console.log("dragup"), deltaY = t.gesture.deltaY, coolsite_play.events.touch.handletouch(t, 1), t.gesture.preventDefault(), !1
                            }), $(this).hammer().on("dragdown", function (t) {
                                return console.log("dragdown"), deltaY = t.gesture.deltaY, coolsite_play.events.touch.handletouch(t, 0), t.gesture.preventDefault(), !1
                            })
                        });
                        var t = !1;
                        $("body").hammer().on("drag", function (e) {
                            if (!t) {
                                var i = _.filter(_g.html5media.medias, function (t) {
                                    return "audio" == t.type && t.autoplay
                                });
                                if (i.length)try {
                                    i[0].media.play(), t = !0
                                } catch (e) {
                                    t = !1
                                } else t = !0
                            }
                        })
                    }, handletouch: function (t, e) {
                        var i = t.currentTarget;
                        coolsite_play.events.scroll.doSectionSwitch(i, e)
                    }
                }
            }
        };
        o = [], void 0 !== (s = function () {
            return window._cs || (window._cs = {}), window._cs.event = n, window._cs.event
        }.apply(e, o)) && (t.exports = s)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var i = {
            init: function () {
                _g.timeline = {animation: {}};
                var t = {
                    param: function (t, e) {
                        var i = {repeat: e.t.rp, ease: coolsite_play.easeType[e.t.es]};
                        return i.onStartParams = ["{self}", e, t], i.onStart = this.onStart, i.onComplete = this.onComplete, i.onCompleteParams = ["{self}", e, t], i
                    }, fromparam: function (t, e) {
                        return {}
                    }, inparam: function (t, e) {
                        var i = {};
                        return i.onStart = this.onStart, i.onStartParams = ["{self}", e, t], i.onComplete = this.stop, i.onCompleteParams = ["{self}", e, t], i.ease = coolsite_play.easeType[e.t.es], i.repeat = e.t.rp, i.immediateRender = !1, i
                    }, toparam: function (t, e) {
                        var i = {};
                        return i.onComplete = this.stop, i.onCompleteParams = ["{self}", e, t], i.ease = coolsite_play.easeType[e.t.es], i.repeat = e.t.rp, i.immediateRender = !1, i.onStartParams = ["{self}", e, t], i.onStart = this.onStart, i
                    }, onStart: function (e, i, n) {
                        switch (console.log(n, i), e || (e = {}), i.type) {
                            case 1:
                            case 3:
                            case 5:
                                t.show(e.target || n), t.setOriginCenter(n);
                                break;
                            case 6:
                            case 9:
                                t.setOriginCenter(n);
                                break;
                            case 10:
                                t.show(e.target || n), t.setOriginCenter(n)
                        }
                    }, onComplete: function (e, i, n) {
                        switch (i.type) {
                            case 5:
                                t.unsetOriginCenter(n);
                                break;
                            case 2:
                            case 4:
                            case 6:
                                t.unsetOriginCenter(n), t.hide(n);
                                break;
                            case 7:
                                break;
                            case 9:
                            case 10:
                                t.unsetOriginCenter(n)
                        }
                        console.log(n, i)
                    }, show: function (t, e) {
                        $(t).removeClass("c-initHide"), $(t).removeClass("cf-initHide"), $(t).show()
                    }, hide: function (t, e) {
                        $(t).addClass("c-initHide"), $(t).addClass("cf-initHide")
                    }, setOriginCenter: function (t) {
                        $(t).css("transform-origin", "50% 50%")
                    }, unsetOriginCenter: function (t) {
                    }
                };
                _g.timeline.animation[3] = function (e, i) {
                    var n = t.inparam(e, i), o = t.toparam(e, i);
                    if (n.css = {opacity: 0}, o.css = {opacity: 1, force3D: !1}, "stage" == i.aniType) {
                        var s = TweenMax.staggerFrom(e, i.t.du, n, i.stagger);
                        return s
                    }
                    var s = TweenMax.fromTo(e, i.t.du, n, o);
                    return s
                }, _g.timeline.animation[4] = function (e, i) {
                    var n = t.param(e, i);
                    if (n.css = {opacity: 0, force3D: !1}, "stage" == i.aniType) {
                        var o = TweenMax.staggerTo(e, i.t.du, n, i.stagger);
                        return o
                    }
                    var o = TweenMax.to(e, i.t.du, n);
                    return o
                }, _g.timeline.animation[1] = function (e, i) {
                    var n = i.d.di, o = i.d.dt, s = i.d.dl, r = t.inparam(e, i), a = t.toparam(e, i), l = $(window).width(), c = $(window).height();
                    r.css = {}, a.css = {force3D: !1};
                    $(e).hasClass("c-initHide"), $(e).addClass("cf-invisible c-invisible").removeClass("c-initHide").removeClass("cf-initHide");
                    var u = e.offset();
                    switch (n) {
                        case 0:
                            r.css.y = o ? -s : -(u.top + e.height() - $(window).scrollTop()), a.css.y = 0;
                            break;
                        case 3:
                            r.css.x = o ? s : l - u.left, a.css.x = 0;
                            break;
                        case 2:
                            r.css.y = o ? s : c - (u.top - $(window).scrollTop()), a.css.y = 0;
                            break;
                        case 1:
                            r.css.x = o ? -s : -(u.left + e.width()), a.css.x = 0
                    }
                    if (o && (r.css.opacity = 0, a.css.opacity = 1), $(e).addClass("c-initHide"), $(e).removeClass("cf-invisible c-invisible"), "stage" == i.aniType) {
                        r.css.opacity = 0;
                        var h = TweenMax.staggerFrom(e, i.t.du, r, i.stagger)
                    } else var h = TweenMax.fromTo(e, i.t.du, r, a);
                    return h
                }, _g.timeline.animation[2] = function (e, i) {
                    var n = i.d.di, o = i.d.dt, s = i.d.dl, r = t.param(e, i), a = e.offset(), l = $(window).width(), c = $(window).height();
                    switch (r.css = {force3D: !1}, n) {
                        case 0:
                            r.css.y = o ? -s : -(a.top + e.height() - $(window).scrollTop());
                            break;
                        case 3:
                            r.css.x = o ? s : l - a.left;
                            break;
                        case 2:
                            r.css.y = o ? s : c - (a.top - $(window).scrollTop());
                            break;
                        case 1:
                            r.css.x = o ? -s : -(a.left + e.width())
                    }
                    if (o && (r.css.opacity = 0), "stage" == i.aniType)var u = TweenMax.staggerTo(e, i.t.du, r, i.stagger); else var u = TweenMax.to(e, i.t.du, r);
                    return u
                }, _g.timeline.animation[5] = function (e, i) {
                    var n = t.inparam(e, i), o = t.toparam(e, i);
                    if (n.css = {scale: 0}, o.css = {
                            scale: 1,
                            force3D: !1
                        }, "stage" == i.aniType)var s = TweenMax.staggerFrom(e, i.t.du, n, i.stagger); else var s = TweenMax.fromTo(e, i.t.du, n, o);
                    return s
                }, _g.timeline.animation[6] = function (e, i) {
                    var n = t.fromparam(e, i), o = t.toparam(e, i);
                    if (n.css = {scale: 1}, o.css = {
                            scale: 0,
                            force3D: "auto"
                        }, "stage" == i.aniType)var s = TweenMax.staggerTo(e, i.t.du, o, i.stagger); else var s = TweenMax.fromTo(e, i.t.du, n, o);
                    return s
                }, _g.timeline.animation[8] = function (e, i) {
                    var n = t.param(e, i), o = _.isNumber(i.d.op) ? Number(i.d.op) : 100;
                    if (n.css = {
                            opacity: o / 100,
                            force3D: !1
                        }, "stage" == i.aniType)var s = TweenMax.staggerTo(e, i.t.du, n, i.stagger); else var s = TweenMax.to(e, i.t.du, n);
                    return s
                }, _g.timeline.animation[7] = function (e, i) {
                    var n = t.param(e, i), o = _.isNumber(i.d.deg) ? Number(i.d.deg) : 0, s = i.d.ax || 0, r = "_cw", a = "+";
                    o < 0 && (r = "_ccw"), o < 0 && (a = "-");
                    var l = {force3D: !1};
                    if (0 == s && (l.rotation = a + "=" + Math.abs(o) + r), 1 == s && (l.rotationX = a + "=" + Math.abs(o) + r), 2 == s && (l.rotationY = a + "=" + Math.abs(o) + r), n.css = l, _g.device.android() && TweenLite.set(e, {transformPerspective: 2e3}), "stage" == i.aniType)var c = TweenMax.staggerTo(e, i.t.du, n, i.stagger); else var c = TweenMax.to(e, i.t.du, n);
                    return c
                }, _g.timeline.animation[9] = function (e, i) {
                    var n = t.param(e, i), o = _.isNumber(i.d.sc) ? Number(i.d.sc) : 1;
                    if (n.css = {
                            scale: o,
                            force3D: !1
                        }, "stage" == i.aniType)var s = TweenMax.staggerTo(e, i.t.du, n, i.stagger); else var s = TweenMax.to(e, i.t.du, n);
                    return s
                }, _g.timeline.animation[10] = function (e, i) {
                    var n = t.inparam(e, i), o = t.toparam(e, i), s = _.isNumber(i.d.op) ? Number(i.d.op) : 50, r = _.isNumber(i.d.sc) ? Number(i.d.sc) : 2;
                    if (n.css = {opacity: s / 100, scale: r}, o.css = {
                            opacity: 1,
                            scale: 1,
                            force3D: !1
                        }, "stage" == i.aniType)var a = TweenMax.staggerFrom(e, i.t.du, n, i.stagger); else var a = TweenMax.fromTo(e, i.t.du, n, o);
                    return a
                }, _g.timeline.animation[11] = function (e, i) {
                    var n = e.find("rect, circle, ellipse, polyline, path, line, polygon").not("[data-attr=morphCloneElement]"), o = t.fromparam(e, i), s = t.toparam(e, i);
                    return o.drawSVG = i.d.startx + "% " + i.d.starty + "%", s.drawSVG = i.d.endx + "% " + i.d.endy + "%", TweenMax.fromTo(n, i.t.du, o, s)
                }, _g.timeline.animation[12] = function (e, i) {
                    var n = {};
                    n.paths = [], n.otherPaths = [];
                    var o = 0;
                    if (_.each(i.d.pathIndex, function (t, e) {
                            null != t.selected && o++
                        }), o <= 1)return null;
                    if (_.each(i.d.pathIndex, function (t, e) {
                            null != t.selected ? n.paths.push({
                                shapeIndex: t.selected,
                                id: t.id
                            }) : n.otherPaths.push({id: t.id})
                        }), n.paths.length >= 2) {
                        var s, r = function (t) {
                            return e.find("path#" + t.id)
                        }, a = function () {
                            $(p).attr("d", $(p).attr("data-original")), $(p).css($(p).data("initStyle")), $(p).data("show", !1)
                        }, l = function (t) {
                            return {
                                fill: t.css("fill") || "white",
                                "fill-opacity": parseFloat(t.css("fill-opacity")) >= 0 ? parseFloat(t.css("fill-opacity")) : 1,
                                stroke: t.css("stroke") || "black",
                                "stroke-opacity": parseFloat(t.css("stroke-opacity")) >= 0 ? parseFloat(t.css("stroke-opacity")) : 1,
                                "stroke-width": parseFloat(t.css("stroke-width")) >= 0 ? parseFloat(t.css("stroke-width")) : 1
                            }
                        }, c = function () {
                            $(p).show().css({
                                "stroke-dasharray": "none",
                                "stroke-dashoffset": "none"
                            }), $(p).data("show", !0);
                            for (var t = 1; t < n.paths.length; t++)r(n.paths[t]).hide();
                            for (var t = 0; t < n.otherPaths.length; t++) {
                                var e = r(n.otherPaths[t]);
                                e.data("show") || e.hide()
                            }
                        }, u = function () {
                            c(), a()
                        }, h = function () {
                            $(p).data("show", !1)
                        }, d = i.t.du / (n.paths.length - 1), f = t.toparam(e, i), p = r(n.paths[0])[0];
                        $(p).data("initStyle") || $(p).data("initStyle", l($(p)));
                        for (var m = new TimelineMax({
                            repeat: i.t.rp,
                            onStart: u,
                            onComplete: h
                        }), g = 0, v = 1; v < n.paths.length; v++)s = $.extend(!0, {
                            morphSVG: {
                                shape: function (t) {
                                    return e.find("path#clone_" + t.id)
                                }(n.paths[v])[0], shapeIndex: n.paths[v - 1].shapeIndex
                            }
                        }, f), s = $.extend(!0, l(r(n.paths[v])), s), m.add(TweenMax.to(p, d, s), g), g += d;
                        return m
                    }
                }, _g.timeline.create = function (t) {
                    var e = {
                        paused: !0, onStart: function (e) {
                            t.model && t.model.iview && t.model.iview.$el.trigger("t_start")
                        }, onComplete: function (e) {
                            t.model && t.model.iview && t.model.iview.$el.trigger("t_end")
                        }, repeat: t.args ? t.args.rp : 0
                    }, i = 0, n = new TimelineMax(e);
                    n.addLabel("Start");
                    var o = t.animations;
                    return _.each(o, function (t, e) {
                        var o = t.toJSON().data, s = o.t.de, r = o.t.st;
                        o.t.rp;
                        if (i += s, 2 == r)if (0 != e) {
                            var a = n.getLabelTime(e - 1 + "_start");
                            n.addLabel(e + "_start", a + s), i = a + s
                        } else n.addLabel(e + "_start", i); else n.addLabel(e + "_start", i);
                        o.d || (o.d = {});
                        var l = _g.timeline.animation[o.type](t.iview.$el, o);
                        n.add(l, i), i += o.t.du, t.siblingIds && _.each(t.siblingIds, function (t) {
                            var o = coolsite_play.animationlist.get(t);
                            if (o) {
                                var s = o.toJSON().data, r = s.t.de, a = s.t.st;
                                s.t.rp;
                                if (i += r, 2 == a)if (0 != e) {
                                    var l = n.getLabelTime(e - 1 + "_start");
                                    n.addLabel(e + "_start", l + r), i = l + r
                                } else n.addLabel(e + "_start", i); else n.addLabel(e + "_start", i);
                                s.d || (s.d = {});
                                var c = _g.timeline.animation[s.type](o.iview.$el, s);
                                n.add(c, i), i += s.t.du
                            }
                        })
                    }), n
                }
            }
        };
        n = [], void 0 !== (o = function () {
            return window._cs || (window._cs = {}), window._cs.sdk = i, window._cs.sdk
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var i = {
            ani: function () {
                coolsite_play.util.canvasCirAni = {
                    init: function (t) {
                        var e = coolsite_play.doc.find(".c-section"), i = [], n = coolsite_play.doc.find("canvas");
                        e = _.filter(e, function (t) {
                            return 0 != $(t).find("canvas").length
                        });
                        for (var o = 0; o < e.length; o++) {
                            var s = $(e[o]).find("canvas");
                            if (s.length) {
                                if (i = _.uniq(i.concat(s)), t) {
                                    for (var r = 0; r < s.length; r++)coolsite_play.util.canvasCirAni.generate($(s[r]), "", t);
                                    return
                                }
                                $(e[o]).on("scrollIn", s, function (e) {
                                    e.preventDefault();
                                    for (var i = 0; i < s.length; i++)coolsite_play.util.canvasCirAni.generate($(s[i]), "", t);
                                    return !1
                                })
                            }
                        }
                        n = _.difference(n, i), _.each(n, function (e) {
                            coolsite_play.util.canvasCirAni.generate($(e), "", t)
                        })
                    }, generate: function (t, e, i) {
                        function n() {
                            var t = Math.min(1, (Date.now() - p) / d);
                            o(t), t >= 1 ? g(v) : m(n)
                        }

                        function o(t) {
                            r.clearRect(0, 0, a, l), r.strokeStyle = s.backgroundColor, r.lineWidth = c, r.lineCap = "round", r.beginPath(), r.arc(f.x, f.y, u, 0, 2 * Math.PI, !1), r.stroke(), r.closePath(), r.strokeStyle = s.borderColor, r.beginPath(), r.arc(f.x, f.y, u, -.5 * Math.PI, (t * h * 2 - .5) * Math.PI, !1), r.stroke(), r.closePath(), s.showProgress && (r.fillStyle = s.fontColor, r.font = s.fontWeight + " " + s.fontSize + "px Helvetica", r.textBaseline = "middle", r.textAlign = "center", r.fillText(parseInt(s.progress * t), f.x, f.y, 2 * u))
                        }

                        var s = t.attr("part_data");
                        if (s) {
                            s = JSON.parse(s);
                            var r = t[0].getContext("2d"), a = t.width(), l = t.height(), c = parseFloat(s.borderWidth), u = Math.abs(Math.min(parseFloat(a - c) / 2, parseFloat(l - c) / 2)), h = parseFloat(s.progress / s.max), d = parseInt(s.duration), f = {
                                x: parseFloat(a / 2),
                                y: parseFloat(l / 2)
                            };
                            if (i) o(1); else if (s.isWait && !e) r.strokeStyle = s.backgroundColor, r.lineWidth = c, r.lineCap = "round", r.clearRect(0, 0, a, l), r.beginPath(), r.arc(f.x, f.y, u, 0, 2 * Math.PI, !1), r.stroke(), r.closePath(); else var p = Date.now(), m = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame, g = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.oCancelAnimationFrame, v = m(n)
                        }
                    }, stop: function () {
                        coolsite_play.util.canvasCirAni.init(!0)
                    }
                }
            }
        };
        n = [], void 0 !== (o = function () {
            return window._cs || (window._cs = {}), window._cs.canvascircle = i, window._cs.canvascircle
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var i = {
            actionexcutes: [], init: function () {
                if (coolsite360.PlayerPlugins.length)for (var t = 0; t < coolsite360.PlayerPlugins.length; t++) {
                    var e = coolsite360.PlayerPlugins[t];
                    "actionexecute" == e.type ? coolsite_play.util.PluginManage.actionexcutes[e.config.type] = e : "wx" == e.type ? _cs.wx_register(e) : e.onInit && e.onInit()
                }
            }
        }, s = {
            init: function () {
                coolsite_play.util.PluginManage = i, coolsite_play.util.action = {
                    generate: function () {
                        coolsite_play.doc.find("[data-c_act_id]").each(function () {
                            for (var t = this, e = $(this).attr("data-c_act_id"), i = String(e).split("|"), n = 0; n < i.length; n++)coolsite_play.actionlist.each(function (e) {
                                if (e.id == i[n]) {
                                    e.getType();
                                    if (e.hasEl) {
                                        var o = $.extend(!0, {}, e.toJSON());
                                        delete o.id, coolsite_play.actionlist.add(o);
                                        var s = coolsite_play.actionlist.last();
                                        s.iview.setElement(t), s.hasEl = !0, e.siblingIds || (e.isSibling = !0, e.siblingIndex = 0, e.siblingIds = []), 0 == e.getType() && s.iview.$el.addClass("c-action-click"), e.siblingIds.push(s.id), s.isSibling = !0, s.siblingIndex = e.siblingIds.length
                                    } else e.iview.setElement(t), 0 == e.getType() && e.iview.$el.addClass("c-action-click"), e.hasEl = !0
                                }
                            })
                        })
                    }
                }, coolsite_play.util.animation = {
                    generate: function () {
                        coolsite_play.doc.find("[data-c_ani_id]").each(function () {
                            for (var t = this, e = $(this).attr("data-c_ani_id"), i = String(e).split("|"), n = 0; n < i.length; n++)coolsite_play.animationlist.each(function (e) {
                                if (e.id == i[n])if (e.hasEl) {
                                    var o = $.extend(!0, {}, e.toJSON());
                                    delete o.id, coolsite_play.animationlist.add(o);
                                    var s = coolsite_play.animationlist.last();
                                    s.iview.setElement(t), s.iview.stashStyle(), s.hasEl = !0, e.siblingIds || (e.siblingIds = []), e.siblingIds.push(s.id)
                                } else e.iview.setElement(t), e.iview.stashStyle(), e.hasEl = !0
                            })
                        })
                    }
                }, coolsite_play.util.timeline = {
                    generate: function () {
                        coolsite_play.doc.find("[data-c_tl_id]").each(function () {
                            for (var t = $(this).attr("data-c_tl_id"), e = this, i = String(t).split("|"), n = 0; n < i.length; n++)coolsite_play.timelinelist.each(function (t) {
                                t.id == i[n] && t.iview.setElement(e)
                            })
                        })
                    }, createTimeline: function (t) {
                        return _g.timeline.create(t)
                    }, stopAll: function () {
                        coolsite_play.timelinelist.each(function (t) {
                            t.stop()
                        })
                    }
                }, coolsite_play.util.video = {
                    init: function () {
                        _g.html5media.collect(document, "data-c_e_id")
                    }, stopAll: function () {
                        _g.html5media.stopAll()
                    }
                }, coolsite_play.slider = function (t, e) {
                    var i = new _g.transition({
                        containment: t,
                        disableControlled: !(!coolsite_play.isPreview && _g.device.mobile()),
                        duration: 500,
                        repeat: !0,
                        control: !(coolsite_play.isPreview || !_g.device.mobile()),
                        interval: 1e3 * Number(e.ti),
                        type: Number(e.type),
                        autoplayAxis: "x",
                        onStart: function (e, n) {
                            i.setNavDots(t, n)
                        },
                        onEnd: function (e, n) {
                            i.currentIndex = n, i.refreshSlideClass(t, n), "undefined" != typeof coolsite_editor && coolsite_editor.currentSlider && coolsite_editor.currentSlider.transitionEnd && coolsite_editor.currentSlider.transitionEnd(e, n);
                            var o = $(t).data("sliderId");
                            if (o) {
                                coolsite_play.sliderlist.get(o).onChangeTo(e, n)
                            }
                        }
                    });
                    return i.clearSlideClass = function (t) {
                        $(t).children().removeClass("c-transition-left").removeClass("c-transition-right").removeClass("c-transition-top").removeClass("c-transition-bottom")
                    }, i.refreshSlideClass = function (t, e, n) {
                        n || (n = -1), i.clearSlideClass(t);
                        var o = $(t).children().length;
                        if (-1 == n)var s = "c-transition-right", r = "c-transition-left"; else var s = "c-transition-left", r = "c-transition-right";
                        $(t).children().each(function () {
                            $(this).index() == e ? ($(this).addClass("c-transition-current"), $(this).prev().length ? $(this).prev().addClass(r) : o > 1 && ($(t).last().is(this) || $(t).last().addClass(r)), $(this).next().length ? $(this).next().addClass(s) : o > 1 && ($(t).first().is(this) || $(t).first().addClass(s))) : $(this).removeClass("c-transition-current")
                        })
                    }, i.prepareNextClass = function (t, e, n) {
                        n || (n = -1), i.clearSlideClass(t);
                        $(t).children().length;
                        if (-1 == n)var o = "c-transition-right"; else var o = "c-transition-left";
                        $(t).children().each(function () {
                            $(this).index() == e && $(this).addClass(o)
                        })
                    }, i.setNavDots = function (t, e) {
                        var i = $(t).parent().children(".c-slider-nav").children(".c-slider-nav-dot");
                        i.removeClass("c-active"), i.eq(e).addClass("c-active")
                    }, i
                }, coolsite_play.readCookie = function (t) {
                    for (var e = t + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
                        for (var o = i[n]; " " == o.charAt(0);)o = o.substring(1, o.length);
                        if (0 == o.indexOf(e))return o.substring(e.length, o.length)
                    }
                    return null
                }, coolsite_play.play = {
                    start: function () {
                        if (coolsite_play.isPlay = !0, "undefined" == typeof c_data)return !1;
                        c_data.timelines = c_data.timelines || [], c_data.actions = c_data.actions || [], c_data.animations = c_data.animations || [], coolsite_play.doc = $("html"), c_data.timelines.length && coolsite_play.timelinelist.reset(c_data.timelines, {silent: !0}), c_data.animations.length && coolsite_play.animationlist.reset(c_data.animations, {silent: !0}), c_data.actions.length && coolsite_play.actionlist.reset(c_data.actions, {silent: !0}), $("body").trigger("c_start"), coolsite_play.util.PluginManage.init(), coolsite_play.sliderlist.generate(), coolsite_play.util.timeline.generate(), coolsite_play.util.cssanimation && coolsite_play.util.cssanimation.generate(), coolsite_play.util.staggeranimation && coolsite_play.util.staggeranimation.generate(), coolsite_play.util.infinitescroll && coolsite_play.util.infinitescroll.generate(), coolsite_play.util.animation.generate(), coolsite_play.util.action.generate(), coolsite_play.util.canvasCirAni.init(), coolsite_play.events.scroll.init(), _g.device.mobile() ? coolsite_play.events.touch.init() : coolsite_play.events.mousewheel.init(), coolsite_play.events.scroll.bindHashScroll(), coolsite_play.events.dialog.init(), coolsite_play.events.html.init(), coolsite_play.util.video.init(), coolsite_play.events.form.init(), _g.device.android() && $("body,.c-slider-mask").css({"touch-action": "initial"})
                    }
                }, coolsite_play.isWindows = _g.device.windows()
            }
        };
        n = [], void 0 !== (o = function () {
            return window._cs || (window._cs = {}), window._cs.util = s, window._cs.util
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var i = {
            init: function () {
                coolsite_play.util.cssanimation = {
                    generate: function () {
                        var t = [], e = [], i = coolsite_play.util.cssanimation.findTimeline(t, e);
                        t = i.timeline, e = i.inBody;
                        for (var n = 0; n < t.length; n++) {
                            var o = $(t[n]);
                            "BODY" == o[0].tagName ? coolsite_play.util.cssanimation.addCssAni(e) : o.on("scrollIn", function (t) {
                                if ($(t.target).hasClass("c-slider") || $(t.target).hasClass("c-section")) {
                                    var e = $(this);
                                    if (e.hasClass("c-slider")) {
                                        var i = e.find(".c-transition-current [data-c_cssani]");
                                        coolsite_play.util.cssanimation.addCssAni(i), e.find(".c-slide").each(function () {
                                            $(this).on("changeTo", function () {
                                                var t = $(this), e = t.find("[data-c_cssani]");
                                                coolsite_play.util.cssanimation.addCssAni(e, ".c-slide", t)
                                            })
                                        })
                                    } else {
                                        var n = e.find("[data-c_cssani]");
                                        coolsite_play.util.cssanimation.addCssAni(n, ".c-section", e)
                                    }
                                }
                            })
                        }
                    }, findTimeline: function (t, e) {
                        var i = coolsite_play.doc.find("[data-c_cssani]");
                        return _.each(i, function (i) {
                            var n = $(i).parents(".c-section,.c-slider")[0] || $("body");
                            -1 == t.indexOf(n) && t.push(n), $(i).parents(".c-section")[0] || $(i).parents(".c-slider")[0] || !e || e.push(i)
                        }), {timeline: t, inBody: e}
                    }, addCssAni: function (t, e, i) {
                        _.each(t, function (t) {
                            if (!e || !i || $(t).parents(e)[0] == i[0]) {
                                var n = $(t).attr("data-c_cssani").split("|"), o = n[0], s = n[1], r = n[2], a = "1" == n[3] ? "infinite" : 1;
                                $(t).hasClass("cf-initHide") && $(t).removeClass("cf-initHide"), $(t).css({
                                    "animation-delay": parseFloat(r) + "s",
                                    "animation-duration": parseFloat(s) + "s",
                                    "animation-iteration-count": a
                                }).addClass(o + " animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                                    $(t).css({
                                        "animation-delay": "0s",
                                        "animation-duration": "0s"
                                    }).removeClass(o + " animated")
                                })
                            }
                        })
                    }, removeAllViews: function () {
                        var t = [];
                        t = coolsite_play.util.cssanimation.findTimeline(t).timeline, _.each(t, function (t) {
                            $(t).off("scrollIn"), $(t).hasClass("c-slider") && $(t).find(".c-slide").off("changeTo")
                        })
                    }
                }
            }
        };
        n = [], void 0 !== (o = function () {
            return window._cs || (window._cs = {}), window._cs.ani = i, window._cs.ani
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var i = {
            init: function () {
                coolsite_play.util.staggeranimation = {
                    generate: function () {
                        var t = _.filter(coolsite_play.animationlist.models, function (t) {
                            return "stage" == t.toJSON().data.aniType
                        });
                        _.each(t, function (t) {
                            var e = t.toJSON().data, i = e.selector, n = (e.stagger, _.find(coolsite_play.timelinelist.models, function (e) {
                                return -1 != e.toJSON().animations.indexOf(t.id)
                            }));
                            if (n && i) {
                                var o = coolsite_play.doc.find("[data-c_tl_id=" + n.id + "]"), s = o.find(i);
                                t.iview.$el = s, t.iview.stashStyle()
                            }
                        })
                    }, removeAllViews: function () {
                    }
                }
            }
        };
        n = [], void 0 !== (o = function () {
            return window._cs || (window._cs = {}), window._cs.stagger = i, window._cs.stagger
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var i = {
            init: function () {
                coolsite_play.util.infinitescroll = {
                    generate: function () {
                        var t = coolsite_play.doc.find(".c-infinite");
                        _.each(t, function (t) {
                            var e = $(t).attr("class"), i = $(t).attr("listtarget"), n = "c-infinite-" + _g.uuid(2);
                            $(t).addClass(n);
                            var o, s;
                            if (e) {
                                if (!$(t).children().length || !$(t).children().eq(0).children().length)return;
                                if (!(o = "." + $($(t).children().children()[0]).attr("class")))return;
                                o = o.trim().split(" ").join("."), s = $(t).children(), e = "." + n;
                                var r = $(t).height();
                                if ($(t).css({
                                        height: r - 10 + "px",
                                        overflow: "auto"
                                    }), $(t).addClass("hide-scrollbar"), $(t).append("<div class='page-load-status' style='height:1px;text-align: center;color: #777;'><p class='infinite-scroll-request'>Loading...</p> </div> "), $(t).attr("infinitescroll") && o) {
                                    var a = window.location.pathname + "?page={{#}}&ajax=1&list_id=" + i, l = s.infiniteScroll({
                                        debug: !0,
                                        path: a,
                                        append: o,
                                        elementScroll: e,
                                        status: e + " .page-load-status",
                                        checkLastPage: !0,
                                        scrollThreshold: 1,
                                        responseType: "document",
                                        loadOnScroll: !1
                                    }), c = l.data("infiniteScroll"), u = !1, h = !1;
                                    c.on("scrollThreshold", function () {
                                        var e = c.getPath(), i = this;
                                        e && !u ? (u = !0, $.ajax({
                                            url: e, type: "GET", success: function (e) {
                                                var n = $(e).find(o);
                                                if (!n.length)return void(h = !0);
                                                n.imagesLoaded().done(function () {
                                                    c.appendItems(n), c.pageIndex += 1, c.loadCount += 1, $(i.scroller).hasClass("masonry") && ($(i.scroller).children().data().masonry.reloadItems(), $(i.scroller).children().data().masonry.layout());
                                                    $(t).children().height();
                                                    $(t).css({overflow: "auto"})
                                                }), u = !1
                                            }, error: function () {
                                            }
                                        })) : h && $(i.statusElement).find(".infinite-scroll-request").html("End")
                                    }), c.on("request", function (t) {
                                        console.log(t)
                                    }), c.on("load", function (t, e) {
                                        console.log(t)
                                    })
                                }
                            }
                        })
                    }
                }
            }
        };
        n = [], void 0 !== (o = function () {
            return window._cs || (window._cs = {}), window._cs.infinitescroll = i, window._cs.infinitescroll
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o;
    !function () {
        var i = {
            init: function () {
                coolsite_play.util.refreshcontentlist = {
                    generate: function (t) {
                        t || (t = coolsite_play.doc.find(".c-contentlistviewv2")), t.each(function () {
                            var t = $(this), e = t.attr("ajaxload");
                            t.find("nav a").each(function () {
                                var i = $(this);
                                i.off("click").on("click", function (n) {
                                    if (e) {
                                        n.preventDefault();
                                        var o = i.attr("href");
                                        $.ajax({
                                            url: o, type: "GET", success: function (e) {
                                                if (t.replaceWith($(e)), $(e).attr("class")) {
                                                    var i = "." + $(e).attr("class").replace(" ", ".");
                                                    coolsite_play.util.refreshcontentlist.generate($(i))
                                                }
                                            }
                                        })
                                    }
                                })
                            })
                        })
                    }
                }
            }
        };
        n = [], void 0 !== (o = function () {
            return window._cs || (window._cs = {}), window._cs.refreshcontentlist = i, window._cs.refreshcontentlist
        }.apply(e, n)) && (t.exports = o)
    }(window)
}, function (t, e, i) {
    "use strict";
    function n(t, e, i) {
        return e in t ? Object.defineProperty(t, e, {
            value: i,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = i, t
    }

    var o, s;
    !function () {
        var i = {
            init: function () {
                window.coolsite_play = {
                    model: n({animation: {}, action: {}, timeline: {}, element: {}}, "action", {}),
                    view: n({animation: {}, action: {}, timeline: {}, element: {}}, "action", {}),
                    controller: n({animation: {}, action: {}, timeline: {}, element: {}}, "action", {}),
                    collection: {},
                    ui: {},
                    events: {},
                    util: {},
                    varible: {}
                }, coolsite_play.isPreview = !1, coolsite_play.scrollItems = [], coolsite_play.sectionItems = [], coolsite_play.currentActiveIndex = null, coolsite_play.isSectionSwitching = null, coolsite_play.isSectionLock = null, coolsite_play.animationCommonArgs = {
                    de: 0,
                    du: 1,
                    rp: 0,
                    rv: 0,
                    st: 1,
                    es: 0,
                    wa: 0
                }, coolsite_play.animationArgs = {
                    1: {di: 0, dt: 0, dl: 0},
                    2: {di: 0, dt: 0, dl: 0},
                    3: {},
                    4: {},
                    7: {deg: 0, ax: 0},
                    8: {op: 100},
                    9: {sc: 1},
                    10: {sc: 2, op: 50},
                    11: {startx: 0, starty: 0, endx: 0, endy: 100}
                }, coolsite_play.easeType = {
                    0: "Linear.easeNone",
                    1: "Power0.easeIn",
                    2: "Power0.easeInOut",
                    3: "Power0.easeOut",
                    4: "Power1.easeIn",
                    5: "Power1.easeInOut",
                    6: "Power1.easeOut",
                    7: "Power2.easeIn",
                    8: "Power2.easeInOut",
                    9: "Power2.easeOut",
                    10: "Power3.easeIn",
                    11: "Power3.easeInOut",
                    12: "Power3.easeOut",
                    13: "Power4.easeIn",
                    14: "Power4.easeInOut",
                    15: "Power4.easeOut",
                    16: "Quad.easeIn",
                    17: "Quad.easeInOut",
                    18: "Quad.easeOut",
                    19: "Cubic.easeIn",
                    20: "Cubic.easeInOut",
                    21: "Cubic.easeOut",
                    22: "Quart.easeIn",
                    23: "Quart.easeInOut",
                    24: "Quart.easeOut",
                    25: "Quint.easeIn",
                    26: "Quint.easeInOut",
                    27: "Quint.easeOut",
                    28: "Strong.easeIn",
                    29: "Strong.easeInOut",
                    30: "Strong.easeOut",
                    31: "Back.easeIn",
                    32: "Back.easeInOut",
                    33: "Back.easeOut",
                    34: "Bounce.easeIn",
                    35: "Bounce.easeInOut",
                    36: "Bounce.easeOut",
                    37: "Circ.easeIn",
                    38: "Circ.easeInOut",
                    39: "Circ.easeOut",
                    40: "Elastic.easeIn",
                    41: "Elastic.easeInOut",
                    42: "Elastic.easeOut",
                    43: "Expo.easeIn",
                    44: "Expo.easeInOut",
                    45: "Expo.easeOut",
                    46: "Sine.easeIn",
                    47: "Sine.easeInOut",
                    48: "Sine.easeOut",
                    49: "SlowMo.ease"
                }, coolsite_play.elementReference = {
                    "c-section": "section",
                    "c-container": "container",
                    "c-image": "image",
                    "c-slider": "slider",
                    "c-button": "button",
                    "c-row": "row",
                    "c-column": "column",
                    "c-paragraph": "c-paragraph",
                    "c-heading": "heading",
                    "c-div": "div",
                    "c-list": "list",
                    "c-listitem": "listitem",
                    "c-textblock": "textblock",
                    "c-slidermask": "slidermask",
                    "c-slide": "slide",
                    "c-linkblock": "lineblock",
                    "c-textlink": "textlink",
                    "c-leftarrow": "leftarrow",
                    "c-rightarrow": "rightarrow",
                    "c-icon": "icon",
                    "c-slidernav": "slidernav",
                    "c-slidernavdot": "slidernavdot"
                }, coolsite_play.elementState = {state1: "c-state1", state2: "c-state2", state3: "c-state3"}
            }, start: function (t) {
                coolsite_play.animationlist = new coolsite_play.collection.animation, coolsite_play.timelinelist = new coolsite_play.collection.timeline, coolsite_play.sliderlist = new coolsite_play.collection.slider, coolsite_play.actionlist = new coolsite_play.collection.action
            }
        };
        o = [], void 0 !== (s = function () {
            return window._cs || (window._cs = {}), window._cs.variable = i, window._cs.variable
        }.apply(e, o)) && (t.exports = s)
    }(window)
}, function (t, e, i) {
    "use strict";
    var n, o, s, r, a, n, l, c, u, h, n, d, n, f, p, n, m, f, n, o, g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t
    } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    /*!
     * Masonry PACKAGED v4.2.0
     * Cascading grid layout library
     * http://masonry.desandro.com
     * MIT License
     * by David DeSandro
     */
    !function (s, r) {
        n = [i(1)], void 0 !== (o = function (t) {
            return r(s, t)
        }.apply(e, n)) && (t.exports = o)
    }(window, function (t, e) {
        function i(i, s, a) {
            function l(t, e, n) {
                var o, s = "$()." + i + '("' + e + '")';
                return t.each(function (t, l) {
                    var c = a.data(l, i);
                    if (!c)return void r(i + " not initialized. Cannot call methods, i.e. " + s);
                    var u = c[e];
                    if (!u || "_" == e.charAt(0))return void r(s + " is not a valid method");
                    var h = u.apply(c, n);
                    o = void 0 === o ? h : o
                }), void 0 !== o ? o : t
            }

            function c(t, e) {
                t.each(function (t, n) {
                    var o = a.data(n, i);
                    o ? (o.option(e), o._init()) : (o = new s(n, e), a.data(n, i, o))
                })
            }

            (a = a || e || t.jQuery) && (s.prototype.option || (s.prototype.option = function (t) {
                a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
            }), a.fn[i] = function (t) {
                if ("string" == typeof t) {
                    return l(this, t, o.call(arguments, 1))
                }
                return c(this, t), this
            }, n(a))
        }

        function n(t) {
            !t || t && t.bridget || (t.bridget = i)
        }

        var o = Array.prototype.slice, s = t.console, r = void 0 === s ? function () {
        } : function (t) {
            s.error(t)
        };
        return n(e || t.jQuery), i
    }), function (t, e) {
        r = e, a = {
            id: "ev-emitter/ev-emitter",
            exports: {},
            loaded: !1
        }, s = "function" == typeof r ? r.call(a.exports, i, a.exports, a) : r, a.loaded = !0, void 0 === s && (s = a.exports)
    }("undefined" != typeof window && window, function () {
        function t() {
        }

        var e = t.prototype;
        return e.on = function (t, e) {
            if (t && e) {
                var i = this._events = this._events || {}, n = i[t] = i[t] || [];
                return -1 == n.indexOf(e) && n.push(e), this
            }
        }, e.once = function (t, e) {
            if (t && e) {
                this.on(t, e);
                var i = this._onceEvents = this._onceEvents || {};
                return (i[t] = i[t] || {})[e] = !0, this
            }
        }, e.off = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = i.indexOf(e);
                return -1 != n && i.splice(n, 1), this
            }
        }, e.emitEvent = function (t, e) {
            var i = this._events && this._events[t];
            if (i && i.length) {
                var n = 0, o = i[n];
                e = e || [];
                for (var s = this._onceEvents && this._onceEvents[t]; o;) {
                    var r = s && s[o];
                    r && (this.off(t, o), delete s[o]), o.apply(this, e), n += r ? 0 : 1, o = i[n]
                }
                return this
            }
        }, t
    }), function (t, i) {
        n = [], l = function () {
            return i()
        }.apply(e, n)
    }(window, function () {
        function t(t) {
            var e = parseFloat(t);
            return -1 == t.indexOf("%") && !isNaN(e) && e
        }

        function e() {
        }

        function i() {
            for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; c > e; e++) {
                t[l[e]] = 0
            }
            return t
        }

        function n(t) {
            var e = getComputedStyle(t);
            return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"), e
        }

        function o() {
            if (!u) {
                u = !0;
                var e = document.createElement("div");
                e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
                var i = document.body || document.documentElement;
                i.appendChild(e);
                var o = n(e);
                s.isBoxSizeOuter = r = 200 == t(o.width), i.removeChild(e)
            }
        }

        function s(e) {
            if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == (void 0 === e ? "undefined" : g(e)) && e.nodeType) {
                var s = n(e);
                if ("none" == s.display)return i();
                var a = {};
                a.width = e.offsetWidth, a.height = e.offsetHeight;
                for (var u = a.isBorderBox = "border-box" == s.boxSizing, h = 0; c > h; h++) {
                    var d = l[h], f = s[d], p = parseFloat(f);
                    a[d] = isNaN(p) ? 0 : p
                }
                var m = a.paddingLeft + a.paddingRight, v = a.paddingTop + a.paddingBottom, y = a.marginLeft + a.marginRight, _ = a.marginTop + a.marginBottom, w = a.borderLeftWidth + a.borderRightWidth, b = a.borderTopWidth + a.borderBottomWidth, C = u && r, x = t(s.width);
                !1 !== x && (a.width = x + (C ? 0 : m + w));
                var $ = t(s.height);
                return !1 !== $ && (a.height = $ + (C ? 0 : v + b)), a.innerWidth = a.width - (m + w), a.innerHeight = a.height - (v + b), a.outerWidth = a.width + y, a.outerHeight = a.height + _, a
            }
        }

        var r, a = "undefined" == typeof console ? e : function (t) {
            console.error(t)
        }, l = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"], c = l.length, u = !1;
        return s
    }), function (t, e) {
        u = e, h = {
            id: "desandro-matches-selector/matches-selector",
            exports: {},
            loaded: !1
        }, c = "function" == typeof u ? u.call(h.exports, i, h.exports, h) : u, h.loaded = !0, void 0 === c && (c = h.exports)
    }(window, function () {
        var t = function () {
            var t = window.Element.prototype;
            if (t.matches)return "matches";
            if (t.matchesSelector)return "matchesSelector";
            for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
                var n = e[i], o = n + "MatchesSelector";
                if (t[o])return o
            }
        }();
        return function (e, i) {
            return e[t](i)
        }
    }), function (t, i) {
        n = [c], d = function (e) {
            return i(t, e)
        }.apply(e, n)
    }(window, function (t, e) {
        var i = {};
        i.extend = function (t, e) {
            for (var i in e)t[i] = e[i];
            return t
        }, i.modulo = function (t, e) {
            return (t % e + e) % e
        }, i.makeArray = function (t) {
            var e = [];
            if (Array.isArray(t)) e = t; else if (t && "object" == (void 0 === t ? "undefined" : g(t)) && "number" == typeof t.length)for (var i = 0; i < t.length; i++)e.push(t[i]); else e.push(t);
            return e
        }, i.removeFrom = function (t, e) {
            var i = t.indexOf(e);
            -1 != i && t.splice(i, 1)
        }, i.getParent = function (t, i) {
            for (; t != document.body;)if (t = t.parentNode, e(t, i))return t
        }, i.getQueryElement = function (t) {
            return "string" == typeof t ? document.querySelector(t) : t
        }, i.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, i.filterFindElements = function (t, n) {
            t = i.makeArray(t);
            var o = [];
            return t.forEach(function (t) {
                if (t instanceof HTMLElement) {
                    if (!n)return void o.push(t);
                    e(t, n) && o.push(t);
                    for (var i = t.querySelectorAll(n), s = 0; s < i.length; s++)o.push(i[s])
                }
            }), o
        }, i.debounceMethod = function (t, e, i) {
            var n = t.prototype[e], o = e + "Timeout";
            t.prototype[e] = function () {
                var t = this[o];
                t && clearTimeout(t);
                var e = arguments, s = this;
                this[o] = setTimeout(function () {
                    n.apply(s, e), delete s[o]
                }, i || 100)
            }
        }, i.docReady = function (t) {
            var e = document.readyState;
            "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
        }, i.toDashed = function (t) {
            return t.replace(/(.)([A-Z])/g, function (t, e, i) {
                return e + "-" + i
            }).toLowerCase()
        };
        var n = t.console;
        return i.htmlInit = function (e, o) {
            i.docReady(function () {
                var s = i.toDashed(o), r = "data-" + s, a = document.querySelectorAll("[" + r + "]"), l = document.querySelectorAll(".js-" + s), c = i.makeArray(a).concat(i.makeArray(l)), u = r + "-options", h = t.jQuery;
                c.forEach(function (t) {
                    var i, s = t.getAttribute(r) || t.getAttribute(u);
                    try {
                        i = s && JSON.parse(s)
                    } catch (e) {
                        return void(n && n.error("Error parsing " + r + " on " + t.className + ": " + e))
                    }
                    var a = new e(t, i);
                    h && h.data(t, o, a)
                })
            })
        }, i
    }), function (t, i) {
        n = [s, l], f = i, p = "function" == typeof f ? f.apply(e, n) : f
    }(window, function (t, e) {
        function i(t) {
            for (var e in t)return !1;
            return null, !0
        }

        function n(t, e) {
            t && (this.element = t, this.layout = e, this.position = {x: 0, y: 0}, this._create())
        }

        var o = document.documentElement.style, s = "string" == typeof o.transition ? "transition" : "WebkitTransition", r = "string" == typeof o.transform ? "transform" : "WebkitTransform", a = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        }[s], l = {
            transform: r,
            transition: s,
            transitionDuration: s + "Duration",
            transitionProperty: s + "Property",
            transitionDelay: s + "Delay"
        }, c = n.prototype = Object.create(t.prototype);
        c.constructor = n, c._create = function () {
            this._transn = {ingProperties: {}, clean: {}, onEnd: {}}, this.css({position: "absolute"})
        }, c.handleEvent = function (t) {
            var e = "on" + t.type;
            this[e] && this[e](t)
        }, c.getSize = function () {
            this.size = e(this.element)
        }, c.css = function (t) {
            var e = this.element.style;
            for (var i in t) {
                e[l[i] || i] = t[i]
            }
        }, c.getPosition = function () {
            var t = getComputedStyle(this.element), e = this.layout._getOption("originLeft"), i = this.layout._getOption("originTop"), n = t[e ? "left" : "right"], o = t[i ? "top" : "bottom"], s = this.layout.size, r = -1 != n.indexOf("%") ? parseFloat(n) / 100 * s.width : parseInt(n, 10), a = -1 != o.indexOf("%") ? parseFloat(o) / 100 * s.height : parseInt(o, 10);
            r = isNaN(r) ? 0 : r, a = isNaN(a) ? 0 : a, r -= e ? s.paddingLeft : s.paddingRight, a -= i ? s.paddingTop : s.paddingBottom, this.position.x = r, this.position.y = a
        }, c.layoutPosition = function () {
            var t = this.layout.size, e = {}, i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop"), o = i ? "paddingLeft" : "paddingRight", s = i ? "left" : "right", r = i ? "right" : "left", a = this.position.x + t[o];
            e[s] = this.getXValue(a), e[r] = "";
            var l = n ? "paddingTop" : "paddingBottom", c = n ? "top" : "bottom", u = n ? "bottom" : "top", h = this.position.y + t[l];
            e[c] = this.getYValue(h), e[u] = "", this.css(e), this.emitEvent("layout", [this])
        }, c.getXValue = function (t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
        }, c.getYValue = function (t) {
            var e = this.layout._getOption("horizontal");
            return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
        }, c._transitionTo = function (t, e) {
            this.getPosition();
            var i = this.position.x, n = this.position.y, o = parseInt(t, 10), s = parseInt(e, 10), r = o === this.position.x && s === this.position.y;
            if (this.setPosition(t, e), r && !this.isTransitioning)return void this.layoutPosition();
            var a = t - i, l = e - n, c = {};
            c.transform = this.getTranslate(a, l), this.transition({
                to: c,
                onTransitionEnd: {transform: this.layoutPosition},
                isCleaning: !0
            })
        }, c.getTranslate = function (t, e) {
            var i = this.layout._getOption("originLeft"), n = this.layout._getOption("originTop");
            return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
        }, c.goTo = function (t, e) {
            this.setPosition(t, e), this.layoutPosition()
        }, c.moveTo = c._transitionTo, c.setPosition = function (t, e) {
            this.position.x = parseInt(t, 10), this.position.y = parseInt(e, 10)
        }, c._nonTransition = function (t) {
            this.css(t.to), t.isCleaning && this._removeStyles(t.to);
            for (var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)
        }, c.transition = function (t) {
            if (!parseFloat(this.layout.options.transitionDuration))return void this._nonTransition(t);
            var e = this._transn;
            for (var i in t.onTransitionEnd)e.onEnd[i] = t.onTransitionEnd[i];
            for (i in t.to)e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
            if (t.from) {
                this.css(t.from);
                this.element.offsetHeight;
                null
            }
            this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
        };
        var u = "opacity," + function (t) {
                return t.replace(/([A-Z])/g, function (t) {
                    return "-" + t.toLowerCase()
                })
            }(r);
        c.enableTransition = function () {
            if (!this.isTransitioning) {
                var t = this.layout.options.transitionDuration;
                t = "number" == typeof t ? t + "ms" : t, this.css({
                    transitionProperty: u,
                    transitionDuration: t,
                    transitionDelay: this.staggerDelay || 0
                }), this.element.addEventListener(a, this, !1)
            }
        }, c.onwebkitTransitionEnd = function (t) {
            this.ontransitionend(t)
        }, c.onotransitionend = function (t) {
            this.ontransitionend(t)
        };
        var h = {"-webkit-transform": "transform"};
        c.ontransitionend = function (t) {
            if (t.target === this.element) {
                var e = this._transn, n = h[t.propertyName] || t.propertyName;
                if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                    e.onEnd[n].call(this), delete e.onEnd[n]
                }
                this.emitEvent("transitionEnd", [this])
            }
        }, c.disableTransition = function () {
            this.removeTransitionStyles(), this.element.removeEventListener(a, this, !1), this.isTransitioning = !1
        }, c._removeStyles = function (t) {
            var e = {};
            for (var i in t)e[i] = "";
            this.css(e)
        };
        var d = {transitionProperty: "", transitionDuration: "", transitionDelay: ""};
        return c.removeTransitionStyles = function () {
            this.css(d)
        }, c.stagger = function (t) {
            t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
        }, c.removeElem = function () {
            this.element.parentNode.removeChild(this.element), this.css({display: ""}), this.emitEvent("remove", [this])
        }, c.remove = function () {
            return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
                this.removeElem()
            }), void this.hide()) : void this.removeElem()
        }, c.reveal = function () {
            delete this.isHidden, this.css({display: ""});
            var t = this.layout.options, e = {};
            e[this.getHideRevealTransitionEndProperty("visibleStyle")] = this.onRevealTransitionEnd, this.transition({
                from: t.hiddenStyle,
                to: t.visibleStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, c.onRevealTransitionEnd = function () {
            this.isHidden || this.emitEvent("reveal")
        }, c.getHideRevealTransitionEndProperty = function (t) {
            var e = this.layout.options[t];
            if (e.opacity)return "opacity";
            for (var i in e)return i
        }, c.hide = function () {
            this.isHidden = !0, this.css({display: ""});
            var t = this.layout.options, e = {};
            e[this.getHideRevealTransitionEndProperty("hiddenStyle")] = this.onHideTransitionEnd, this.transition({
                from: t.visibleStyle,
                to: t.hiddenStyle,
                isCleaning: !0,
                onTransitionEnd: e
            })
        }, c.onHideTransitionEnd = function () {
            this.isHidden && (this.css({display: "none"}), this.emitEvent("hide"))
        }, c.destroy = function () {
            this.css({position: "", left: "", right: "", top: "", bottom: "", transition: "", transform: ""})
        }, n
    }), function (t, i) {
        n = [s, l, d, p], m = function (e, n, o, s) {
            return i(t, e, n, o, s)
        }.apply(e, n)
    }(window, function (t, e, i, n, o) {
        function s(t, e) {
            var i = n.getQueryElement(t);
            if (!i)return void(l && l.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
            this.element = i, c && (this.$element = c(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
            var o = ++h;
            this.element.outlayerGUID = o, d[o] = this, this._create(), this._getOption("initLayout") && this.layout()
        }

        function r(t) {
            function e() {
                t.apply(this, arguments)
            }

            return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
        }

        function a(t) {
            if ("number" == typeof t)return t;
            var e = t.match(/(^\d*\.?\d*)(\w*)/), i = e && e[1], n = e && e[2];
            return i.length ? (i = parseFloat(i)) * (p[n] || 1) : 0
        }

        var l = t.console, c = t.jQuery, u = function () {
        }, h = 0, d = {};
        s.namespace = "outlayer", s.Item = o, s.defaults = {
            containerStyle: {position: "relative"},
            initLayout: !0,
            originLeft: !0,
            originTop: !0,
            resize: !0,
            resizeContainer: !0,
            transitionDuration: "0.4s",
            hiddenStyle: {opacity: 0, transform: "scale(0.001)"},
            visibleStyle: {opacity: 1, transform: "scale(1)"}
        };
        var f = s.prototype;
        n.extend(f, e.prototype), f.option = function (t) {
            n.extend(this.options, t)
        }, f._getOption = function (t) {
            var e = this.constructor.compatOptions[t];
            return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
        }, s.compatOptions = {
            initLayout: "isInitLayout",
            horizontal: "isHorizontal",
            layoutInstant: "isLayoutInstant",
            originLeft: "isOriginLeft",
            originTop: "isOriginTop",
            resize: "isResizeBound",
            resizeContainer: "isResizingContainer"
        }, f._create = function () {
            this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle), this._getOption("resize") && this.bindResize()
        }, f.reloadItems = function () {
            this.items = this._itemize(this.element.children)
        }, f._itemize = function (t) {
            for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
                var s = e[o], r = new i(s, this);
                n.push(r)
            }
            return n
        }, f._filterFindItemElements = function (t) {
            return n.filterFindElements(t, this.options.itemSelector)
        }, f.getItemElements = function () {
            return this.items.map(function (t) {
                return t.element
            })
        }, f.layout = function () {
            this._resetLayout(), this._manageStamps();
            var t = this._getOption("layoutInstant"), e = void 0 !== t ? t : !this._isLayoutInited;
            this.layoutItems(this.items, e), this._isLayoutInited = !0
        }, f._init = f.layout, f._resetLayout = function () {
            this.getSize()
        }, f.getSize = function () {
            this.size = i(this.element)
        }, f._getMeasurement = function (t, e) {
            var n, o = this.options[t];
            o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
        }, f.layoutItems = function (t, e) {
            t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
        }, f._getItemsForLayout = function (t) {
            return t.filter(function (t) {
                return !t.isIgnored
            })
        }, f._layoutItems = function (t, e) {
            if (this._emitCompleteOnItems("layout", t), t && t.length) {
                var i = [];
                t.forEach(function (t) {
                    var n = this._getItemLayoutPosition(t);
                    n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
                }, this), this._processLayoutQueue(i)
            }
        }, f._getItemLayoutPosition = function () {
            return {x: 0, y: 0}
        }, f._processLayoutQueue = function (t) {
            this.updateStagger(), t.forEach(function (t, e) {
                this._positionItem(t.item, t.x, t.y, t.isInstant, e)
            }, this)
        }, f.updateStagger = function () {
            var t = this.options.stagger;
            return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
        }, f._positionItem = function (t, e, i, n, o) {
            n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
        }, f._postLayout = function () {
            this.resizeContainer()
        }, f.resizeContainer = function () {
            if (this._getOption("resizeContainer")) {
                var t = this._getContainerSize();
                t && (this._setContainerMeasure(t.width, !0), this._setContainerMeasure(t.height, !1))
            }
        }, f._getContainerSize = u, f._setContainerMeasure = function (t, e) {
            if (void 0 !== t) {
                var i = this.size;
                i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
            }
        }, f._emitCompleteOnItems = function (t, e) {
            function i() {
                o.dispatchEvent(t + "Complete", null, [e])
            }

            function n() {
                ++r == s && i()
            }

            var o = this, s = e.length;
            if (!e || !s)return void i();
            var r = 0;
            e.forEach(function (e) {
                e.once(t, n)
            })
        }, f.dispatchEvent = function (t, e, i) {
            var n = e ? [e].concat(i) : i;
            if (this.emitEvent(t, n), c)if (this.$element = this.$element || c(this.element), e) {
                var o = c.Event(e);
                o.type = t, this.$element.trigger(o, i)
            } else this.$element.trigger(t, i)
        }, f.ignore = function (t) {
            var e = this.getItem(t);
            e && (e.isIgnored = !0)
        }, f.unignore = function (t) {
            var e = this.getItem(t);
            e && delete e.isIgnored
        }, f.stamp = function (t) {
            (t = this._find(t)) && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
        }, f.unstamp = function (t) {
            (t = this._find(t)) && t.forEach(function (t) {
                n.removeFrom(this.stamps, t), this.unignore(t)
            }, this)
        }, f._find = function (t) {
            return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
        }, f._manageStamps = function () {
            this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
        }, f._getBoundingRect = function () {
            var t = this.element.getBoundingClientRect(), e = this.size;
            this._boundingRect = {
                left: t.left + e.paddingLeft + e.borderLeftWidth,
                top: t.top + e.paddingTop + e.borderTopWidth,
                right: t.right - (e.paddingRight + e.borderRightWidth),
                bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
            }
        }, f._manageStamp = u, f._getElementOffset = function (t) {
            var e = t.getBoundingClientRect(), n = this._boundingRect, o = i(t);
            return {
                left: e.left - n.left - o.marginLeft,
                top: e.top - n.top - o.marginTop,
                right: n.right - e.right - o.marginRight,
                bottom: n.bottom - e.bottom - o.marginBottom
            }
        }, f.handleEvent = n.handleEvent, f.bindResize = function () {
            t.addEventListener("resize", this), this.isResizeBound = !0
        }, f.unbindResize = function () {
            t.removeEventListener("resize", this), this.isResizeBound = !1
        }, f.onresize = function () {
            this.resize()
        }, n.debounceMethod(s, "onresize", 100), f.resize = function () {
            this.isResizeBound && this.needsResizeLayout() && this.layout()
        }, f.needsResizeLayout = function () {
            var t = i(this.element);
            return this.size && t && t.innerWidth !== this.size.innerWidth
        }, f.addItems = function (t) {
            var e = this._itemize(t);
            return e.length && (this.items = this.items.concat(e)), e
        }, f.appended = function (t) {
            var e = this.addItems(t);
            e.length && (this.layoutItems(e, !0), this.reveal(e))
        }, f.prepended = function (t) {
            var e = this._itemize(t);
            if (e.length) {
                var i = this.items.slice(0);
                this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
            }
        }, f.reveal = function (t) {
            if (this._emitCompleteOnItems("reveal", t), t && t.length) {
                var e = this.updateStagger();
                t.forEach(function (t, i) {
                    t.stagger(i * e), t.reveal()
                })
            }
        }, f.hide = function (t) {
            if (this._emitCompleteOnItems("hide", t), t && t.length) {
                var e = this.updateStagger();
                t.forEach(function (t, i) {
                    t.stagger(i * e), t.hide()
                })
            }
        }, f.revealItemElements = function (t) {
            var e = this.getItems(t);
            this.reveal(e)
        }, f.hideItemElements = function (t) {
            var e = this.getItems(t);
            this.hide(e)
        }, f.getItem = function (t) {
            for (var e = 0; e < this.items.length; e++) {
                var i = this.items[e];
                if (i.element == t)return i
            }
        }, f.getItems = function (t) {
            t = n.makeArray(t);
            var e = [];
            return t.forEach(function (t) {
                var i = this.getItem(t);
                i && e.push(i)
            }, this), e
        }, f.remove = function (t) {
            var e = this.getItems(t);
            this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
                t.remove(), n.removeFrom(this.items, t)
            }, this)
        }, f.destroy = function () {
            var t = this.element.style;
            t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
                t.destroy()
            }), this.unbindResize();
            var e = this.element.outlayerGUID;
            delete d[e], delete this.element.outlayerGUID, c && c.removeData(this.element, this.constructor.namespace)
        }, s.data = function (t) {
            t = n.getQueryElement(t);
            var e = t && t.outlayerGUID;
            return e && d[e]
        }, s.create = function (t, e) {
            var i = r(s);
            return i.defaults = n.extend({}, s.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(o), n.htmlInit(i, t), c && c.bridget && c.bridget(t, i), i
        };
        var p = {ms: 1, s: 1e3};
        return s.Item = o, s
    }), function (i, s) {
        n = [m, l], f = s, void 0 !== (o = "function" == typeof f ? f.apply(e, n) : f) && (t.exports = o)
    }(window, function (t, e) {
        var i = t.create("masonry");
        i.compatOptions.fitWidth = "isFitWidth";
        var n = i.prototype;
        return n._resetLayout = function () {
            this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
            for (var t = 0; t < this.cols; t++)this.colYs.push(0);
            this.maxY = 0, this.horizontalColIndex = 0
        }, n.measureColumns = function () {
            if (this.getContainerWidth(), !this.columnWidth) {
                var t = this.items[0], i = t && t.element;
                this.columnWidth = i && e(i).outerWidth || this.containerWidth
            }
            var n = this.columnWidth += this.gutter, o = this.containerWidth + this.gutter, s = o / n, r = n - o % n, a = r && 1 > r ? "round" : "floor";
            s = Math[a](s), this.cols = Math.max(s, 1)
        }, n.getContainerWidth = function () {
            var t = this._getOption("fitWidth"), i = t ? this.element.parentNode : this.element, n = e(i);
            this.containerWidth = n && n.innerWidth
        }, n._getItemLayoutPosition = function (t) {
            t.getSize();
            var e = t.size.outerWidth % this.columnWidth, i = e && 1 > e ? "round" : "ceil", n = Math[i](t.size.outerWidth / this.columnWidth);
            n = Math.min(n, this.cols);
            for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[o](n, t), r = {
                x: this.columnWidth * s.col,
                y: s.y
            }, a = s.y + t.size.outerHeight, l = n + s.col, c = s.col; l > c; c++)this.colYs[c] = a;
            return r
        }, n._getTopColPosition = function (t) {
            var e = this._getTopColGroup(t), i = Math.min.apply(Math, e);
            return {col: e.indexOf(i), y: i}
        }, n._getTopColGroup = function (t) {
            if (2 > t)return this.colYs;
            for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++)e[n] = this._getColGroupY(n, t);
            return e
        }, n._getColGroupY = function (t, e) {
            if (2 > e)return this.colYs[t];
            var i = this.colYs.slice(t, t + e);
            return Math.max.apply(Math, i)
        }, n._getHorizontalColPosition = function (t, e) {
            var i = this.horizontalColIndex % this.cols;
            i = t > 1 && i + t > this.cols ? 0 : i;
            var n = e.size.outerWidth && e.size.outerHeight;
            return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {col: i, y: this._getColGroupY(i, t)}
        }, n._manageStamp = function (t) {
            var i = e(t), n = this._getElementOffset(t), o = this._getOption("originLeft"), s = o ? n.left : n.right, r = s + i.outerWidth, a = Math.floor(s / this.columnWidth);
            a = Math.max(0, a);
            var l = Math.floor(r / this.columnWidth);
            l -= r % this.columnWidth ? 0 : 1, l = Math.min(this.cols - 1, l);
            for (var c = this._getOption("originTop"), u = (c ? n.top : n.bottom) + i.outerHeight, h = a; l >= h; h++)this.colYs[h] = Math.max(u, this.colYs[h])
        }, n._getContainerSize = function () {
            this.maxY = Math.max.apply(Math, this.colYs);
            var t = {height: this.maxY};
            return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
        }, n._getContainerFitWidth = function () {
            for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];)t++;
            return (this.cols - t) * this.columnWidth - this.gutter
        }, n.needsResizeLayout = function () {
            var t = this.containerWidth;
            return this.getContainerWidth(), t != this.containerWidth
        }, i
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        config: {type: "navbar"}, onInit: function () {
            coolsite_play.doc.find(".navbar.c-navbar").each(function () {
                if ("undefined" != typeof page_slug) {
                    var t = page_slug;
                    $(this).find('.c-navlink[href!="#"]').each(function () {
                        var e = $(this).attr("href");
                        if (e && e.indexOf) {
                            if (-1 != e.indexOf("//"))return;
                            if (0 == e.indexOf("#"))return;
                            e.match(/\w+\.html/i) && (e = e.match(/\w+\.html/i)[0], e.replace(".html", "") === t ? $(this).parent().addClass("active") : $(this).parent().removeClass("active"))
                        }
                    })
                }
            })
        }
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        config: {type: "grid"}, onInit: function () {
            i(12).makeJQueryPlugin($), 0 != coolsite_play.doc.find(".masonry").length && coolsite_play.doc.find(".masonry").each(function () {
                if ($(this).children().eq(0).hasClass("c-row")) {
                    var t = $(this).children();
                    $(this).children().masonry({resize: !0}), t.imagesLoaded().progress(function () {
                        t.masonry("layout")
                    })
                } else {
                    var t = $(this);
                    $(this).masonry({resize: !0}), t.imagesLoaded().progress(function () {
                        t.masonry("layout")
                    })
                }
            })
        }
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        config: {type: "map"}, onInit: function () {
            coolsite_play.doc.find(".tag-map").each(function () {
                var t = $(this);
                t.html('<iframe id="map_iframe" frameborder="no" style="width: 100%;height: 100%;"></iframe>');
                var e = t.find("#map_iframe")[0];
                e.contentDocument.open();
                var i = t.attr("center_longitude"), n = t.attr("center_latitude"), o = t.attr("marker_longitude"), s = t.attr("marker_latitude"), r = t.attr("zoom"), a = t.attr("description").trim();
                i = Number(i) ? Number(i) : 121.39979660511018, n = Number(n) ? Number(n) : 31.206074968092846, o = Number(o) ? Number(o) : 121.39979660511018, s = Number(s) ? Number(s) : 31.206074968092846, r = Number(r) ? Number(r) : 13, e.contentDocument.write('<html><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/><style type="text/css">* {margin:0px;padding:0px;}</style><script charset="utf-8" src="http://map.qq.com/api/js?v=2.exp"><\/script></head><body style="width: 100%;height: 100%;"><div id="map" style="width:100%;height:100%;"></div><script>var map_center = new qq.maps.LatLng(' + n + ", " + i + "),    marker_center = new qq.maps.LatLng(" + s + ", " + o + ');/* create地图 */var map = new qq.maps.Map(document.getElementById("map"), {    center: map_center,    zoom: ' + r + ',    scrollwheel: false});/* 地址标志 */var marker = new qq.maps.Marker({    position: marker_center,    draggable: true,    map: map});marker.setDraggable(false);/* 标签文字 */var infoLabel = new qq.maps.Label({    map: map,    style: {borderColor:"red"}});infoLabel.setContent("' + a + '");infoLabel.setPosition(marker_center);<\/script></body></html>'), e.contentDocument.close()
            })
        }
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        config: {type: "svg"}, onInit: function () {
            function t(t, e) {
                var i, n = document.createElementNS("http://www.w3.org/2000/svg", t), o = /([a-z])([A-Z])/g;
                for (i in e)n.setAttributeNS(null, i.replace(o, "$1-$2").toLowerCase(), e[i]);
                return n
            }

            coolsite_play.doc.find(".tag-svg").each(function () {
                var e = $(this), i = e.attr("data-c_ani_id");
                if (i && i.split) {
                    i = i.split("|");
                    var n = coolsite_play.animationlist.models.filter(function (t) {
                        return 12 == t.attributes.data.type && _.include(i, t.id)
                    });
                    if (n.length > 0) {
                        if ("undefined" == typeof TweenMax)return;
                        TweenMax.set(e.find("path"), {display: "none"}), e.append(t("g", {
                            id: "cloneArea",
                            style: "display:none;"
                        })), e.find("#cloneArea").append(e.find("path").clone()), e.find("#cloneArea path").each(function (t, e) {
                            e.id = "clone_" + e.id, $(e).attr("data-attr", "morphCloneElement")
                        });
                        var o = n[0].attributes.data.d.pathIndex;
                        if (!_.isEmpty(o)) {
                            var s = _.find(o, function (t) {
                                return null != t.selected
                            });
                            if (s) {
                                s.id;
                                TweenMax.set(e.find("path#" + s.id), {display: "block"})
                            }
                        }
                    }
                }
            })
        }
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        config: {type: "imagemap"}, onInit: function () {
            coolsite_play.doc.find(".tag-imagemap").each(function () {
                var t = $(this), e = t.attr("mapdata");
                if ("" != e) {
                    t.html('<div id="image-map-pro-container" style="margin:0 auto;max-width:100%;max-height:100%;"></div>');
                    var i = JSON.parse(e), n = i.general.width, o = i.general.height, s = t.width(), r = t.height();
                    r > 0 && (s / r > n / o ? s = r * n / o : s / r < n / o && (r = s * o / n), t.find("#image-map-pro-container").width(s).height(r)), t.find("#image-map-pro-container").imageMapPro(i)
                } else t.html('<img src="' + t.attr("src") + '">')
            })
        }
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        config: {type: "searchbox"}, onInit: function () {
            coolsite_play.doc.find(".c-searchbox ").each(function () {
                var t = $(this).attr("searchSlug"), e = $(this);
                t && e.find(".c-search-box-input").off("keyup").on("keyup", function (i) {
                    var n = $(this).val(), o = e.find(".c-search-box-btn"), s = o.attr("target");
                    if (o && o.length && 13 == i.keyCode) {
                        var r;
                        r = n ? portal_url + t + "/keywords!!" + n + "/" : portal_url + t + ".html", "_blank" == s ? window.open(r) : window.location = r
                    }
                }), e.find(".c-search-box-btn").off("click").on("click", function (i) {
                    var n = e.find(".c-search-box-input").val();
                    if (n) {
                        var o = portal_url + t + "/keywords!!" + n + "/";
                        $(this).attr("href", o)
                    } else {
                        var o = portal_url + t + ".html";
                        $(this).attr("href", o)
                    }
                })
            })
        }
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        config: {type: "btn_list_item"}, onInit: function () {
            var t = this, e = coolsite_play.doc.find(".btn-listitem"), i = coolsite_play.doc.find(".c-btn-group-listitem");
            e.each(function () {
                t.addActive($(this))
            }), i.each(function () {
                t.addActive($(this))
            })
        }, addActive: function (t) {
            t.hasClass("active") && t.trigger("button_active"), t.off("click").on("click", function (e) {
                e.preventDefault(), t.hasClass("active") || (t.addClass("active"), t.siblings().removeClass("active")), $(e.target).trigger("button_active")
            }), t.on("button_active", function (e) {
                t.hasClass("active") || (t.addClass("active"), t.siblings().removeClass("active"))
            })
        }
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        config: {type: "contentgridviewv2"}, onInit: function () {
            coolsite_play.util.refreshcontentlist.generate()
        }
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        config: {type: "contentlistviewv2"}, onInit: function () {
            coolsite_play.util.refreshcontentlist.generate()
        }
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        config: {type: "qrcode"}, onInit: function () {
            var t = coolsite_play.doc.find(".c-qrcode");
            _.each(t, function (t) {
                var e = $(t).attr("qrcode"), i = $(t).attr("href");
                if (e && "$current_url" == e && !i || "#" == i ? i = window.location.href : e || i && (i = window.location.origin + i), -1 == i.indexOf("://") && (i = "http://" + i), i) {
                    var n = $("<div></div>");
                    n.qrcode({text: i});
                    var o = n.find("canvas")[0].toDataURL("image/png");
                    $(t).attr("src", o)
                }
            })
        }
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        type: "actionexecute", config: {
            type: 105, exec: function (t) {
                for (var e = t.model.get("data").args.e_ids, i = 0; i < e.length; i++)coolsite_play.util.canvasCirAni.generate($("[canvas-id='" + e[i] + "']"), !0)
            }
        }
    })
}, function (module, exports, __webpack_require__) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        type: "actionexecute", config: {
            type: 106, exec: function exec(actionview) {
                var data = unescape(actionview.model.toJSON().data.api_data), element = actionview.$el;
                if (data) {
                    data = "function($element){" + data + "}";
                    try {
                        eval("(" + data + ")")(element)
                    } catch (t) {
                        _g.getUrlParameterByName("-debug") && alert(t)
                    }
                }
            }
        }
    })
}, function (t, e, i) {
    "use strict";
    coolsite360.PlayerPlugins.push({
        type: "actionexecute", config: {
            type: 107, exec: function (t) {
                var e = t.model.toJSON().data.args, i = t.model.iview.$el, n = i.closest(".btn-listitem");
                if (n.hasClass("active") || (n.addClass("active"), n.siblings().removeClass("active")), e.content_list && void 0 != e.paramType) {
                    var o = window.location.pathname + "?list_id=" + e.content_list;
                    if (1 == e.paramType)var s = o + "&tags=" + e.tag_list || ""; else if (0 == e.paramType)var s = o + "&categories=" + e.category_list || "";
                    if (e.content_class)var r = e.content_class.join(".");
                    $.ajax({
                        type: "GET", url: s, success: function (t) {
                            if (r && ($("." + r).replaceWith(t), $(t).attr("class"))) {
                                var e = "." + $(t).attr("class").trim().replace(" ", ".");
                                coolsite_play.util.refreshcontentlist.generate($(e))
                            }
                        }
                    })
                }
            }
        }
    })
}, function (t, e, i) {
    "use strict";
    !function (t) {
        t.fn.qrcode = function (e) {
            function i(t) {
                this.mode = a, this.data = t
            }

            function n(t, e) {
                this.typeNumber = t, this.errorCorrectLevel = e, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = []
            }

            function o(t, e) {
                if (void 0 == t.length)throw Error(t.length + "/" + e);
                for (var i = 0; i < t.length && 0 == t[i];)i++;
                this.num = Array(t.length - i + e);
                for (var n = 0; n < t.length - i; n++)this.num[n] = t[n + i]
            }

            function s(t, e) {
                this.totalCount = t, this.dataCount = e
            }

            function r() {
                this.buffer = [], this.length = 0
            }

            var a;
            i.prototype = {
                getLength: function () {
                    return this.data.length
                }, write: function (t) {
                    for (var e = 0; e < this.data.length; e++)t.put(this.data.charCodeAt(e), 8)
                }
            }, n.prototype = {
                addData: function (t) {
                    this.dataList.push(new i(t)), this.dataCache = null
                }, isDark: function (t, e) {
                    if (0 > t || this.moduleCount <= t || 0 > e || this.moduleCount <= e)throw Error(t + "," + e);
                    return this.modules[t][e]
                }, getModuleCount: function () {
                    return this.moduleCount
                }, make: function () {
                    if (1 > this.typeNumber) {
                        for (var t = 1, t = 1; 40 > t; t++) {
                            for (var e = s.getRSBlocks(t, this.errorCorrectLevel), i = new r, n = 0, o = 0; o < e.length; o++)n += e[o].dataCount;
                            for (o = 0; o < this.dataList.length; o++)e = this.dataList[o], i.put(e.mode, 4), i.put(e.getLength(), l.getLengthInBits(e.mode, t)), e.write(i);
                            if (i.getLengthInBits() <= 8 * n)break
                        }
                        this.typeNumber = t
                    }
                    this.makeImpl(!1, this.getBestMaskPattern())
                }, makeImpl: function (t, e) {
                    this.moduleCount = 4 * this.typeNumber + 17, this.modules = Array(this.moduleCount);
                    for (var i = 0; i < this.moduleCount; i++) {
                        this.modules[i] = Array(this.moduleCount);
                        for (var o = 0; o < this.moduleCount; o++)this.modules[i][o] = null
                    }
                    this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(t, e), 7 <= this.typeNumber && this.setupTypeNumber(t), null == this.dataCache && (this.dataCache = n.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, e)
                }, setupPositionProbePattern: function (t, e) {
                    for (var i = -1; 7 >= i; i++)if (!(-1 >= t + i || this.moduleCount <= t + i))for (var n = -1; 7 >= n; n++)-1 >= e + n || this.moduleCount <= e + n || (this.modules[t + i][e + n] = 0 <= i && 6 >= i && (0 == n || 6 == n) || 0 <= n && 6 >= n && (0 == i || 6 == i) || 2 <= i && 4 >= i && 2 <= n && 4 >= n)
                }, getBestMaskPattern: function () {
                    for (var t = 0, e = 0, i = 0; 8 > i; i++) {
                        this.makeImpl(!0, i);
                        var n = l.getLostPoint(this);
                        (0 == i || t > n) && (t = n, e = i)
                    }
                    return e
                }, createMovieClip: function (t, e, i) {
                    for (t = t.createEmptyMovieClip(e, i), this.make(), e = 0; e < this.modules.length; e++)for (var i = 1 * e, n = 0; n < this.modules[e].length; n++) {
                        var o = 1 * n;
                        this.modules[e][n] && (t.beginFill(0, 100), t.moveTo(o, i), t.lineTo(o + 1, i), t.lineTo(o + 1, i + 1), t.lineTo(o, i + 1), t.endFill())
                    }
                    return t
                }, setupTimingPattern: function () {
                    for (var t = 8; t < this.moduleCount - 8; t++)null == this.modules[t][6] && (this.modules[t][6] = 0 == t % 2);
                    for (t = 8; t < this.moduleCount - 8; t++)null == this.modules[6][t] && (this.modules[6][t] = 0 == t % 2)
                }, setupPositionAdjustPattern: function () {
                    for (var t = l.getPatternPosition(this.typeNumber), e = 0; e < t.length; e++)for (var i = 0; i < t.length; i++) {
                        var n = t[e], o = t[i];
                        if (null == this.modules[n][o])for (var s = -2; 2 >= s; s++)for (var r = -2; 2 >= r; r++)this.modules[n + s][o + r] = -2 == s || 2 == s || -2 == r || 2 == r || 0 == s && 0 == r
                    }
                }, setupTypeNumber: function (t) {
                    for (var e = l.getBCHTypeNumber(this.typeNumber), i = 0; 18 > i; i++) {
                        var n = !t && 1 == (e >> i & 1);
                        this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = n
                    }
                    for (i = 0; 18 > i; i++)n = !t && 1 == (e >> i & 1), this.modules[i % 3 + this.moduleCount - 8 - 3][Math.floor(i / 3)] = n
                }, setupTypeInfo: function (t, e) {
                    for (var i = l.getBCHTypeInfo(this.errorCorrectLevel << 3 | e), n = 0; 15 > n; n++) {
                        var o = !t && 1 == (i >> n & 1);
                        6 > n ? this.modules[n][8] = o : 8 > n ? this.modules[n + 1][8] = o : this.modules[this.moduleCount - 15 + n][8] = o
                    }
                    for (n = 0; 15 > n; n++)o = !t && 1 == (i >> n & 1), 8 > n ? this.modules[8][this.moduleCount - n - 1] = o : 9 > n ? this.modules[8][15 - n - 1 + 1] = o : this.modules[8][15 - n - 1] = o;
                    this.modules[this.moduleCount - 8][8] = !t
                }, mapData: function (t, e) {
                    for (var i = -1, n = this.moduleCount - 1, o = 7, s = 0, r = this.moduleCount - 1; 0 < r; r -= 2)for (6 == r && r--; ;) {
                        for (var a = 0; 2 > a; a++)if (null == this.modules[n][r - a]) {
                            var c = !1;
                            s < t.length && (c = 1 == (t[s] >>> o & 1)), l.getMask(e, n, r - a) && (c = !c), this.modules[n][r - a] = c, o--, -1 == o && (s++, o = 7)
                        }
                        if (0 > (n += i) || this.moduleCount <= n) {
                            n -= i, i = -i;
                            break
                        }
                    }
                }
            }, n.PAD0 = 236, n.PAD1 = 17, n.createData = function (t, e, i) {
                for (var e = s.getRSBlocks(t, e), o = new r, a = 0; a < i.length; a++) {
                    var c = i[a];
                    o.put(c.mode, 4), o.put(c.getLength(), l.getLengthInBits(c.mode, t)), c.write(o)
                }
                for (a = t = 0; a < e.length; a++)t += e[a].dataCount;
                if (o.getLengthInBits() > 8 * t)throw Error("code length overflow. (" + o.getLengthInBits() + ">" + 8 * t + ")");
                for (o.getLengthInBits() + 4 <= 8 * t && o.put(0, 4); 0 != o.getLengthInBits() % 8;)o.putBit(!1);
                for (; !(o.getLengthInBits() >= 8 * t) && (o.put(n.PAD0, 8), !(o.getLengthInBits() >= 8 * t));)o.put(n.PAD1, 8);
                return n.createBytes(o, e)
            }, n.createBytes = function (t, e) {
                for (var i = 0, n = 0, s = 0, r = Array(e.length), a = Array(e.length), c = 0; c < e.length; c++) {
                    var u = e[c].dataCount, h = e[c].totalCount - u, n = Math.max(n, u), s = Math.max(s, h);
                    r[c] = Array(u);
                    for (var d = 0; d < r[c].length; d++)r[c][d] = 255 & t.buffer[d + i];
                    for (i += u, d = l.getErrorCorrectPolynomial(h), u = new o(r[c], d.getLength() - 1).mod(d), a[c] = Array(d.getLength() - 1), d = 0; d < a[c].length; d++)h = d + u.getLength() - a[c].length, a[c][d] = 0 <= h ? u.get(h) : 0
                }
                for (d = c = 0; d < e.length; d++)c += e[d].totalCount;
                for (i = Array(c), d = u = 0; d < n; d++)for (c = 0; c < e.length; c++)d < r[c].length && (i[u++] = r[c][d]);
                for (d = 0; d < s; d++)for (c = 0; c < e.length; c++)d < a[c].length && (i[u++] = a[c][d]);
                return i
            }, a = 4;
            for (var l = {
                PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
                G15: 1335,
                G18: 7973,
                G15_MASK: 21522,
                getBCHTypeInfo: function (t) {
                    for (var e = t << 10; 0 <= l.getBCHDigit(e) - l.getBCHDigit(l.G15);)e ^= l.G15 << l.getBCHDigit(e) - l.getBCHDigit(l.G15);
                    return (t << 10 | e) ^ l.G15_MASK
                },
                getBCHTypeNumber: function (t) {
                    for (var e = t << 12; 0 <= l.getBCHDigit(e) - l.getBCHDigit(l.G18);)e ^= l.G18 << l.getBCHDigit(e) - l.getBCHDigit(l.G18);
                    return t << 12 | e
                },
                getBCHDigit: function (t) {
                    for (var e = 0; 0 != t;)e++, t >>>= 1;
                    return e
                },
                getPatternPosition: function (t) {
                    return l.PATTERN_POSITION_TABLE[t - 1]
                },
                getMask: function (t, e, i) {
                    switch (t) {
                        case 0:
                            return 0 == (e + i) % 2;
                        case 1:
                            return 0 == e % 2;
                        case 2:
                            return 0 == i % 3;
                        case 3:
                            return 0 == (e + i) % 3;
                        case 4:
                            return 0 == (Math.floor(e / 2) + Math.floor(i / 3)) % 2;
                        case 5:
                            return 0 == e * i % 2 + e * i % 3;
                        case 6:
                            return 0 == (e * i % 2 + e * i % 3) % 2;
                        case 7:
                            return 0 == (e * i % 3 + (e + i) % 2) % 2;
                        default:
                            throw Error("bad maskPattern:" + t)
                    }
                },
                getErrorCorrectPolynomial: function (t) {
                    for (var e = new o([1], 0), i = 0; i < t; i++)e = e.multiply(new o([1, c.gexp(i)], 0));
                    return e
                },
                getLengthInBits: function (t, e) {
                    if (1 <= e && 10 > e)switch (t) {
                        case 1:
                            return 10;
                        case 2:
                            return 9;
                        case a:
                        case 8:
                            return 8;
                        default:
                            throw Error("mode:" + t)
                    } else if (27 > e)switch (t) {
                        case 1:
                            return 12;
                        case 2:
                            return 11;
                        case a:
                            return 16;
                        case 8:
                            return 10;
                        default:
                            throw Error("mode:" + t)
                    } else {
                        if (!(41 > e))throw Error("type:" + e);
                        switch (t) {
                            case 1:
                                return 14;
                            case 2:
                                return 13;
                            case a:
                                return 16;
                            case 8:
                                return 12;
                            default:
                                throw Error("mode:" + t)
                        }
                    }
                },
                getLostPoint: function (t) {
                    for (var e = t.getModuleCount(), i = 0, n = 0; n < e; n++)for (var o = 0; o < e; o++) {
                        for (var s = 0, r = t.isDark(n, o), a = -1; 1 >= a; a++)if (!(0 > n + a || e <= n + a))for (var l = -1; 1 >= l; l++)0 > o + l || e <= o + l || 0 == a && 0 == l || r == t.isDark(n + a, o + l) && s++;
                        5 < s && (i += 3 + s - 5)
                    }
                    for (n = 0; n < e - 1; n++)for (o = 0; o < e - 1; o++)s = 0, t.isDark(n, o) && s++, t.isDark(n + 1, o) && s++, t.isDark(n, o + 1) && s++, t.isDark(n + 1, o + 1) && s++, (0 == s || 4 == s) && (i += 3);
                    for (n = 0; n < e; n++)for (o = 0; o < e - 6; o++)t.isDark(n, o) && !t.isDark(n, o + 1) && t.isDark(n, o + 2) && t.isDark(n, o + 3) && t.isDark(n, o + 4) && !t.isDark(n, o + 5) && t.isDark(n, o + 6) && (i += 40);
                    for (o = 0; o < e; o++)for (n = 0; n < e - 6; n++)t.isDark(n, o) && !t.isDark(n + 1, o) && t.isDark(n + 2, o) && t.isDark(n + 3, o) && t.isDark(n + 4, o) && !t.isDark(n + 5, o) && t.isDark(n + 6, o) && (i += 40);
                    for (o = s = 0; o < e; o++)for (n = 0; n < e; n++)t.isDark(n, o) && s++;
                    return t = Math.abs(100 * s / e / e - 50) / 5, i + 10 * t
                }
            }, c = {
                glog: function (t) {
                    if (1 > t)throw Error("glog(" + t + ")");
                    return c.LOG_TABLE[t]
                }, gexp: function (t) {
                    for (; 0 > t;)t += 255;
                    for (; 256 <= t;)t -= 255;
                    return c.EXP_TABLE[t]
                }, EXP_TABLE: Array(256), LOG_TABLE: Array(256)
            }, u = 0; 8 > u; u++)c.EXP_TABLE[u] = 1 << u;
            for (u = 8; 256 > u; u++)c.EXP_TABLE[u] = c.EXP_TABLE[u - 4] ^ c.EXP_TABLE[u - 5] ^ c.EXP_TABLE[u - 6] ^ c.EXP_TABLE[u - 8];
            for (u = 0; 255 > u; u++)c.LOG_TABLE[c.EXP_TABLE[u]] = u;
            return o.prototype = {
                get: function (t) {
                    return this.num[t]
                }, getLength: function () {
                    return this.num.length
                }, multiply: function (t) {
                    for (var e = Array(this.getLength() + t.getLength() - 1), i = 0; i < this.getLength(); i++)for (var n = 0; n < t.getLength(); n++)e[i + n] ^= c.gexp(c.glog(this.get(i)) + c.glog(t.get(n)));
                    return new o(e, 0)
                }, mod: function (t) {
                    if (0 > this.getLength() - t.getLength())return this;
                    for (var e = c.glog(this.get(0)) - c.glog(t.get(0)), i = Array(this.getLength()), n = 0; n < this.getLength(); n++)i[n] = this.get(n);
                    for (n = 0; n < t.getLength(); n++)i[n] ^= c.gexp(c.glog(t.get(n)) + e);
                    return new o(i, 0).mod(t)
                }
            }, s.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], s.getRSBlocks = function (t, e) {
                var i = s.getRsBlockTable(t, e);
                if (void 0 == i)throw Error("bad rs block @ typeNumber:" + t + "/errorCorrectLevel:" + e);
                for (var n = i.length / 3, o = [], r = 0; r < n; r++)for (var a = i[3 * r + 0], l = i[3 * r + 1], c = i[3 * r + 2], u = 0; u < a; u++)o.push(new s(l, c));
                return o
            }, s.getRsBlockTable = function (t, e) {
                switch (e) {
                    case 1:
                        return s.RS_BLOCK_TABLE[4 * (t - 1) + 0];
                    case 0:
                        return s.RS_BLOCK_TABLE[4 * (t - 1) + 1];
                    case 3:
                        return s.RS_BLOCK_TABLE[4 * (t - 1) + 2];
                    case 2:
                        return s.RS_BLOCK_TABLE[4 * (t - 1) + 3]
                }
            }, r.prototype = {
                get: function (t) {
                    return 1 == (this.buffer[Math.floor(t / 8)] >>> 7 - t % 8 & 1)
                }, put: function (t, e) {
                    for (var i = 0; i < e; i++)this.putBit(1 == (t >>> e - i - 1 & 1))
                }, getLengthInBits: function () {
                    return this.length
                }, putBit: function (t) {
                    var e = Math.floor(this.length / 8);
                    this.buffer.length <= e && this.buffer.push(0), t && (this.buffer[e] |= 128 >>> this.length % 8), this.length++
                }
            }, "string" == typeof e && (e = {text: e}), e = t.extend({}, {
                render: "canvas",
                width: 256,
                height: 256,
                typeNumber: -1,
                correctLevel: 2,
                background: "#ffffff",
                foreground: "#000000"
            }, e), this.each(function () {
                var i;
                if ("canvas" == e.render) {
                    i = new n(e.typeNumber, e.correctLevel), i.addData(e.text), i.make();
                    var o = document.createElement("canvas");
                    o.width = e.width, o.height = e.height;
                    for (var s = o.getContext("2d"), r = e.width / i.getModuleCount(), a = e.height / i.getModuleCount(), l = 0; l < i.getModuleCount(); l++)for (var c = 0; c < i.getModuleCount(); c++) {
                        s.fillStyle = i.isDark(l, c) ? e.foreground : e.background;
                        var u = Math.ceil((c + 1) * r) - Math.floor(c * r), h = Math.ceil((l + 1) * r) - Math.floor(l * r);
                        s.fillRect(Math.round(c * r), Math.round(l * a), u, h)
                    }
                } else for (i = new n(e.typeNumber, e.correctLevel), i.addData(e.text), i.make(), o = t("<table></table>").css("width", e.width + "px").css("height", e.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", e.background), s = e.width / i.getModuleCount(), r = e.height / i.getModuleCount(), a = 0; a < i.getModuleCount(); a++)for (l = t("<tr></tr>").css("height", r + "px").appendTo(o), c = 0; c < i.getModuleCount(); c++)t("<td></td>").css("width", s + "px").css("background-color", i.isDark(a, c) ? e.foreground : e.background).appendTo(l);
                i = o, jQuery(i).appendTo(this)
            })
        }
    }(jQuery)
}], [17]);