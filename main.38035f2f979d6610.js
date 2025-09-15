"use strict";
(self.webpackChunkvesly = self.webpackChunkvesly || []).push([
    [792], {
        315: () => {
            function Ai(e, n, t, r, o, i, s) {
                try {
                    var a = e[i](s),
                        l = a.value
                } catch (c) {
                    return void t(c)
                }
                a.done ? n(l) : Promise.resolve(l).then(r, o)
            }
            let Me = null,
                Ta = 1;
            const Sr = Symbol("SIGNAL");

            function z(e) {
                const n = Me;
                return Me = e, n
            }

            function Jg(e) {
                if ((!Oi(e) || e.dirty) && (e.dirty || e.lastCleanEpoch !== Ta)) {
                    if (!e.producerMustRecompute(e) && !Au(e)) return e.dirty = !1, void(e.lastCleanEpoch = Ta);
                    e.producerRecomputeValue(e), e.dirty = !1, e.lastCleanEpoch = Ta
                }
            }

            function Au(e) {
                so(e);
                for (let n = 0; n < e.producerNode.length; n++) {
                    const t = e.producerNode[n],
                        r = e.producerLastReadVersion[n];
                    if (r !== t.version || (Jg(t), r !== t.version)) return !0
                }
                return !1
            }

            function Aa(e, n) {
                if (function am(e) {
                        e.liveConsumerNode ??= [], e.liveConsumerIndexOfThis ??= []
                    }(e), so(e), 1 === e.liveConsumerNode.length)
                    for (let r = 0; r < e.producerNode.length; r++) Aa(e.producerNode[r], e.producerIndexOfThis[r]);
                const t = e.liveConsumerNode.length - 1;
                if (e.liveConsumerNode[n] = e.liveConsumerNode[t], e.liveConsumerIndexOfThis[n] = e.liveConsumerIndexOfThis[t], e.liveConsumerNode.length--, e.liveConsumerIndexOfThis.length--, n < e.liveConsumerNode.length) {
                    const r = e.liveConsumerIndexOfThis[n],
                        o = e.liveConsumerNode[n];
                    so(o), o.producerIndexOfThis[r] = n
                }
            }

            function Oi(e) {
                return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0
            }

            function so(e) {
                e.producerNode ??= [], e.producerIndexOfThis ??= [], e.producerLastReadVersion ??= []
            }
            let lm = null;

            function ye(e) {
                return "function" == typeof e
            }

            function Ou(e) {
                const t = e(r => {
                    Error.call(r), r.stack = (new Error).stack
                });
                return t.prototype = Object.create(Error.prototype), t.prototype.constructor = t, t
            }
            const Ru = Ou(e => function(t) {
                e(this), this.message = t ? `${t.length} errors occurred during unsubscription:\n${t.map((r,o)=>`${o+1}) ${r.toString()}`).join("\n  ")}` : "", this.name = "UnsubscriptionError", this.errors = t
            });

            function Na(e, n) {
                if (e) {
                    const t = e.indexOf(n);
                    0 <= t && e.splice(t, 1)
                }
            }
            class st {
                constructor(n) {
                    this.initialTeardown = n, this.closed = !1, this._parentage = null, this._finalizers = null
                }
                unsubscribe() {
                    let n;
                    if (!this.closed) {
                        this.closed = !0;
                        const {
                            _parentage: t
                        } = this;
                        if (t)
                            if (this._parentage = null, Array.isArray(t))
                                for (const i of t) i.remove(this);
                            else t.remove(this);
                        const {
                            initialTeardown: r
                        } = this;
                        if (ye(r)) try {
                            r()
                        } catch (i) {
                            n = i instanceof Ru ? i.errors : [i]
                        }
                        const {
                            _finalizers: o
                        } = this;
                        if (o) {
                            this._finalizers = null;
                            for (const i of o) try {
                                hm(i)
                            } catch (s) {
                                n = n ?? [], s instanceof Ru ? n = [...n, ...s.errors] : n.push(s)
                            }
                        }
                        if (n) throw new Ru(n)
                    }
                }
                add(n) {
                    var t;
                    if (n && n !== this)
                        if (this.closed) hm(n);
                        else {
                            if (n instanceof st) {
                                if (n.closed || n._hasParent(this)) return;
                                n._addParent(this)
                            }(this._finalizers = null !== (t = this._finalizers) && void 0 !== t ? t : []).push(n)
                        }
                }
                _hasParent(n) {
                    const {
                        _parentage: t
                    } = this;
                    return t === n || Array.isArray(t) && t.includes(n)
                }
                _addParent(n) {
                    const {
                        _parentage: t
                    } = this;
                    this._parentage = Array.isArray(t) ? (t.push(n), t) : t ? [t, n] : n
                }
                _removeParent(n) {
                    const {
                        _parentage: t
                    } = this;
                    t === n ? this._parentage = null : Array.isArray(t) && Na(t, n)
                }
                remove(n) {
                    const {
                        _finalizers: t
                    } = this;
                    t && Na(t, n), n instanceof st && n._removeParent(this)
                }
            }
            st.EMPTY = (() => {
                const e = new st;
                return e.closed = !0, e
            })();
            const dm = st.EMPTY;

            function fm(e) {
                return e instanceof st || e && "closed" in e && ye(e.remove) && ye(e.add) && ye(e.unsubscribe)
            }

            function hm(e) {
                ye(e) ? e() : e.unsubscribe()
            }
            const Tr = {
                    onUnhandledError: null,
                    onStoppedNotification: null,
                    Promise: void 0,
                    useDeprecatedSynchronousErrorHandling: !1,
                    useDeprecatedNextContext: !1
                },
                Oa = {
                    setTimeout(e, n, ...t) {
                        const {
                            delegate: r
                        } = Oa;
                        return r?.setTimeout ? r.setTimeout(e, n, ...t) : setTimeout(e, n, ...t)
                    },
                    clearTimeout(e) {
                        const {
                            delegate: n
                        } = Oa;
                        return (n?.clearTimeout || clearTimeout)(e)
                    },
                    delegate: void 0
                };

            function pm(e) {
                Oa.setTimeout(() => {
                    const {
                        onUnhandledError: n
                    } = Tr;
                    if (!n) throw e;
                    n(e)
                })
            }

            function Pu() {}
            const Tx = ku("C", void 0, void 0);

            function ku(e, n, t) {
                return {
                    kind: e,
                    value: n,
                    error: t
                }
            }
            let Ar = null;

            function Ra(e) {
                if (Tr.useDeprecatedSynchronousErrorHandling) {
                    const n = !Ar;
                    if (n && (Ar = {
                            errorThrown: !1,
                            error: null
                        }), e(), n) {
                        const {
                            errorThrown: t,
                            error: r
                        } = Ar;
                        if (Ar = null, t) throw r
                    }
                } else e()
            }
            class Fu extends st {
                constructor(n) {
                    super(), this.isStopped = !1, n ? (this.destination = n, fm(n) && n.add(this)) : this.destination = Fx
                }
                static create(n, t, r) {
                    return new Ri(n, t, r)
                }
                next(n) {
                    this.isStopped ? Vu(function Nx(e) {
                        return ku("N", e, void 0)
                    }(n), this) : this._next(n)
                }
                error(n) {
                    this.isStopped ? Vu(function Ax(e) {
                        return ku("E", void 0, e)
                    }(n), this) : (this.isStopped = !0, this._error(n))
                }
                complete() {
                    this.isStopped ? Vu(Tx, this) : (this.isStopped = !0, this._complete())
                }
                unsubscribe() {
                    this.closed || (this.isStopped = !0, super.unsubscribe(), this.destination = null)
                }
                _next(n) {
                    this.destination.next(n)
                }
                _error(n) {
                    try {
                        this.destination.error(n)
                    } finally {
                        this.unsubscribe()
                    }
                }
                _complete() {
                    try {
                        this.destination.complete()
                    } finally {
                        this.unsubscribe()
                    }
                }
            }
            const Rx = Function.prototype.bind;

            function Lu(e, n) {
                return Rx.call(e, n)
            }
            class Px {
                constructor(n) {
                    this.partialObserver = n
                }
                next(n) {
                    const {
                        partialObserver: t
                    } = this;
                    if (t.next) try {
                        t.next(n)
                    } catch (r) {
                        Pa(r)
                    }
                }
                error(n) {
                    const {
                        partialObserver: t
                    } = this;
                    if (t.error) try {
                        t.error(n)
                    } catch (r) {
                        Pa(r)
                    } else Pa(n)
                }
                complete() {
                    const {
                        partialObserver: n
                    } = this;
                    if (n.complete) try {
                        n.complete()
                    } catch (t) {
                        Pa(t)
                    }
                }
            }
            class Ri extends Fu {
                constructor(n, t, r) {
                    let o;
                    if (super(), ye(n) || !n) o = {
                        next: n ?? void 0,
                        error: t ?? void 0,
                        complete: r ?? void 0
                    };
                    else {
                        let i;
                        this && Tr.useDeprecatedNextContext ? (i = Object.create(n), i.unsubscribe = () => this.unsubscribe(), o = {
                            next: n.next && Lu(n.next, i),
                            error: n.error && Lu(n.error, i),
                            complete: n.complete && Lu(n.complete, i)
                        }) : o = n
                    }
                    this.destination = new Px(o)
                }
            }

            function Pa(e) {
                Tr.useDeprecatedSynchronousErrorHandling ? function Ox(e) {
                    Tr.useDeprecatedSynchronousErrorHandling && Ar && (Ar.errorThrown = !0, Ar.error = e)
                }(e) : pm(e)
            }

            function Vu(e, n) {
                const {
                    onStoppedNotification: t
                } = Tr;
                t && Oa.setTimeout(() => t(e, n))
            }
            const Fx = {
                    closed: !0,
                    next: Pu,
                    error: function kx(e) {
                        throw e
                    },
                    complete: Pu
                },
                ju = "function" == typeof Symbol && Symbol.observable || "@@observable";

            function tr(e) {
                return e
            }

            function gm(e) {
                return 0 === e.length ? tr : 1 === e.length ? e[0] : function(t) {
                    return e.reduce((r, o) => o(r), t)
                }
            }
            let Ie = (() => {
                class e {
                    constructor(t) {
                        t && (this._subscribe = t)
                    }
                    lift(t) {
                        const r = new e;
                        return r.source = this, r.operator = t, r
                    }
                    subscribe(t, r, o) {
                        const i = function jx(e) {
                            return e && e instanceof Fu || function Vx(e) {
                                return e && ye(e.next) && ye(e.error) && ye(e.complete)
                            }(e) && fm(e)
                        }(t) ? t : new Ri(t, r, o);
                        return Ra(() => {
                            const {
                                operator: s,
                                source: a
                            } = this;
                            i.add(s ? s.call(i, a) : a ? this._subscribe(i) : this._trySubscribe(i))
                        }), i
                    }
                    _trySubscribe(t) {
                        try {
                            return this._subscribe(t)
                        } catch (r) {
                            t.error(r)
                        }
                    }
                    forEach(t, r) {
                        return new(r = mm(r))((o, i) => {
                            const s = new Ri({
                                next: a => {
                                    try {
                                        t(a)
                                    } catch (l) {
                                        i(l), s.unsubscribe()
                                    }
                                },
                                error: i,
                                complete: o
                            });
                            this.subscribe(s)
                        })
                    }
                    _subscribe(t) {
                        var r;
                        return null === (r = this.source) || void 0 === r ? void 0 : r.subscribe(t)
                    } [ju]() {
                        return this
                    }
                    pipe(...t) {
                        return gm(t)(this)
                    }
                    toPromise(t) {
                        return new(t = mm(t))((r, o) => {
                            let i;
                            this.subscribe(s => i = s, s => o(s), () => r(i))
                        })
                    }
                }
                return e.create = n => new e(n), e
            })();

            function mm(e) {
                var n;
                return null !== (n = e ?? Tr.Promise) && void 0 !== n ? n : Promise
            }
            const $x = Ou(e => function() {
                e(this), this.name = "ObjectUnsubscribedError", this.message = "object unsubscribed"
            });
            let ze = (() => {
                class e extends Ie {
                    constructor() {
                        super(), this.closed = !1, this.currentObservers = null, this.observers = [], this.isStopped = !1, this.hasError = !1, this.thrownError = null
                    }
                    lift(t) {
                        const r = new ym(this, this);
                        return r.operator = t, r
                    }
                    _throwIfClosed() {
                        if (this.closed) throw new $x
                    }
                    next(t) {
                        Ra(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.currentObservers || (this.currentObservers = Array.from(this.observers));
                                for (const r of this.currentObservers) r.next(t)
                            }
                        })
                    }
                    error(t) {
                        Ra(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.hasError = this.isStopped = !0, this.thrownError = t;
                                const {
                                    observers: r
                                } = this;
                                for (; r.length;) r.shift().error(t)
                            }
                        })
                    }
                    complete() {
                        Ra(() => {
                            if (this._throwIfClosed(), !this.isStopped) {
                                this.isStopped = !0;
                                const {
                                    observers: t
                                } = this;
                                for (; t.length;) t.shift().complete()
                            }
                        })
                    }
                    unsubscribe() {
                        this.isStopped = this.closed = !0, this.observers = this.currentObservers = null
                    }
                    get observed() {
                        var t;
                        return (null === (t = this.observers) || void 0 === t ? void 0 : t.length) > 0
                    }
                    _trySubscribe(t) {
                        return this._throwIfClosed(), super._trySubscribe(t)
                    }
                    _subscribe(t) {
                        return this._throwIfClosed(), this._checkFinalizedStatuses(t), this._innerSubscribe(t)
                    }
                    _innerSubscribe(t) {
                        const {
                            hasError: r,
                            isStopped: o,
                            observers: i
                        } = this;
                        return r || o ? dm : (this.currentObservers = null, i.push(t), new st(() => {
                            this.currentObservers = null, Na(i, t)
                        }))
                    }
                    _checkFinalizedStatuses(t) {
                        const {
                            hasError: r,
                            thrownError: o,
                            isStopped: i
                        } = this;
                        r ? t.error(o) : i && t.complete()
                    }
                    asObservable() {
                        const t = new Ie;
                        return t.source = this, t
                    }
                }
                return e.create = (n, t) => new ym(n, t), e
            })();
            class ym extends ze {
                constructor(n, t) {
                    super(), this.destination = n, this.source = t
                }
                next(n) {
                    var t, r;
                    null === (r = null === (t = this.destination) || void 0 === t ? void 0 : t.next) || void 0 === r || r.call(t, n)
                }
                error(n) {
                    var t, r;
                    null === (r = null === (t = this.destination) || void 0 === t ? void 0 : t.error) || void 0 === r || r.call(t, n)
                }
                complete() {
                    var n, t;
                    null === (t = null === (n = this.destination) || void 0 === n ? void 0 : n.complete) || void 0 === t || t.call(n)
                }
                _subscribe(n) {
                    var t, r;
                    return null !== (r = null === (t = this.source) || void 0 === t ? void 0 : t.subscribe(n)) && void 0 !== r ? r : dm
                }
            }
            class Ht extends ze {
                constructor(n) {
                    super(), this._value = n
                }
                get value() {
                    return this.getValue()
                }
                _subscribe(n) {
                    const t = super._subscribe(n);
                    return !t.closed && n.next(this._value), t
                }
                getValue() {
                    const {
                        hasError: n,
                        thrownError: t,
                        _value: r
                    } = this;
                    if (n) throw t;
                    return this._throwIfClosed(), r
                }
                next(n) {
                    super.next(this._value = n)
                }
            }

            function vm(e) {
                return ye(e?.lift)
            }

            function Le(e) {
                return n => {
                    if (vm(n)) return n.lift(function(t) {
                        try {
                            return e(t, this)
                        } catch (r) {
                            this.error(r)
                        }
                    });
                    throw new TypeError("Unable to lift unknown Observable type")
                }
            }

            function Oe(e, n, t, r, o) {
                return new Ux(e, n, t, r, o)
            }
            class Ux extends Fu {
                constructor(n, t, r, o, i, s) {
                    super(n), this.onFinalize = i, this.shouldUnsubscribe = s, this._next = t ? function(a) {
                        try {
                            t(a)
                        } catch (l) {
                            n.error(l)
                        }
                    } : super._next, this._error = o ? function(a) {
                        try {
                            o(a)
                        } catch (l) {
                            n.error(l)
                        } finally {
                            this.unsubscribe()
                        }
                    } : super._error, this._complete = r ? function() {
                        try {
                            r()
                        } catch (a) {
                            n.error(a)
                        } finally {
                            this.unsubscribe()
                        }
                    } : super._complete
                }
                unsubscribe() {
                    var n;
                    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
                        const {
                            closed: t
                        } = this;
                        super.unsubscribe(), !t && (null === (n = this.onFinalize) || void 0 === n || n.call(this))
                    }
                }
            }

            function Z(e, n) {
                return Le((t, r) => {
                    let o = 0;
                    t.subscribe(Oe(r, i => {
                        r.next(e.call(n, i, o++))
                    }))
                })
            }
            const _m = "https://g.co/ng/security#xss";
            class C extends Error {
                constructor(n, t) {
                    super(function ao(e, n) {
                        return `NG0${Math.abs(e)}${n?": "+n:""}`
                    }(n, t)), this.code = n
                }
            }

            function kn(e) {
                return {
                    toString: e
                }.toString()
            }
            const co = "__parameters__";

            function fo(e, n, t) {
                return kn(() => {
                    const r = function $u(e) {
                        return function(...t) {
                            if (e) {
                                const r = e(...t);
                                for (const o in r) this[o] = r[o]
                            }
                        }
                    }(n);

                    function o(...i) {
                        if (this instanceof o) return r.apply(this, i), this;
                        const s = new o(...i);
                        return a.annotation = s, a;

                        function a(l, c, u) {
                            const d = l.hasOwnProperty(co) ? l[co] : Object.defineProperty(l, co, {
                                value: []
                            })[co];
                            for (; d.length <= u;) d.push(null);
                            return (d[u] = d[u] || []).push(s), l
                        }
                    }
                    return t && (o.prototype = Object.create(t.prototype)), o.prototype.ngMetadataName = e, o.annotationCls = o, o
                })
            }
            const re = globalThis;

            function oe(e) {
                for (let n in e)
                    if (e[n] === oe) return n;
                throw Error("Could not find renamed property on target object.")
            }

            function Bx(e, n) {
                for (const t in n) n.hasOwnProperty(t) && !e.hasOwnProperty(t) && (e[t] = n[t])
            }

            function Ve(e) {
                if ("string" == typeof e) return e;
                if (Array.isArray(e)) return "[" + e.map(Ve).join(", ") + "]";
                if (null == e) return "" + e;
                if (e.overriddenName) return `${e.overriddenName}`;
                if (e.name) return `${e.name}`;
                const n = e.toString();
                if (null == n) return "" + n;
                const t = n.indexOf("\n");
                return -1 === t ? n : n.substring(0, t)
            }

            function Uu(e, n) {
                return null == e || "" === e ? null === n ? "" : n : null == n || "" === n ? e : e + " " + n
            }
            const Hx = oe({
                __forward_ref__: oe
            });

            function de(e) {
                return e.__forward_ref__ = de, e.toString = function() {
                    return Ve(this())
                }, e
            }

            function N(e) {
                return Fa(e) ? e() : e
            }

            function Fa(e) {
                return "function" == typeof e && e.hasOwnProperty(Hx) && e.__forward_ref__ === de
            }

            function I(e) {
                return {
                    token: e.token,
                    providedIn: e.providedIn || null,
                    factory: e.factory,
                    value: void 0
                }
            }

            function xt(e) {
                return {
                    providers: e.providers || [],
                    imports: e.imports || []
                }
            }

            function La(e) {
                return bm(e, ja) || bm(e, Em)
            }

            function bm(e, n) {
                return e.hasOwnProperty(n) ? e[n] : null
            }

            function Va(e) {
                return e && (e.hasOwnProperty(Bu) || e.hasOwnProperty(Qx)) ? e[Bu] : null
            }
            const ja = oe({
                    \u0275prov: oe
                }),
                Bu = oe({
                    \u0275inj: oe
                }),
                Em = oe({
                    ngInjectableDef: oe
                }),
                Qx = oe({
                    ngInjectorDef: oe
                });
            class M {
                constructor(n, t) {
                    this._desc = n, this.ngMetadataName = "InjectionToken", this.\u0275prov = void 0, "number" == typeof t ? this.__NG_ELEMENT_ID__ = t : void 0 !== t && (this.\u0275prov = I({
                        token: this,
                        providedIn: t.providedIn || "root",
                        factory: t.factory
                    }))
                }
                get multi() {
                    return this
                }
                toString() {
                    return `InjectionToken ${this._desc}`
                }
            }

            function Wu(e) {
                return e && !!e.\u0275providers
            }
            const Pi = oe({
                    \u0275cmp: oe
                }),
                Zu = oe({
                    \u0275dir: oe
                }),
                Qu = oe({
                    \u0275pipe: oe
                }),
                Im = oe({
                    \u0275mod: oe
                }),
                Fn = oe({
                    \u0275fac: oe
                }),
                ki = oe({
                    __NG_ELEMENT_ID__: oe
                }),
                xm = oe({
                    __NG_ENV_ID__: oe
                });

            function V(e) {
                return "string" == typeof e ? e : null == e ? "" : String(e)
            }

            function Yu(e, n) {
                throw new C(-201, !1)
            }
            var q = function(e) {
                return e[e.Default = 0] = "Default", e[e.Host = 1] = "Host", e[e.Self = 2] = "Self", e[e.SkipSelf = 4] = "SkipSelf", e[e.Optional = 8] = "Optional", e
            }(q || {});
            let Xu;

            function Sm() {
                return Xu
            }

            function mt(e) {
                const n = Xu;
                return Xu = e, n
            }

            function Tm(e, n, t) {
                const r = La(e);
                return r && "root" == r.providedIn ? void 0 === r.value ? r.value = r.factory() : r.value : t & q.Optional ? null : void 0 !== n ? n : void Yu()
            }
            const Fi = {},
                Ku = "__NG_DI_FLAG__",
                $a = "ngTempTokenPath",
                tS = /\n/gm,
                Am = "__source";
            let ho;

            function rr(e) {
                const n = ho;
                return ho = e, n
            }

            function oS(e, n = q.Default) {
                if (void 0 === ho) throw new C(-203, !1);
                return null === ho ? Tm(e, void 0, n) : ho.get(e, n & q.Optional ? null : void 0, n)
            }

            function x(e, n = q.Default) {
                return (Sm() || oS)(N(e), n)
            }

            function w(e, n = q.Default) {
                return x(e, Ua(n))
            }

            function Ua(e) {
                return typeof e > "u" || "number" == typeof e ? e : (e.optional && 8) | (e.host && 1) | (e.self && 2) | (e.skipSelf && 4)
            }

            function Ju(e) {
                const n = [];
                for (let t = 0; t < e.length; t++) {
                    const r = N(e[t]);
                    if (Array.isArray(r)) {
                        if (0 === r.length) throw new C(900, !1);
                        let o, i = q.Default;
                        for (let s = 0; s < r.length; s++) {
                            const a = r[s],
                                l = iS(a);
                            "number" == typeof l ? -1 === l ? o = a.token : i |= l : o = a
                        }
                        n.push(x(o, i))
                    } else n.push(x(r))
                }
                return n
            }

            function Li(e, n) {
                return e[Ku] = n, e.prototype[Ku] = n, e
            }

            function iS(e) {
                return e[Ku]
            }
            const Ba = Li(fo("Optional"), 8),
                Ha = Li(fo("SkipSelf"), 4);

            function Nr(e, n) {
                return e.hasOwnProperty(Fn) ? e[Fn] : null
            }

            function po(e, n) {
                e.forEach(t => Array.isArray(t) ? po(t, n) : n(t))
            }

            function Om(e, n, t) {
                n >= e.length ? e.push(t) : e.splice(n, 0, t)
            }

            function za(e, n) {
                return n >= e.length - 1 ? e.pop() : e.splice(n, 1)[0]
            }

            function St(e, n, t) {
                let r = go(e, n);
                return r >= 0 ? e[1 | r] = t : (r = ~r, function Rm(e, n, t, r) {
                    let o = e.length;
                    if (o == n) e.push(t, r);
                    else if (1 === o) e.push(r, e[0]), e[0] = t;
                    else {
                        for (o--, e.push(e[o - 1], e[o]); o > n;) e[o] = e[o - 2], o--;
                        e[n] = t, e[n + 1] = r
                    }
                }(e, r, n, t)), r
            }

            function td(e, n) {
                const t = go(e, n);
                if (t >= 0) return e[1 | t]
            }

            function go(e, n) {
                return function Pm(e, n, t) {
                    let r = 0,
                        o = e.length >> t;
                    for (; o !== r;) {
                        const i = r + (o - r >> 1),
                            s = e[i << t];
                        if (n === s) return i << t;
                        s > n ? o = i : r = i + 1
                    }
                    return ~(o << t)
                }(e, n, 1)
            }
            const un = {},
                Y = [],
                Or = new M(""),
                km = new M("", -1),
                nd = new M("");
            class qa {
                get(n, t = Fi) {
                    if (t === Fi) {
                        const r = new Error(`NullInjectorError: No provider for ${Ve(n)}!`);
                        throw r.name = "NullInjectorError", r
                    }
                    return t
                }
            }
            var Wa = function(e) {
                    return e[e.OnPush = 0] = "OnPush", e[e.Default = 1] = "Default", e
                }(Wa || {}),
                Yt = function(e) {
                    return e[e.Emulated = 0] = "Emulated", e[e.None = 2] = "None", e[e.ShadowDom = 3] = "ShadowDom", e
                }(Yt || {}),
                ve = function(e) {
                    return e[e.None = 0] = "None", e[e.SignalBased = 1] = "SignalBased", e[e.HasDecoratorInputTransform = 2] = "HasDecoratorInputTransform", e
                }(ve || {});

            function fS(e, n, t) {
                let r = e.length;
                for (;;) {
                    const o = e.indexOf(n, t);
                    if (-1 === o) return o;
                    if (0 === o || e.charCodeAt(o - 1) <= 32) {
                        const i = n.length;
                        if (o + i === r || e.charCodeAt(o + i) <= 32) return o
                    }
                    t = o + 1
                }
            }

            function rd(e, n, t) {
                let r = 0;
                for (; r < t.length;) {
                    const o = t[r];
                    if ("number" == typeof o) {
                        if (0 !== o) break;
                        r++;
                        const i = t[r++],
                            s = t[r++],
                            a = t[r++];
                        e.setAttribute(n, s, a, i)
                    } else {
                        const i = o,
                            s = t[++r];
                        Lm(i) ? e.setProperty(n, i, s) : e.setAttribute(n, i, s), r++
                    }
                }
                return r
            }

            function Fm(e) {
                return 3 === e || 4 === e || 6 === e
            }

            function Lm(e) {
                return 64 === e.charCodeAt(0)
            }

            function Vi(e, n) {
                if (null !== n && 0 !== n.length)
                    if (null === e || 0 === e.length) e = n.slice();
                    else {
                        let t = -1;
                        for (let r = 0; r < n.length; r++) {
                            const o = n[r];
                            "number" == typeof o ? t = o : 0 === t || Vm(e, t, o, null, -1 === t || 2 === t ? n[++r] : null)
                        }
                    } return e
            }

            function Vm(e, n, t, r, o) {
                let i = 0,
                    s = e.length;
                if (-1 === n) s = -1;
                else
                    for (; i < e.length;) {
                        const a = e[i++];
                        if ("number" == typeof a) {
                            if (a === n) {
                                s = -1;
                                break
                            }
                            if (a > n) {
                                s = i - 1;
                                break
                            }
                        }
                    }
                for (; i < e.length;) {
                    const a = e[i];
                    if ("number" == typeof a) break;
                    if (a === t) {
                        if (null === r) return void(null !== o && (e[i + 1] = o));
                        if (r === e[i + 1]) return void(e[i + 2] = o)
                    }
                    i++, null !== r && i++, null !== o && i++
                } - 1 !== s && (e.splice(s, 0, n), i = s + 1), e.splice(i++, 0, t), null !== r && e.splice(i++, 0, r), null !== o && e.splice(i++, 0, o)
            }
            const jm = "ng-template";

            function hS(e, n, t, r) {
                let o = 0;
                if (r) {
                    for (; o < n.length && "string" == typeof n[o]; o += 2)
                        if ("class" === n[o] && -1 !== fS(n[o + 1].toLowerCase(), t, 0)) return !0
                } else if (od(e)) return !1;
                if (o = n.indexOf(1, o), o > -1) {
                    let i;
                    for (; ++o < n.length && "string" == typeof(i = n[o]);)
                        if (i.toLowerCase() === t) return !0
                }
                return !1
            }

            function od(e) {
                return 4 === e.type && e.value !== jm
            }

            function pS(e, n, t) {
                return n === (4 !== e.type || t ? e.value : jm)
            }

            function gS(e, n, t) {
                let r = 4;
                const o = e.attrs,
                    i = null !== o ? function vS(e) {
                        for (let n = 0; n < e.length; n++)
                            if (Fm(e[n])) return n;
                        return e.length
                    }(o) : 0;
                let s = !1;
                for (let a = 0; a < n.length; a++) {
                    const l = n[a];
                    if ("number" != typeof l) {
                        if (!s)
                            if (4 & r) {
                                if (r = 2 | 1 & r, "" !== l && !pS(e, l, t) || "" === l && 1 === n.length) {
                                    if (Xt(r)) return !1;
                                    s = !0
                                }
                            } else if (8 & r) {
                            if (null === o || !hS(e, o, l, t)) {
                                if (Xt(r)) return !1;
                                s = !0
                            }
                        } else {
                            const c = n[++a],
                                u = mS(l, o, od(e), t);
                            if (-1 === u) {
                                if (Xt(r)) return !1;
                                s = !0;
                                continue
                            }
                            if ("" !== c) {
                                let d;
                                if (d = u > i ? "" : o[u + 1].toLowerCase(), 2 & r && c !== d) {
                                    if (Xt(r)) return !1;
                                    s = !0
                                }
                            }
                        }
                    } else {
                        if (!s && !Xt(r) && !Xt(l)) return !1;
                        if (s && Xt(l)) continue;
                        s = !1, r = l | 1 & r
                    }
                }
                return Xt(r) || s
            }

            function Xt(e) {
                return !(1 & e)
            }

            function mS(e, n, t, r) {
                if (null === n) return -1;
                let o = 0;
                if (r || !t) {
                    let i = !1;
                    for (; o < n.length;) {
                        const s = n[o];
                        if (s === e) return o;
                        if (3 === s || 6 === s) i = !0;
                        else {
                            if (1 === s || 2 === s) {
                                let a = n[++o];
                                for (;
                                    "string" == typeof a;) a = n[++o];
                                continue
                            }
                            if (4 === s) break;
                            if (0 === s) {
                                o += 4;
                                continue
                            }
                        }
                        o += i ? 1 : 2
                    }
                    return -1
                }
                return function _S(e, n) {
                    let t = e.indexOf(4);
                    if (t > -1)
                        for (t++; t < e.length;) {
                            const r = e[t];
                            if ("number" == typeof r) return -1;
                            if (r === n) return t;
                            t++
                        }
                    return -1
                }(n, e)
            }

            function $m(e, n, t = !1) {
                for (let r = 0; r < n.length; r++)
                    if (gS(e, n[r], t)) return !0;
                return !1
            }

            function CS(e, n) {
                e: for (let t = 0; t < n.length; t++) {
                    const r = n[t];
                    if (e.length === r.length) {
                        for (let o = 0; o < e.length; o++)
                            if (e[o] !== r[o]) continue e;
                        return !0
                    }
                }
                return !1
            }

            function Um(e, n) {
                return e ? ":not(" + n.trim() + ")" : n
            }

            function DS(e) {
                let n = e[0],
                    t = 1,
                    r = 2,
                    o = "",
                    i = !1;
                for (; t < e.length;) {
                    let s = e[t];
                    if ("string" == typeof s)
                        if (2 & r) {
                            const a = e[++t];
                            o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]"
                        } else 8 & r ? o += "." + s : 4 & r && (o += " " + s);
                    else "" !== o && !Xt(s) && (n += Um(i, o), o = ""), r = s, i = i || !Xt(r);
                    t++
                }
                return "" !== o && (n += Um(i, o)), n
            }

            function Ln(e) {
                return kn(() => {
                    const n = Hm(e),
                        t = {
                            ...n,
                            decls: e.decls,
                            vars: e.vars,
                            template: e.template,
                            consts: e.consts || null,
                            ngContentSelectors: e.ngContentSelectors,
                            onPush: e.changeDetection === Wa.OnPush,
                            directiveDefs: null,
                            pipeDefs: null,
                            dependencies: n.standalone && e.dependencies || null,
                            getStandaloneInjector: null,
                            signals: e.signals ?? !1,
                            data: e.data || {},
                            encapsulation: e.encapsulation || Yt.Emulated,
                            styles: e.styles || Y,
                            _: null,
                            schemas: e.schemas || null,
                            tView: null,
                            id: ""
                        };
                    zm(t);
                    const r = e.dependencies;
                    return t.directiveDefs = Za(r, !1), t.pipeDefs = Za(r, !0), t.id = function xS(e) {
                        let n = 0;
                        const t = [e.selectors, e.ngContentSelectors, e.hostVars, e.hostAttrs, e.consts, e.vars, e.decls, e.encapsulation, e.standalone, e.signals, e.exportAs, JSON.stringify(e.inputs), JSON.stringify(e.outputs), Object.getOwnPropertyNames(e.type.prototype), !!e.contentQueries, !!e.viewQuery].join("|");
                        for (const o of t) n = Math.imul(31, n) + o.charCodeAt(0) | 0;
                        return n += 2147483648, "c" + n
                    }(t), t
                })
            }

            function ES(e) {
                return G(e) || je(e)
            }

            function MS(e) {
                return null !== e
            }

            function zt(e) {
                return kn(() => ({
                    type: e.type,
                    bootstrap: e.bootstrap || Y,
                    declarations: e.declarations || Y,
                    imports: e.imports || Y,
                    exports: e.exports || Y,
                    transitiveCompileScopes: null,
                    schemas: e.schemas || null,
                    id: e.id || null
                }))
            }

            function Bm(e, n) {
                if (null == e) return un;
                const t = {};
                for (const r in e)
                    if (e.hasOwnProperty(r)) {
                        const o = e[r];
                        let i, s, a = ve.None;
                        Array.isArray(o) ? (a = o[0], i = o[1], s = o[2] ?? i) : (i = o, s = o), n ? (t[i] = a !== ve.None ? [r, a] : r, n[i] = s) : t[i] = r
                    } return t
            }

            function L(e) {
                return kn(() => {
                    const n = Hm(e);
                    return zm(n), n
                })
            }

            function Ye(e) {
                return {
                    type: e.type,
                    name: e.name,
                    factory: null,
                    pure: !1 !== e.pure,
                    standalone: !0 === e.standalone,
                    onDestroy: e.type.prototype.ngOnDestroy || null
                }
            }

            function G(e) {
                return e[Pi] || null
            }

            function je(e) {
                return e[Zu] || null
            }

            function Ze(e) {
                return e[Qu] || null
            }

            function Xe(e, n) {
                const t = e[Im] || null;
                if (!t && !0 === n) throw new Error(`Type ${Ve(e)} does not have '\u0275mod' property.`);
                return t
            }

            function Hm(e) {
                const n = {};
                return {
                    type: e.type,
                    providersResolver: null,
                    factory: null,
                    hostBindings: e.hostBindings || null,
                    hostVars: e.hostVars || 0,
                    hostAttrs: e.hostAttrs || null,
                    contentQueries: e.contentQueries || null,
                    declaredInputs: n,
                    inputTransforms: null,
                    inputConfig: e.inputs || un,
                    exportAs: e.exportAs || null,
                    standalone: !0 === e.standalone,
                    signals: !0 === e.signals,
                    selectors: e.selectors || Y,
                    viewQuery: e.viewQuery || null,
                    features: e.features || null,
                    setInput: null,
                    findHostDirectiveDefs: null,
                    hostDirectives: null,
                    inputs: Bm(e.inputs, n),
                    outputs: Bm(e.outputs),
                    debugInfo: null
                }
            }

            function zm(e) {
                e.features?.forEach(n => n(e))
            }

            function Za(e, n) {
                if (!e) return null;
                const t = n ? Ze : ES;
                return () => ("function" == typeof e ? e() : e).map(r => t(r)).filter(MS)
            }

            function SS(...e) {
                return {
                    \u0275providers: id(0, e),
                    \u0275fromNgModule: !0
                }
            }

            function id(e, ...n) {
                const t = [],
                    r = new Set;
                let o;
                const i = s => {
                    t.push(s)
                };
                return po(n, s => {
                    const a = s;
                    Qa(a, i, [], r) && (o ||= [], o.push(a))
                }), void 0 !== o && Gm(o, i), t
            }

            function Gm(e, n) {
                for (let t = 0; t < e.length; t++) {
                    const {
                        ngModule: r,
                        providers: o
                    } = e[t];
                    sd(o, i => {
                        n(i, r)
                    })
                }
            }

            function Qa(e, n, t, r) {
                if (!(e = N(e))) return !1;
                let o = null,
                    i = Va(e);
                const s = !i && G(e);
                if (i || s) {
                    if (s && !s.standalone) return !1;
                    o = e
                } else {
                    const l = e.ngModule;
                    if (i = Va(l), !i) return !1;
                    o = l
                }
                const a = r.has(o);
                if (s) {
                    if (a) return !1;
                    if (r.add(o), s.dependencies) {
                        const l = "function" == typeof s.dependencies ? s.dependencies() : s.dependencies;
                        for (const c of l) Qa(c, n, t, r)
                    }
                } else {
                    if (!i) return !1;
                    {
                        if (null != i.imports && !a) {
                            let c;
                            r.add(o);
                            try {
                                po(i.imports, u => {
                                    Qa(u, n, t, r) && (c ||= [], c.push(u))
                                })
                            } finally {}
                            void 0 !== c && Gm(c, n)
                        }
                        if (!a) {
                            const c = Nr(o) || (() => new o);
                            n({
                                provide: o,
                                useFactory: c,
                                deps: Y
                            }, o), n({
                                provide: nd,
                                useValue: o,
                                multi: !0
                            }, o), n({
                                provide: Or,
                                useValue: () => x(o),
                                multi: !0
                            }, o)
                        }
                        const l = i.providers;
                        if (null != l && !a) {
                            const c = e;
                            sd(l, u => {
                                n(u, c)
                            })
                        }
                    }
                }
                return o !== e && void 0 !== e.providers
            }

            function sd(e, n) {
                for (let t of e) Wu(t) && (t = t.\u0275providers), Array.isArray(t) ? sd(t, n) : n(t)
            }
            const TS = oe({
                provide: String,
                useValue: oe
            });

            function ad(e) {
                return null !== e && "object" == typeof e && TS in e
            }

            function Rr(e) {
                return "function" == typeof e
            }
            const ld = new M(""),
                Ya = {},
                NS = {};
            let cd;

            function Xa() {
                return void 0 === cd && (cd = new qa), cd
            }
            class vt {}
            class mo extends vt {
                get destroyed() {
                    return this._destroyed
                }
                constructor(n, t, r, o) {
                    super(), this.parent = t, this.source = r, this.scopes = o, this.records = new Map, this._ngOnDestroyHooks = new Set, this._onDestroyHooks = [], this._destroyed = !1, dd(n, s => this.processProvider(s)), this.records.set(km, yo(void 0, this)), o.has("environment") && this.records.set(vt, yo(void 0, this));
                    const i = this.records.get(ld);
                    null != i && "string" == typeof i.value && this.scopes.add(i.value), this.injectorDefTypes = new Set(this.get(nd, Y, q.Self))
                }
                destroy() {
                    this.assertNotDestroyed(), this._destroyed = !0;
                    const n = z(null);
                    try {
                        for (const r of this._ngOnDestroyHooks) r.ngOnDestroy();
                        const t = this._onDestroyHooks;
                        this._onDestroyHooks = [];
                        for (const r of t) r()
                    } finally {
                        this.records.clear(), this._ngOnDestroyHooks.clear(), this.injectorDefTypes.clear(), z(n)
                    }
                }
                onDestroy(n) {
                    return this.assertNotDestroyed(), this._onDestroyHooks.push(n), () => this.removeOnDestroy(n)
                }
                runInContext(n) {
                    this.assertNotDestroyed();
                    const t = rr(this),
                        r = mt(void 0);
                    try {
                        return n()
                    } finally {
                        rr(t), mt(r)
                    }
                }
                get(n, t = Fi, r = q.Default) {
                    if (this.assertNotDestroyed(), n.hasOwnProperty(xm)) return n[xm](this);
                    r = Ua(r);
                    const i = rr(this),
                        s = mt(void 0);
                    try {
                        if (!(r & q.SkipSelf)) {
                            let l = this.records.get(n);
                            if (void 0 === l) {
                                const c = function FS(e) {
                                    return "function" == typeof e || "object" == typeof e && e instanceof M
                                }(n) && La(n);
                                l = c && this.injectableDefInScope(c) ? yo(ud(n), Ya) : null, this.records.set(n, l)
                            }
                            if (null != l) return this.hydrate(n, l)
                        }
                        return (r & q.Self ? Xa() : this.parent).get(n, t = r & q.Optional && t === Fi ? null : t)
                    } catch (a) {
                        if ("NullInjectorError" === a.name) {
                            if ((a[$a] = a[$a] || []).unshift(Ve(n)), i) throw a;
                            return function sS(e, n, t, r) {
                                const o = e[$a];
                                throw n[Am] && o.unshift(n[Am]), e.message = function aS(e, n, t, r = null) {
                                    e = e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1) ? e.slice(2) : e;
                                    let o = Ve(n);
                                    if (Array.isArray(n)) o = n.map(Ve).join(" -> ");
                                    else if ("object" == typeof n) {
                                        let i = [];
                                        for (let s in n)
                                            if (n.hasOwnProperty(s)) {
                                                let a = n[s];
                                                i.push(s + ":" + ("string" == typeof a ? JSON.stringify(a) : Ve(a)))
                                            } o = `{${i.join(", ")}}`
                                    }
                                    return `${t}${r?"("+r+")":""}[${o}]: ${e.replace(tS,"\n  ")}`
                                }("\n" + e.message, o, t, r), e.ngTokenPath = o, e[$a] = null, e
                            }(a, n, "R3InjectorError", this.source)
                        }
                        throw a
                    } finally {
                        mt(s), rr(i)
                    }
                }
                resolveInjectorInitializers() {
                    const n = z(null),
                        t = rr(this),
                        r = mt(void 0);
                    try {
                        const i = this.get(Or, Y, q.Self);
                        for (const s of i) s()
                    } finally {
                        rr(t), mt(r), z(n)
                    }
                }
                toString() {
                    const n = [],
                        t = this.records;
                    for (const r of t.keys()) n.push(Ve(r));
                    return `R3Injector[${n.join(", ")}]`
                }
                assertNotDestroyed() {
                    if (this._destroyed) throw new C(205, !1)
                }
                processProvider(n) {
                    let t = Rr(n = N(n)) ? n : N(n && n.provide);
                    const r = function RS(e) {
                        return ad(e) ? yo(void 0, e.useValue) : yo(Zm(e), Ya)
                    }(n);
                    if (!Rr(n) && !0 === n.multi) {
                        let o = this.records.get(t);
                        o || (o = yo(void 0, Ya, !0), o.factory = () => Ju(o.multi), this.records.set(t, o)), t = n, o.multi.push(n)
                    }
                    this.records.set(t, r)
                }
                hydrate(n, t) {
                    const r = z(null);
                    try {
                        return t.value === Ya && (t.value = NS, t.value = t.factory()), "object" == typeof t.value && t.value && function kS(e) {
                            return null !== e && "object" == typeof e && "function" == typeof e.ngOnDestroy
                        }(t.value) && this._ngOnDestroyHooks.add(t.value), t.value
                    } finally {
                        z(r)
                    }
                }
                injectableDefInScope(n) {
                    if (!n.providedIn) return !1;
                    const t = N(n.providedIn);
                    return "string" == typeof t ? "any" === t || this.scopes.has(t) : this.injectorDefTypes.has(t)
                }
                removeOnDestroy(n) {
                    const t = this._onDestroyHooks.indexOf(n); - 1 !== t && this._onDestroyHooks.splice(t, 1)
                }
            }

            function ud(e) {
                const n = La(e),
                    t = null !== n ? n.factory : Nr(e);
                if (null !== t) return t;
                if (e instanceof M) throw new C(204, !1);
                if (e instanceof Function) return function OS(e) {
                    if (e.length > 0) throw new C(204, !1);
                    const t = function Zx(e) {
                        return e && (e[ja] || e[Em]) || null
                    }(e);
                    return null !== t ? () => t.factory(e) : () => new e
                }(e);
                throw new C(204, !1)
            }

            function Zm(e, n, t) {
                let r;
                if (Rr(e)) {
                    const o = N(e);
                    return Nr(o) || ud(o)
                }
                if (ad(e)) r = () => N(e.useValue);
                else if (function Wm(e) {
                        return !(!e || !e.useFactory)
                    }(e)) r = () => e.useFactory(...Ju(e.deps || []));
                else if (function qm(e) {
                        return !(!e || !e.useExisting)
                    }(e)) r = () => x(N(e.useExisting));
                else {
                    const o = N(e && (e.useClass || e.provide));
                    if (! function PS(e) {
                            return !!e.deps
                        }(e)) return Nr(o) || ud(o);
                    r = () => new o(...Ju(e.deps))
                }
                return r
            }

            function yo(e, n, t = !1) {
                return {
                    factory: e,
                    value: n,
                    multi: t ? [] : void 0
                }
            }

            function dd(e, n) {
                for (const t of e) Array.isArray(t) ? dd(t, n) : t && Wu(t) ? dd(t.\u0275providers, n) : n(t)
            }

            function dn(e, n) {
                e instanceof mo && e.assertNotDestroyed();
                const r = rr(e),
                    o = mt(void 0);
                try {
                    return n()
                } finally {
                    rr(r), mt(o)
                }
            }

            function Qm() {
                return void 0 !== Sm() || null != function rS() {
                    return ho
                }()
            }
            const De = 0,
                b = 1,
                S = 2,
                xe = 3,
                Kt = 4,
                Ke = 5,
                Tt = 6,
                _o = 7,
                fe = 8,
                Qe = 9,
                Jt = 10,
                P = 11,
                Ui = 12,
                Xm = 13,
                Co = 14,
                Ee = 15,
                Bi = 16,
                Do = 17,
                Vn = 18,
                Hi = 19,
                Km = 20,
                ir = 21,
                el = 22,
                Pr = 23,
                j = 25,
                hd = 1,
                fn = 7,
                wo = 9,
                Se = 10;
            var pd = function(e) {
                return e[e.None = 0] = "None", e[e.HasTransplantedViews = 2] = "HasTransplantedViews", e
            }(pd || {});

            function Je(e) {
                return Array.isArray(e) && "object" == typeof e[hd]
            }

            function et(e) {
                return Array.isArray(e) && !0 === e[hd]
            }

            function gd(e) {
                return !!(4 & e.flags)
            }

            function kr(e) {
                return e.componentOffset > -1
            }

            function nl(e) {
                return !(1 & ~e.flags)
            }

            function en(e) {
                return !!e.template
            }

            function md(e) {
                return !!(512 & e[S])
            }
            class QS {
                constructor(n, t, r) {
                    this.previousValue = n, this.currentValue = t, this.firstChange = r
                }
                isFirstChange() {
                    return this.firstChange
                }
            }

            function ny(e, n, t, r) {
                null !== n ? n.applyValueToInputSignal(n, r) : e[t] = r
            }

            function At() {
                return ry
            }

            function ry(e) {
                return e.type.prototype.ngOnChanges && (e.setInput = XS), YS
            }

            function YS() {
                const e = iy(this),
                    n = e?.current;
                if (n) {
                    const t = e.previous;
                    if (t === un) e.previous = n;
                    else
                        for (let r in n) t[r] = n[r];
                    e.current = null, this.ngOnChanges(n)
                }
            }

            function XS(e, n, t, r, o) {
                const i = this.declaredInputs[r],
                    s = iy(e) || function KS(e, n) {
                        return e[oy] = n
                    }(e, {
                        previous: un,
                        current: null
                    }),
                    a = s.current || (s.current = {}),
                    l = s.previous,
                    c = l[i];
                a[i] = new QS(c && c.currentValue, t, l === un), ny(e, n, o, t)
            }
            At.ngInherit = !0;
            const oy = "__ngSimpleChanges__";

            function iy(e) {
                return e[oy] || null
            }
            const hn = function(e, n, t) {},
                sy = "svg";
            let ly = !1;

            function ae(e) {
                for (; Array.isArray(e);) e = e[De];
                return e
            }

            function Gi(e, n) {
                return ae(n[e])
            }

            function at(e, n) {
                return ae(n[e.index])
            }

            function qi(e, n) {
                return e.data[n]
            }

            function Nt(e, n) {
                const t = n[e];
                return Je(t) ? t : t[De]
            }

            function Dd(e) {
                return !(128 & ~e[S])
            }

            function pn(e, n) {
                return null == n ? null : e[n]
            }

            function cy(e) {
                e[Do] = 0
            }

            function oT(e) {
                1024 & e[S] || (e[S] |= 1024, Dd(e) && Wi(e))
            }

            function wd(e) {
                return !!(9216 & e[S] || e[Pr]?.dirty)
            }

            function bd(e) {
                e[Jt].changeDetectionScheduler?.notify(1), wd(e) ? Wi(e) : 64 & e[S] && (function eT() {
                    return ly
                }() ? (e[S] |= 1024, Wi(e)) : e[Jt].changeDetectionScheduler?.notify())
            }

            function Wi(e) {
                e[Jt].changeDetectionScheduler?.notify();
                let n = Fr(e);
                for (; null !== n && !(8192 & n[S]) && (n[S] |= 8192, Dd(n));) n = Fr(n)
            }

            function rl(e, n) {
                if (!(256 & ~e[S])) throw new C(911, !1);
                null === e[ir] && (e[ir] = []), e[ir].push(n)
            }

            function Fr(e) {
                const n = e[xe];
                return et(n) ? n[xe] : n
            }
            const k = {
                lFrame: _y(null),
                bindingsEnabled: !0,
                skipHydrationRootTNode: null
            };

            function fy() {
                return k.bindingsEnabled
            }

            function Eo() {
                return null !== k.skipHydrationRootTNode
            }

            function _() {
                return k.lFrame.lView
            }

            function W() {
                return k.lFrame.tView
            }

            function jn(e) {
                return k.lFrame.contextLView = e, e[fe]
            }

            function $n(e) {
                return k.lFrame.contextLView = null, e
            }

            function ie() {
                let e = hy();
                for (; null !== e && 64 === e.type;) e = e.parent;
                return e
            }

            function hy() {
                return k.lFrame.currentTNode
            }

            function gn(e, n) {
                const t = k.lFrame;
                t.currentTNode = e, t.isParent = n
            }

            function Md() {
                return k.lFrame.isParent
            }

            function Id() {
                k.lFrame.isParent = !1
            }

            function lt() {
                const e = k.lFrame;
                let n = e.bindingRootIndex;
                return -1 === n && (n = e.bindingRootIndex = e.tView.bindingStartIndex), n
            }

            function tn() {
                return k.lFrame.bindingIndex++
            }

            function Bn(e) {
                const n = k.lFrame,
                    t = n.bindingIndex;
                return n.bindingIndex = n.bindingIndex + e, t
            }

            function gT(e, n) {
                const t = k.lFrame;
                t.bindingIndex = t.bindingRootIndex = e, xd(n)
            }

            function xd(e) {
                k.lFrame.currentDirectiveIndex = e
            }

            function Td() {
                return k.lFrame.currentQueryIndex
            }

            function ol(e) {
                k.lFrame.currentQueryIndex = e
            }

            function yT(e) {
                const n = e[b];
                return 2 === n.type ? n.declTNode : 1 === n.type ? e[Ke] : null
            }

            function yy(e, n, t) {
                if (t & q.SkipSelf) {
                    let o = n,
                        i = e;
                    for (; !(o = o.parent, null !== o || t & q.Host || (o = yT(i), null === o || (i = i[Co], 10 & o.type))););
                    if (null === o) return !1;
                    n = o, e = i
                }
                const r = k.lFrame = vy();
                return r.currentTNode = n, r.lView = e, !0
            }

            function Ad(e) {
                const n = vy(),
                    t = e[b];
                k.lFrame = n, n.currentTNode = t.firstChild, n.lView = e, n.tView = t, n.contextLView = e, n.bindingIndex = t.bindingStartIndex, n.inI18n = !1
            }

            function vy() {
                const e = k.lFrame,
                    n = null === e ? null : e.child;
                return null === n ? _y(e) : n
            }

            function _y(e) {
                const n = {
                    currentTNode: null,
                    isParent: !0,
                    lView: null,
                    tView: null,
                    selectedIndex: -1,
                    contextLView: null,
                    elementDepthCount: 0,
                    currentNamespace: null,
                    currentDirectiveIndex: -1,
                    bindingRootIndex: -1,
                    bindingIndex: -1,
                    currentQueryIndex: 0,
                    parent: e,
                    child: null,
                    inI18n: !1
                };
                return null !== e && (e.child = n), n
            }

            function Cy() {
                const e = k.lFrame;
                return k.lFrame = e.parent, e.currentTNode = null, e.lView = null, e
            }
            const Dy = Cy;

            function Nd() {
                const e = Cy();
                e.isParent = !0, e.tView = null, e.selectedIndex = -1, e.contextLView = null, e.elementDepthCount = 0, e.currentDirectiveIndex = -1, e.currentNamespace = null, e.bindingRootIndex = -1, e.bindingIndex = -1, e.currentQueryIndex = 0
            }

            function tt() {
                return k.lFrame.selectedIndex
            }

            function Lr(e) {
                k.lFrame.selectedIndex = e
            }

            function he() {
                const e = k.lFrame;
                return qi(e.tView, e.selectedIndex)
            }

            function il() {
                k.lFrame.currentNamespace = sy
            }
            let by = !0;

            function Qi() {
                return by
            }

            function mn(e) {
                by = e
            }

            function sl(e, n) {
                for (let t = n.directiveStart, r = n.directiveEnd; t < r; t++) {
                    const i = e.data[t].type.prototype,
                        {
                            ngAfterContentInit: s,
                            ngAfterContentChecked: a,
                            ngAfterViewInit: l,
                            ngAfterViewChecked: c,
                            ngOnDestroy: u
                        } = i;
                    s && (e.contentHooks ??= []).push(-t, s), a && ((e.contentHooks ??= []).push(t, a), (e.contentCheckHooks ??= []).push(t, a)), l && (e.viewHooks ??= []).push(-t, l), c && ((e.viewHooks ??= []).push(t, c), (e.viewCheckHooks ??= []).push(t, c)), null != u && (e.destroyHooks ??= []).push(t, u)
                }
            }

            function al(e, n, t) {
                Ey(e, n, 3, t)
            }

            function ll(e, n, t, r) {
                (3 & e[S]) === t && Ey(e, n, t, r)
            }

            function Od(e, n) {
                let t = e[S];
                (3 & t) === n && (t &= 16383, t += 1, e[S] = t)
            }

            function Ey(e, n, t, r) {
                const i = r ?? -1,
                    s = n.length - 1;
                let a = 0;
                for (let l = void 0 !== r ? 65535 & e[Do] : 0; l < s; l++)
                    if ("number" == typeof n[l + 1]) {
                        if (a = n[l], null != r && a >= r) break
                    } else n[l] < 0 && (e[Do] += 65536), (a < i || -1 == i) && (bT(e, t, n, l), e[Do] = (4294901760 & e[Do]) + l + 2), l++
            }

            function My(e, n) {
                hn(4, e, n);
                const t = z(null);
                try {
                    n.call(e)
                } finally {
                    z(t), hn(5, e, n)
                }
            }

            function bT(e, n, t, r) {
                const o = t[r] < 0,
                    i = t[r + 1],
                    a = e[o ? -t[r] : t[r]];
                o ? e[S] >> 14 < e[Do] >> 16 && (3 & e[S]) === n && (e[S] += 16384, My(a, i)) : My(a, i)
            }
            const Mo = -1;
            class Yi {
                constructor(n, t, r) {
                    this.factory = n, this.resolving = !1, this.canSeeViewProviders = t, this.injectImpl = r
                }
            }

            function Pd(e) {
                return e !== Mo
            }

            function Xi(e) {
                return 32767 & e
            }

            function Ki(e, n) {
                let t = function ST(e) {
                        return e >> 16
                    }(e),
                    r = n;
                for (; t > 0;) r = r[Co], t--;
                return r
            }
            let kd = !0;

            function cl(e) {
                const n = kd;
                return kd = e, n
            }
            const Iy = 255,
                xy = 5;
            let TT = 0;
            const yn = {};

            function ul(e, n) {
                const t = Sy(e, n);
                if (-1 !== t) return t;
                const r = n[b];
                r.firstCreatePass && (e.injectorIndex = n.length, Fd(r.data, e), Fd(n, null), Fd(r.blueprint, null));
                const o = dl(e, n),
                    i = e.injectorIndex;
                if (Pd(o)) {
                    const s = Xi(o),
                        a = Ki(o, n),
                        l = a[b].data;
                    for (let c = 0; c < 8; c++) n[i + c] = a[s + c] | l[s + c]
                }
                return n[i + 8] = o, i
            }

            function Fd(e, n) {
                e.push(0, 0, 0, 0, 0, 0, 0, 0, n)
            }

            function Sy(e, n) {
                return -1 === e.injectorIndex || e.parent && e.parent.injectorIndex === e.injectorIndex || null === n[e.injectorIndex + 8] ? -1 : e.injectorIndex
            }

            function dl(e, n) {
                if (e.parent && -1 !== e.parent.injectorIndex) return e.parent.injectorIndex;
                let t = 0,
                    r = null,
                    o = n;
                for (; null !== o;) {
                    if (r = ky(o), null === r) return Mo;
                    if (t++, o = o[Co], -1 !== r.injectorIndex) return r.injectorIndex | t << 16
                }
                return Mo
            }

            function Ld(e, n, t) {
                ! function AT(e, n, t) {
                    let r;
                    "string" == typeof t ? r = t.charCodeAt(0) || 0 : t.hasOwnProperty(ki) && (r = t[ki]), null == r && (r = t[ki] = TT++);
                    const o = r & Iy;
                    n.data[e + (o >> xy)] |= 1 << o
                }(e, n, t)
            }

            function Ty(e, n, t) {
                if (t & q.Optional || void 0 !== e) return e;
                Yu()
            }

            function Ay(e, n, t, r) {
                if (t & q.Optional && void 0 === r && (r = null), !(t & (q.Self | q.Host))) {
                    const o = e[Qe],
                        i = mt(void 0);
                    try {
                        return o ? o.get(n, r, t & q.Optional) : Tm(n, r, t & q.Optional)
                    } finally {
                        mt(i)
                    }
                }
                return Ty(r, 0, t)
            }

            function Ny(e, n, t, r = q.Default, o) {
                if (null !== e) {
                    if (2048 & n[S] && !(r & q.Self)) {
                        const s = function kT(e, n, t, r, o) {
                            let i = e,
                                s = n;
                            for (; null !== i && null !== s && 2048 & s[S] && !(512 & s[S]);) {
                                const a = Oy(i, s, t, r | q.Self, yn);
                                if (a !== yn) return a;
                                let l = i.parent;
                                if (!l) {
                                    const c = s[Km];
                                    if (c) {
                                        const u = c.get(t, yn, r);
                                        if (u !== yn) return u
                                    }
                                    l = ky(s), s = s[Co]
                                }
                                i = l
                            }
                            return o
                        }(e, n, t, r, yn);
                        if (s !== yn) return s
                    }
                    const i = Oy(e, n, t, r, yn);
                    if (i !== yn) return i
                }
                return Ay(n, t, r, o)
            }

            function Oy(e, n, t, r, o) {
                const i = function RT(e) {
                    if ("string" == typeof e) return e.charCodeAt(0) || 0;
                    const n = e.hasOwnProperty(ki) ? e[ki] : void 0;
                    return "number" == typeof n ? n >= 0 ? n & Iy : PT : n
                }(t);
                if ("function" == typeof i) {
                    if (!yy(n, e, r)) return r & q.Host ? Ty(o, 0, r) : Ay(n, t, r, o);
                    try {
                        let s;
                        if (s = i(r), null != s || r & q.Optional) return s;
                        Yu()
                    } finally {
                        Dy()
                    }
                } else if ("number" == typeof i) {
                    let s = null,
                        a = Sy(e, n),
                        l = Mo,
                        c = r & q.Host ? n[Ee][Ke] : null;
                    for ((-1 === a || r & q.SkipSelf) && (l = -1 === a ? dl(e, n) : n[a + 8], l !== Mo && Py(r, !1) ? (s = n[b], a = Xi(l), n = Ki(l, n)) : a = -1); - 1 !== a;) {
                        const u = n[b];
                        if (Ry(i, a, u.data)) {
                            const d = OT(a, n, t, s, r, c);
                            if (d !== yn) return d
                        }
                        l = n[a + 8], l !== Mo && Py(r, n[b].data[a + 8] === c) && Ry(i, a, n) ? (s = u, a = Xi(l), n = Ki(l, n)) : a = -1
                    }
                }
                return o
            }

            function OT(e, n, t, r, o, i) {
                const s = n[b],
                    a = s.data[e + 8],
                    u = fl(a, s, t, null == r ? kr(a) && kd : r != s && !!(3 & a.type), o & q.Host && i === a);
                return null !== u ? Vr(n, s, u, a) : yn
            }

            function fl(e, n, t, r, o) {
                const i = e.providerIndexes,
                    s = n.data,
                    a = 1048575 & i,
                    l = e.directiveStart,
                    u = i >> 20,
                    f = o ? a + u : e.directiveEnd;
                for (let h = r ? a : a + u; h < f; h++) {
                    const p = s[h];
                    if (h < l && t === p || h >= l && p.type === t) return h
                }
                if (o) {
                    const h = s[l];
                    if (h && en(h) && h.type === t) return l
                }
                return null
            }

            function Vr(e, n, t, r) {
                let o = e[t];
                const i = n.data;
                if (function ET(e) {
                        return e instanceof Yi
                    }(o)) {
                    const s = o;
                    s.resolving && function Kx(e, n) {
                        throw n && n.join(" > "), new C(-200, e)
                    }(function K(e) {
                        return "function" == typeof e ? e.name || e.toString() : "object" == typeof e && null != e && "function" == typeof e.type ? e.type.name || e.type.toString() : V(e)
                    }(i[t]));
                    const a = cl(s.canSeeViewProviders);
                    s.resolving = !0;
                    const c = s.injectImpl ? mt(s.injectImpl) : null;
                    yy(e, r, q.Default);
                    try {
                        o = e[t] = s.factory(void 0, i, e, r), n.firstCreatePass && t >= r.directiveStart && function wT(e, n, t) {
                            const {
                                ngOnChanges: r,
                                ngOnInit: o,
                                ngDoCheck: i
                            } = n.type.prototype;
                            if (r) {
                                const s = ry(n);
                                (t.preOrderHooks ??= []).push(e, s), (t.preOrderCheckHooks ??= []).push(e, s)
                            }
                            o && (t.preOrderHooks ??= []).push(0 - e, o), i && ((t.preOrderHooks ??= []).push(e, i), (t.preOrderCheckHooks ??= []).push(e, i))
                        }(t, i[t], n)
                    } finally {
                        null !== c && mt(c), cl(a), s.resolving = !1, Dy()
                    }
                }
                return o
            }

            function Ry(e, n, t) {
                return !!(t[n + (e >> xy)] & 1 << e)
            }

            function Py(e, n) {
                return !(e & q.Self || e & q.Host && n)
            }
            class Ue {
                constructor(n, t) {
                    this._tNode = n, this._lView = t
                }
                get(n, t, r) {
                    return Ny(this._tNode, this._lView, n, Ua(r), t)
                }
            }

            function PT() {
                return new Ue(ie(), _())
            }

            function Ge(e) {
                return kn(() => {
                    const n = e.prototype.constructor,
                        t = n[Fn] || Vd(n),
                        r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r;) {
                        const i = o[Fn] || Vd(o);
                        if (i && i !== t) return i;
                        o = Object.getPrototypeOf(o)
                    }
                    return i => new i
                })
            }

            function Vd(e) {
                return Fa(e) ? () => {
                    const n = Vd(N(e));
                    return n && n()
                } : Nr(e)
            }

            function ky(e) {
                const n = e[b],
                    t = n.type;
                return 2 === t ? n.declTNode : 1 === t ? e[Ke] : null
            }

            function $y(e, n = null, t = null, r) {
                const o = Uy(e, n, t, r);
                return o.resolveInjectorInitializers(), o
            }

            function Uy(e, n = null, t = null, r, o = new Set) {
                const i = [t || Y, SS(e)];
                return r = r || ("object" == typeof e ? void 0 : Ve(e)), new mo(i, n || Xa(), r || null, o)
            }
            let ct = (() => {
                class e {
                    static #e = this.THROW_IF_NOT_FOUND = Fi;
                    static #t = this.NULL = new qa;
                    static create(t, r) {
                        if (Array.isArray(t)) return $y({
                            name: ""
                        }, r, t, "");
                        {
                            const o = t.name ?? "";
                            return $y({
                                name: o
                            }, t.parent, t.providers, o)
                        }
                    }
                    static #n = this.\u0275prov = I({
                        token: e,
                        providedIn: "any",
                        factory: () => x(km)
                    });
                    static #r = this.__NG_ELEMENT_ID__ = -1
                }
                return e
            })();

            function $d(e) {
                return e.ngOriginalError
            }
            class vn {
                constructor() {
                    this._console = console
                }
                handleError(n) {
                    const t = this._findOriginalError(n);
                    this._console.error("ERROR", n), t && this._console.error("ORIGINAL ERROR", t)
                }
                _findOriginalError(n) {
                    let t = n && $d(n);
                    for (; t && $d(t);) t = $d(t);
                    return t || null
                }
            }
            const Hy = new M("", {
                providedIn: "root",
                factory: () => w(vn).handleError.bind(void 0)
            });
            let So = (() => {
                class e {
                    static #e = this.__NG_ELEMENT_ID__ = zT;
                    static #t = this.__NG_ENV_ID__ = t => t
                }
                return e
            })();
            class HT extends So {
                constructor(n) {
                    super(), this._lView = n
                }
                onDestroy(n) {
                    return rl(this._lView, n), () => function Ed(e, n) {
                        if (null === e[ir]) return;
                        const t = e[ir].indexOf(n); - 1 !== t && e[ir].splice(t, 1)
                    }(this._lView, n)
                }
            }

            function zT() {
                return new HT(_())
            }

            function GT() {
                return To(ie(), _())
            }

            function To(e, n) {
                return new ut(at(e, n))
            }
            let ut = (() => {
                class e {
                    constructor(t) {
                        this.nativeElement = t
                    }
                    static #e = this.__NG_ELEMENT_ID__ = GT
                }
                return e
            })();

            function Gy(e) {
                return e instanceof ut ? e.nativeElement : e
            }

            function Ud(e) {
                return n => {
                    setTimeout(e, void 0, n)
                }
            }
            const _e = class qT extends ze {
                constructor(n = !1) {
                    super(), this.destroyRef = void 0, this.__isAsync = n, Qm() && (this.destroyRef = w(So, {
                        optional: !0
                    }) ?? void 0)
                }
                emit(n) {
                    const t = z(null);
                    try {
                        super.next(n)
                    } finally {
                        z(t)
                    }
                }
                subscribe(n, t, r) {
                    let o = n,
                        i = t || (() => null),
                        s = r;
                    if (n && "object" == typeof n) {
                        const l = n;
                        o = l.next?.bind(l), i = l.error?.bind(l), s = l.complete?.bind(l)
                    }
                    this.__isAsync && (i = Ud(i), o && (o = Ud(o)), s && (s = Ud(s)));
                    const a = super.subscribe({
                        next: o,
                        error: i,
                        complete: s
                    });
                    return n instanceof st && n.add(a), a
                }
            };

            function WT() {
                return this._results[Symbol.iterator]()
            }
            class Bd {
                static #e = Symbol.iterator;
                get changes() {
                    return this._changes ??= new _e
                }
                constructor(n = !1) {
                    this._emitDistinctChangesOnly = n, this.dirty = !0, this._onDirty = void 0, this._results = [], this._changesDetected = !1, this._changes = void 0, this.length = 0, this.first = void 0, this.last = void 0;
                    const t = Bd.prototype;
                    t[Symbol.iterator] || (t[Symbol.iterator] = WT)
                }
                get(n) {
                    return this._results[n]
                }
                map(n) {
                    return this._results.map(n)
                }
                filter(n) {
                    return this._results.filter(n)
                }
                find(n) {
                    return this._results.find(n)
                }
                reduce(n, t) {
                    return this._results.reduce(n, t)
                }
                forEach(n) {
                    this._results.forEach(n)
                }
                some(n) {
                    return this._results.some(n)
                }
                toArray() {
                    return this._results.slice()
                }
                toString() {
                    return this._results.toString()
                }
                reset(n, t) {
                    this.dirty = !1;
                    const r = function yt(e) {
                        return e.flat(Number.POSITIVE_INFINITY)
                    }(n);
                    (this._changesDetected = ! function dS(e, n, t) {
                        if (e.length !== n.length) return !1;
                        for (let r = 0; r < e.length; r++) {
                            let o = e[r],
                                i = n[r];
                            if (t && (o = t(o), i = t(i)), i !== o) return !1
                        }
                        return !0
                    }(this._results, r, t)) && (this._results = r, this.length = r.length, this.last = r[this.length - 1], this.first = r[0])
                }
                notifyOnChanges() {
                    void 0 !== this._changes && (this._changesDetected || !this._emitDistinctChangesOnly) && this._changes.emit(this)
                }
                onDirty(n) {
                    this._onDirty = n
                }
                setDirty() {
                    this.dirty = !0, this._onDirty?.()
                }
                destroy() {
                    void 0 !== this._changes && (this._changes.complete(), this._changes.unsubscribe())
                }
            }

            function pl(e) {
                return !(128 & ~e.flags)
            }
            const Hd = new Map;
            let QT = 0;
            const Gd = "__ngContext__";

            function nt(e, n) {
                Je(n) ? (e[Gd] = n[Hi], function XT(e) {
                    Hd.set(e[Hi], e)
                }(n)) : e[Gd] = n
            }

            function tv(e) {
                return rv(e[Ui])
            }

            function nv(e) {
                return rv(e[Kt])
            }

            function rv(e) {
                for (; null !== e && !et(e);) e = e[Kt];
                return e
            }
            let qd;
            const yl = new M("", {
                    providedIn: "root",
                    factory: () => gA
                }),
                gA = "ng",
                dv = new M(""),
                Hn = new M("", {
                    providedIn: "platform",
                    factory: () => "unknown"
                }),
                fv = new M("", {
                    providedIn: "root",
                    factory: () => function sr() {
                        if (void 0 !== qd) return qd;
                        if (typeof document < "u") return document;
                        throw new C(210, !1)
                    }().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") || null
                });
            let hv = () => null;

            function ef(e, n, t = !1) {
                return hv(e, n, t)
            }
            const vv = new M("", {
                providedIn: "root",
                factory: () => !1
            });
            let El;

            function Oo(e) {
                return function sf() {
                    if (void 0 === El && (El = null, re.trustedTypes)) try {
                        El = re.trustedTypes.createPolicy("angular", {
                            createHTML: e => e,
                            createScript: e => e,
                            createScriptURL: e => e
                        })
                    } catch {}
                    return El
                }()?.createHTML(e) || e
            }
            class jr {
                constructor(n) {
                    this.changingThisBreaksApplicationSecurity = n
                }
                toString() {
                    return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${_m})`
                }
            }
            class TA extends jr {
                getTypeName() {
                    return "HTML"
                }
            }
            class AA extends jr {
                getTypeName() {
                    return "Style"
                }
            }
            class NA extends jr {
                getTypeName() {
                    return "Script"
                }
            }
            class OA extends jr {
                getTypeName() {
                    return "URL"
                }
            }
            class RA extends jr {
                getTypeName() {
                    return "ResourceURL"
                }
            }

            function Ot(e) {
                return e instanceof jr ? e.changingThisBreaksApplicationSecurity : e
            }

            function _n(e, n) {
                const t = function PA(e) {
                    return e instanceof jr && e.getTypeName() || null
                }(e);
                if (null != t && t !== n) {
                    if ("ResourceURL" === t && "URL" === n) return !0;
                    throw new Error(`Required a safe ${n}, got a ${t} (see ${_m})`)
                }
                return t === n
            }
            class $A {
                constructor(n) {
                    this.inertDocumentHelper = n
                }
                getInertBodyElement(n) {
                    n = "<body><remove></remove>" + n;
                    try {
                        const t = (new window.DOMParser).parseFromString(Oo(n), "text/html").body;
                        return null === t ? this.inertDocumentHelper.getInertBodyElement(n) : (t.removeChild(t.firstChild), t)
                    } catch {
                        return null
                    }
                }
            }
            class UA {
                constructor(n) {
                    this.defaultDoc = n, this.inertDocument = this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")
                }
                getInertBodyElement(n) {
                    const t = this.inertDocument.createElement("template");
                    return t.innerHTML = Oo(n), t
                }
            }
            const HA = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;

            function Il(e) {
                return (e = String(e)).match(HA) ? e : "unsafe:" + e
            }

            function zn(e) {
                const n = {};
                for (const t of e.split(",")) n[t] = !0;
                return n
            }

            function ss(...e) {
                const n = {};
                for (const t of e)
                    for (const r in t) t.hasOwnProperty(r) && (n[r] = !0);
                return n
            }
            const Ev = zn("area,br,col,hr,img,wbr"),
                Mv = zn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
                Iv = zn("rp,rt"),
                lf = ss(Ev, ss(Mv, zn("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")), ss(Iv, zn("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")), ss(Iv, Mv)),
                cf = zn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
                xv = ss(cf, zn("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"), zn("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext")),
                zA = zn("script,style,template");
            class GA {
                constructor() {
                    this.sanitizedSomething = !1, this.buf = []
                }
                sanitizeChildren(n) {
                    let t = n.firstChild,
                        r = !0,
                        o = [];
                    for (; t;)
                        if (t.nodeType === Node.ELEMENT_NODE ? r = this.startElement(t) : t.nodeType === Node.TEXT_NODE ? this.chars(t.nodeValue) : this.sanitizedSomething = !0, r && t.firstChild) o.push(t), t = ZA(t);
                        else
                            for (; t;) {
                                t.nodeType === Node.ELEMENT_NODE && this.endElement(t);
                                let i = WA(t);
                                if (i) {
                                    t = i;
                                    break
                                }
                                t = o.pop()
                            }
                    return this.buf.join("")
                }
                startElement(n) {
                    const t = Sv(n).toLowerCase();
                    if (!lf.hasOwnProperty(t)) return this.sanitizedSomething = !0, !zA.hasOwnProperty(t);
                    this.buf.push("<"), this.buf.push(t);
                    const r = n.attributes;
                    for (let o = 0; o < r.length; o++) {
                        const i = r.item(o),
                            s = i.name,
                            a = s.toLowerCase();
                        if (!xv.hasOwnProperty(a)) {
                            this.sanitizedSomething = !0;
                            continue
                        }
                        let l = i.value;
                        cf[a] && (l = Il(l)), this.buf.push(" ", s, '="', Av(l), '"')
                    }
                    return this.buf.push(">"), !0
                }
                endElement(n) {
                    const t = Sv(n).toLowerCase();
                    lf.hasOwnProperty(t) && !Ev.hasOwnProperty(t) && (this.buf.push("</"), this.buf.push(t), this.buf.push(">"))
                }
                chars(n) {
                    this.buf.push(Av(n))
                }
            }

            function WA(e) {
                const n = e.nextSibling;
                if (n && e !== n.previousSibling) throw Tv(n);
                return n
            }

            function ZA(e) {
                const n = e.firstChild;
                if (n && function qA(e, n) {
                        return (e.compareDocumentPosition(n) & Node.DOCUMENT_POSITION_CONTAINED_BY) !== Node.DOCUMENT_POSITION_CONTAINED_BY
                    }(e, n)) throw Tv(n);
                return n
            }

            function Sv(e) {
                const n = e.nodeName;
                return "string" == typeof n ? n : "FORM"
            }

            function Tv(e) {
                return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)
            }
            const QA = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
                YA = /([^\#-~ |!])/g;

            function Av(e) {
                return e.replace(/&/g, "&amp;").replace(QA, function(n) {
                    return "&#" + (1024 * (n.charCodeAt(0) - 55296) + (n.charCodeAt(1) - 56320) + 65536) + ";"
                }).replace(YA, function(n) {
                    return "&#" + n.charCodeAt(0) + ";"
                }).replace(/</g, "&lt;").replace(/>/g, "&gt;")
            }
            let xl;

            function Nv(e, n) {
                let t = null;
                try {
                    xl = xl || function bv(e) {
                        const n = new UA(e);
                        return function BA() {
                            try {
                                return !!(new window.DOMParser).parseFromString(Oo(""), "text/html")
                            } catch {
                                return !1
                            }
                        }() ? new $A(n) : n
                    }(e);
                    let r = n ? String(n) : "";
                    t = xl.getInertBodyElement(r);
                    let o = 5,
                        i = r;
                    do {
                        if (0 === o) throw new Error("Failed to sanitize html because the input is unstable");
                        o--, r = i, i = t.innerHTML, t = xl.getInertBodyElement(r)
                    } while (r !== i);
                    return Oo((new GA).sanitizeChildren(uf(t) || t))
                } finally {
                    if (t) {
                        const r = uf(t) || t;
                        for (; r.firstChild;) r.removeChild(r.firstChild)
                    }
                }
            }

            function uf(e) {
                return "content" in e && function XA(e) {
                    return e.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === e.nodeName
                }(e) ? e.content : null
            }
            var Rt = function(e) {
                return e[e.NONE = 0] = "NONE", e[e.HTML = 1] = "HTML", e[e.STYLE = 2] = "STYLE", e[e.SCRIPT = 3] = "SCRIPT", e[e.URL = 4] = "URL", e[e.RESOURCE_URL = 5] = "RESOURCE_URL", e
            }(Rt || {});

            function Ct(e) {
                const n = function as() {
                    const e = _();
                    return e && e[Jt].sanitizer
                }();
                return n ? n.sanitize(Rt.URL, e) || "" : _n(e, "URL") ? Ot(e) : Il(V(e))
            }

            function Pt(e) {
                return e instanceof Function ? e() : e
            }
            var lr = function(e) {
                return e[e.Important = 1] = "Important", e[e.DashCase = 2] = "DashCase", e
            }(lr || {});
            let pf;

            function gf(e, n) {
                return pf(e, n)
            }

            function Po(e, n, t, r, o) {
                if (null != r) {
                    let i, s = !1;
                    et(r) ? i = r : Je(r) && (s = !0, r = r[De]);
                    const a = ae(r);
                    0 === e && null !== t ? null == o ? Gv(n, t, a) : $r(n, t, a, o || null, !0) : 1 === e && null !== t ? $r(n, t, a, o || null, !0) : 2 === e ? function us(e, n, t) {
                        const r = Ol(e, n);
                        r && function MN(e, n, t, r) {
                            e.removeChild(n, t, r)
                        }(e, r, n, t)
                    }(n, a, s) : 3 === e && n.destroyNode(a), null != i && function SN(e, n, t, r, o) {
                        const i = t[fn];
                        i !== ae(t) && Po(n, e, r, i, o);
                        for (let a = Se; a < t.length; a++) {
                            const l = t[a];
                            Pl(l[b], l, e, n, r, i)
                        }
                    }(n, e, i, t, o)
                }
            }

            function Al(e, n, t) {
                return e.createElement(n, t)
            }

            function Bv(e, n) {
                n[Jt].changeDetectionScheduler?.notify(1), Pl(e, n, n[P], 2, null, null)
            }

            function Hv(e, n) {
                const t = e[wo],
                    r = t.indexOf(n);
                t.splice(r, 1)
            }

            function ls(e, n) {
                if (e.length <= Se) return;
                const t = Se + n,
                    r = e[t];
                if (r) {
                    const o = r[Bi];
                    null !== o && o !== e && Hv(o, r), n > 0 && (e[t - 1][Kt] = r[Kt]);
                    const i = za(e, Se + n);
                    ! function vN(e, n) {
                        Bv(e, n), n[De] = null, n[Ke] = null
                    }(r[b], r);
                    const s = i[Vn];
                    null !== s && s.detachView(i[b]), r[xe] = null, r[Kt] = null, r[S] &= -129
                }
                return r
            }

            function Nl(e, n) {
                if (!(256 & n[S])) {
                    const t = n[P];
                    t.destroyNode && Pl(e, n, t, 3, null, null),
                        function CN(e) {
                            let n = e[Ui];
                            if (!n) return vf(e[b], e);
                            for (; n;) {
                                let t = null;
                                if (Je(n)) t = n[Ui];
                                else {
                                    const r = n[Se];
                                    r && (t = r)
                                }
                                if (!t) {
                                    for (; n && !n[Kt] && n !== e;) Je(n) && vf(n[b], n), n = n[xe];
                                    null === n && (n = e), Je(n) && vf(n[b], n), t = n && n[Kt]
                                }
                                n = t
                            }
                        }(n)
                }
            }

            function vf(e, n) {
                if (256 & n[S]) return;
                const t = z(null);
                try {
                    n[S] &= -129, n[S] |= 256, n[Pr] && function im(e) {
                            if (so(e), Oi(e))
                                for (let n = 0; n < e.producerNode.length; n++) Aa(e.producerNode[n], e.producerIndexOfThis[n]);
                            e.producerNode.length = e.producerLastReadVersion.length = e.producerIndexOfThis.length = 0, e.liveConsumerNode && (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0)
                        }(n[Pr]),
                        function EN(e, n) {
                            let t;
                            if (null != e && null != (t = e.destroyHooks))
                                for (let r = 0; r < t.length; r += 2) {
                                    const o = n[t[r]];
                                    if (!(o instanceof Yi)) {
                                        const i = t[r + 1];
                                        if (Array.isArray(i))
                                            for (let s = 0; s < i.length; s += 2) {
                                                const a = o[i[s]],
                                                    l = i[s + 1];
                                                hn(4, a, l);
                                                try {
                                                    l.call(a)
                                                } finally {
                                                    hn(5, a, l)
                                                }
                                            } else {
                                                hn(4, o, i);
                                                try {
                                                    i.call(o)
                                                } finally {
                                                    hn(5, o, i)
                                                }
                                            }
                                    }
                                }
                        }(e, n),
                        function bN(e, n) {
                            const t = e.cleanup,
                                r = n[_o];
                            if (null !== t)
                                for (let i = 0; i < t.length - 1; i += 2)
                                    if ("string" == typeof t[i]) {
                                        const s = t[i + 3];
                                        s >= 0 ? r[s]() : r[-s].unsubscribe(), i += 2
                                    } else t[i].call(r[t[i + 1]]);
                            null !== r && (n[_o] = null);
                            const o = n[ir];
                            if (null !== o) {
                                n[ir] = null;
                                for (let i = 0; i < o.length; i++)(0, o[i])()
                            }
                        }(e, n), 1 === n[b].type && n[P].destroy();
                    const r = n[Bi];
                    if (null !== r && et(n[xe])) {
                        r !== n[xe] && Hv(r, n);
                        const o = n[Vn];
                        null !== o && o.detachView(e)
                    }! function KT(e) {
                        Hd.delete(e[Hi])
                    }(n)
                } finally {
                    z(t)
                }
            }

            function _f(e, n, t) {
                return function zv(e, n, t) {
                    let r = n;
                    for (; null !== r && 40 & r.type;) r = (n = r).parent;
                    if (null === r) return t[De];
                    {
                        const {
                            componentOffset: o
                        } = r;
                        if (o > -1) {
                            const {
                                encapsulation: i
                            } = e.data[r.directiveStart + o];
                            if (i === Yt.None || i === Yt.Emulated) return null
                        }
                        return at(r, t)
                    }
                }(e, n.parent, t)
            }

            function $r(e, n, t, r, o) {
                e.insertBefore(n, t, r, o)
            }

            function Gv(e, n, t) {
                e.appendChild(n, t)
            }

            function qv(e, n, t, r, o) {
                null !== r ? $r(e, n, t, r, o) : Gv(e, n, t)
            }

            function Ol(e, n) {
                return e.parentNode(n)
            }

            function Wv(e, n, t) {
                return Qv(e, n, t)
            }
            let Cf, Qv = function Zv(e, n, t) {
                return 40 & e.type ? at(e, t) : null
            };

            function Rl(e, n, t, r) {
                const o = _f(e, r, n),
                    i = n[P],
                    a = Wv(r.parent || n[Ke], r, n);
                if (null != o)
                    if (Array.isArray(t))
                        for (let l = 0; l < t.length; l++) qv(i, o, t[l], a, !1);
                    else qv(i, o, t, a, !1);
                void 0 !== Cf && Cf(i, r, n, t, o)
            }

            function cs(e, n) {
                if (null !== n) {
                    const t = n.type;
                    if (3 & t) return at(n, e);
                    if (4 & t) return Df(-1, e[n.index]);
                    if (8 & t) {
                        const r = n.child;
                        if (null !== r) return cs(e, r);
                        {
                            const o = e[n.index];
                            return et(o) ? Df(-1, o) : ae(o)
                        }
                    }
                    if (32 & t) return gf(n, e)() || ae(e[n.index]);
                    {
                        const r = Xv(e, n);
                        return null !== r ? Array.isArray(r) ? r[0] : cs(Fr(e[Ee]), r) : cs(e, n.next)
                    }
                }
                return null
            }

            function Xv(e, n) {
                return null !== n ? e[Ee][Ke].projection[n.projection] : null
            }

            function Df(e, n) {
                const t = Se + e + 1;
                if (t < n.length) {
                    const r = n[t],
                        o = r[b].firstChild;
                    if (null !== o) return cs(r, o)
                }
                return n[fn]
            }

            function wf(e, n, t, r, o, i, s) {
                for (; null != t;) {
                    const a = r[t.index],
                        l = t.type;
                    if (s && 0 === n && (a && nt(ae(a), r), t.flags |= 2), 32 & ~t.flags)
                        if (8 & l) wf(e, n, t.child, r, o, i, !1), Po(n, e, o, a, i);
                        else if (32 & l) {
                        const c = gf(t, r);
                        let u;
                        for (; u = c();) Po(n, e, o, u, i);
                        Po(n, e, o, a, i)
                    } else 16 & l ? Jv(e, n, r, t, o, i) : Po(n, e, o, a, i);
                    t = s ? t.projectionNext : t.next
                }
            }

            function Pl(e, n, t, r, o, i) {
                wf(t, r, e.firstChild, n, o, i, !1)
            }

            function Jv(e, n, t, r, o, i) {
                const s = t[Ee],
                    l = s[Ke].projection[r.projection];
                if (Array.isArray(l))
                    for (let c = 0; c < l.length; c++) Po(n, e, o, l[c], i);
                else {
                    let c = l;
                    const u = s[xe];
                    pl(r) && (c.flags |= 128), wf(e, n, c, u, o, i, !0)
                }
            }

            function e_(e, n, t) {
                "" === t ? e.removeAttribute(n, "class") : e.setAttribute(n, "class", t)
            }

            function t_(e, n, t) {
                const {
                    mergedAttrs: r,
                    classes: o,
                    styles: i
                } = t;
                null !== r && rd(e, n, r), null !== o && e_(e, n, o), null !== i && function AN(e, n, t) {
                    e.setAttribute(n, "style", t)
                }(e, n, i)
            }
            const $ = {};

            function U(e = 1) {
                n_(W(), _(), tt() + e, !1)
            }

            function n_(e, n, t, r) {
                if (!r)
                    if (3 & ~n[S]) {
                        const i = e.preOrderHooks;
                        null !== i && ll(n, i, 0, t)
                    } else {
                        const i = e.preOrderCheckHooks;
                        null !== i && al(n, i, t)
                    } Lr(t)
            }

            function D(e, n = q.Default) {
                const t = _();
                return null === t ? x(e, n) : Ny(ie(), t, N(e), n)
            }

            function o_(e, n, t, r, o, i) {
                const s = z(null);
                try {
                    let a = null;
                    o & ve.SignalBased && (a = n[r][Sr]), null !== a && void 0 !== a.transformFn && (i = a.transformFn(i)), o & ve.HasDecoratorInputTransform && (i = e.inputTransforms[r].call(n, i)), null !== e.setInput ? e.setInput(n, a, i, t, r) : ny(n, a, r, i)
                } finally {
                    z(s)
                }
            }

            function kl(e, n, t, r, o, i, s, a, l, c, u) {
                const d = n.blueprint.slice();
                return d[De] = o, d[S] = 204 | r, (null !== c || e && 2048 & e[S]) && (d[S] |= 2048), cy(d), d[xe] = d[Co] = e, d[fe] = t, d[Jt] = s || e && e[Jt], d[P] = a || e && e[P], d[Qe] = l || e && e[Qe] || null, d[Ke] = i, d[Hi] = function YT() {
                    return QT++
                }(), d[Tt] = u, d[Km] = c, d[Ee] = 2 == n.type ? e[Ee] : d, d
            }

            function ko(e, n, t, r, o) {
                let i = e.data[n];
                if (null === i) i = function bf(e, n, t, r, o) {
                        const i = hy(),
                            s = Md(),
                            l = e.data[n] = function VN(e, n, t, r, o, i) {
                                let s = n ? n.injectorIndex : -1,
                                    a = 0;
                                return Eo() && (a |= 128), {
                                    type: t,
                                    index: r,
                                    insertBeforeIndex: null,
                                    injectorIndex: s,
                                    directiveStart: -1,
                                    directiveEnd: -1,
                                    directiveStylingLast: -1,
                                    componentOffset: -1,
                                    propertyBindings: null,
                                    flags: a,
                                    providerIndexes: 0,
                                    value: o,
                                    attrs: i,
                                    mergedAttrs: null,
                                    localNames: null,
                                    initialInputs: void 0,
                                    inputs: null,
                                    outputs: null,
                                    tView: null,
                                    next: null,
                                    prev: null,
                                    projectionNext: null,
                                    child: null,
                                    parent: n,
                                    projection: null,
                                    styles: null,
                                    stylesWithoutHost: null,
                                    residualStyles: void 0,
                                    classes: null,
                                    classesWithoutHost: null,
                                    residualClasses: void 0,
                                    classBindings: 0,
                                    styleBindings: 0
                                }
                            }(0, s ? i : i && i.parent, t, n, r, o);
                        return null === e.firstChild && (e.firstChild = l), null !== i && (s ? null == i.child && null !== l.parent && (i.child = l) : null === i.next && (i.next = l, l.prev = i)), l
                    }(e, n, t, r, o),
                    function pT() {
                        return k.lFrame.inI18n
                    }() && (i.flags |= 32);
                else if (64 & i.type) {
                    i.type = t, i.value = r, i.attrs = o;
                    const s = function Zi() {
                        const e = k.lFrame,
                            n = e.currentTNode;
                        return e.isParent ? n : n.parent
                    }();
                    i.injectorIndex = null === s ? -1 : s.injectorIndex
                }
                return gn(i, !0), i
            }

            function ds(e, n, t, r) {
                if (0 === t) return -1;
                const o = n.length;
                for (let i = 0; i < t; i++) n.push(r), e.blueprint.push(r), e.data.push(null);
                return o
            }

            function i_(e, n, t, r, o) {
                const i = tt(),
                    s = 2 & r;
                try {
                    Lr(-1), s && n.length > j && n_(e, n, j, !1), hn(s ? 2 : 0, o), t(r, o)
                } finally {
                    Lr(i), hn(s ? 3 : 1, o)
                }
            }

            function Ef(e, n, t) {
                if (gd(n)) {
                    const r = z(null);
                    try {
                        const i = n.directiveEnd;
                        for (let s = n.directiveStart; s < i; s++) {
                            const a = e.data[s];
                            a.contentQueries && a.contentQueries(1, t[s], s)
                        }
                    } finally {
                        z(r)
                    }
                }
            }

            function Mf(e, n, t) {
                fy() && (function GN(e, n, t, r) {
                    const o = t.directiveStart,
                        i = t.directiveEnd;
                    kr(t) && function KN(e, n, t) {
                        const r = at(n, e),
                            o = s_(t);
                        let s = 16;
                        t.signals ? s = 4096 : t.onPush && (s = 64);
                        const a = Fl(e, kl(e, o, null, s, r, n, null, e[Jt].rendererFactory.createRenderer(r, t), null, null, null));
                        e[n.index] = a
                    }(n, t, e.data[o + t.componentOffset]), e.firstCreatePass || ul(t, n), nt(r, n);
                    const s = t.initialInputs;
                    for (let a = o; a < i; a++) {
                        const l = e.data[a],
                            c = Vr(n, e, a, t);
                        nt(c, n), null !== s && JN(0, a - o, c, l, 0, s), en(l) && (Nt(t.index, n)[fe] = Vr(n, e, a, t))
                    }
                }(e, n, t, at(t, n)), !(64 & ~t.flags) && d_(e, n, t))
            }

            function If(e, n, t = at) {
                const r = n.localNames;
                if (null !== r) {
                    let o = n.index + 1;
                    for (let i = 0; i < r.length; i += 2) {
                        const s = r[i + 1],
                            a = -1 === s ? t(n, e) : e[s];
                        e[o++] = a
                    }
                }
            }

            function s_(e) {
                const n = e.tView;
                return null === n || n.incompleteFirstPass ? e.tView = xf(1, null, e.template, e.decls, e.vars, e.directiveDefs, e.pipeDefs, e.viewQuery, e.schemas, e.consts, e.id) : n
            }

            function xf(e, n, t, r, o, i, s, a, l, c, u) {
                const d = j + r,
                    f = d + o,
                    h = function ON(e, n) {
                        const t = [];
                        for (let r = 0; r < n; r++) t.push(r < e ? null : $);
                        return t
                    }(d, f),
                    p = "function" == typeof c ? c() : c;
                return h[b] = {
                    type: e,
                    blueprint: h,
                    template: t,
                    queries: null,
                    viewQuery: a,
                    declTNode: n,
                    data: h.slice().fill(null, d),
                    bindingStartIndex: d,
                    expandoStartIndex: f,
                    hostBindingOpCodes: null,
                    firstCreatePass: !0,
                    firstUpdatePass: !0,
                    staticViewQueries: !1,
                    staticContentQueries: !1,
                    preOrderHooks: null,
                    preOrderCheckHooks: null,
                    contentHooks: null,
                    contentCheckHooks: null,
                    viewHooks: null,
                    viewCheckHooks: null,
                    destroyHooks: null,
                    cleanup: null,
                    contentQueries: null,
                    components: null,
                    directiveRegistry: "function" == typeof i ? i() : i,
                    pipeRegistry: "function" == typeof s ? s() : s,
                    firstChild: null,
                    schemas: l,
                    consts: p,
                    incompleteFirstPass: !1,
                    ssrId: u
                }
            }
            let a_ = () => null;

            function l_(e, n, t, r, o) {
                for (let i in n) {
                    if (!n.hasOwnProperty(i)) continue;
                    const s = n[i];
                    if (void 0 === s) continue;
                    r ??= {};
                    let a, l = ve.None;
                    Array.isArray(s) ? (a = s[0], l = s[1]) : a = s;
                    let c = i;
                    if (null !== o) {
                        if (!o.hasOwnProperty(i)) continue;
                        c = o[i]
                    }
                    0 === e ? c_(r, t, c, a, l) : c_(r, t, c, a)
                }
                return r
            }

            function c_(e, n, t, r, o) {
                let i;
                e.hasOwnProperty(t) ? (i = e[t]).push(n, r) : i = e[t] = [n, r], void 0 !== o && i.push(o)
            }

            function Dt(e, n, t, r, o, i, s, a) {
                const l = at(n, t);
                let u, c = n.inputs;
                !a && null != c && (u = c[r]) ? (Of(e, t, u, r, o), kr(n) && function UN(e, n) {
                    const t = Nt(n, e);
                    16 & t[S] || (t[S] |= 64)
                }(t, n.index)) : 3 & n.type && (r = function $N(e) {
                    return "class" === e ? "className" : "for" === e ? "htmlFor" : "formaction" === e ? "formAction" : "innerHtml" === e ? "innerHTML" : "readonly" === e ? "readOnly" : "tabindex" === e ? "tabIndex" : e
                }(r), o = null != s ? s(o, n.value || "", r) : o, i.setProperty(l, r, o))
            }

            function Sf(e, n, t, r) {
                if (fy()) {
                    const o = null === r ? null : {
                            "": -1
                        },
                        i = function WN(e, n) {
                            const t = e.directiveRegistry;
                            let r = null,
                                o = null;
                            if (t)
                                for (let i = 0; i < t.length; i++) {
                                    const s = t[i];
                                    if ($m(n, s.selectors, !1))
                                        if (r || (r = []), en(s))
                                            if (null !== s.findHostDirectiveDefs) {
                                                const a = [];
                                                o = o || new Map, s.findHostDirectiveDefs(s, a, o), r.unshift(...a, s), Tf(e, n, a.length)
                                            } else r.unshift(s), Tf(e, n, 0);
                                    else o = o || new Map, s.findHostDirectiveDefs?.(s, r, o), r.push(s)
                                }
                            return null === r ? null : [r, o]
                        }(e, t);
                    let s, a;
                    null === i ? s = a = null : [s, a] = i, null !== s && u_(e, n, t, s, o, a), o && function ZN(e, n, t) {
                        if (n) {
                            const r = e.localNames = [];
                            for (let o = 0; o < n.length; o += 2) {
                                const i = t[n[o + 1]];
                                if (null == i) throw new C(-301, !1);
                                r.push(n[o], i)
                            }
                        }
                    }(t, r, o)
                }
                t.mergedAttrs = Vi(t.mergedAttrs, t.attrs)
            }

            function u_(e, n, t, r, o, i) {
                for (let c = 0; c < r.length; c++) Ld(ul(t, n), e, r[c].type);
                ! function YN(e, n, t) {
                    e.flags |= 1, e.directiveStart = n, e.directiveEnd = n + t, e.providerIndexes = n
                }(t, e.data.length, r.length);
                for (let c = 0; c < r.length; c++) {
                    const u = r[c];
                    u.providersResolver && u.providersResolver(u)
                }
                let s = !1,
                    a = !1,
                    l = ds(e, n, r.length, null);
                for (let c = 0; c < r.length; c++) {
                    const u = r[c];
                    t.mergedAttrs = Vi(t.mergedAttrs, u.hostAttrs), XN(e, t, n, l, u), QN(l, u, o), null !== u.contentQueries && (t.flags |= 4), (null !== u.hostBindings || null !== u.hostAttrs || 0 !== u.hostVars) && (t.flags |= 64);
                    const d = u.type.prototype;
                    !s && (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) && ((e.preOrderHooks ??= []).push(t.index), s = !0), !a && (d.ngOnChanges || d.ngDoCheck) && ((e.preOrderCheckHooks ??= []).push(t.index), a = !0), l++
                }! function jN(e, n, t) {
                    const o = n.directiveEnd,
                        i = e.data,
                        s = n.attrs,
                        a = [];
                    let l = null,
                        c = null;
                    for (let u = n.directiveStart; u < o; u++) {
                        const d = i[u],
                            f = t ? t.get(d) : null,
                            p = f ? f.outputs : null;
                        l = l_(0, d.inputs, u, l, f ? f.inputs : null), c = l_(1, d.outputs, u, c, p);
                        const g = null === l || null === s || od(n) ? null : eO(l, u, s);
                        a.push(g)
                    }
                    null !== l && (l.hasOwnProperty("class") && (n.flags |= 8), l.hasOwnProperty("style") && (n.flags |= 16)), n.initialInputs = a, n.inputs = l, n.outputs = c
                }(e, t, i)
            }

            function d_(e, n, t) {
                const r = t.directiveStart,
                    o = t.directiveEnd,
                    i = t.index,
                    s = function mT() {
                        return k.lFrame.currentDirectiveIndex
                    }();
                try {
                    Lr(i);
                    for (let a = r; a < o; a++) {
                        const l = e.data[a],
                            c = n[a];
                        xd(a), (null !== l.hostBindings || 0 !== l.hostVars || null !== l.hostAttrs) && qN(l, c)
                    }
                } finally {
                    Lr(-1), xd(s)
                }
            }

            function qN(e, n) {
                null !== e.hostBindings && e.hostBindings(1, n)
            }

            function Tf(e, n, t) {
                n.componentOffset = t, (e.components ??= []).push(n.index)
            }

            function QN(e, n, t) {
                if (t) {
                    if (n.exportAs)
                        for (let r = 0; r < n.exportAs.length; r++) t[n.exportAs[r]] = e;
                    en(n) && (t[""] = e)
                }
            }

            function XN(e, n, t, r, o) {
                e.data[r] = o;
                const i = o.factory || (o.factory = Nr(o.type)),
                    s = new Yi(i, en(o), D);
                e.blueprint[r] = s, t[r] = s,
                    function HN(e, n, t, r, o) {
                        const i = o.hostBindings;
                        if (i) {
                            let s = e.hostBindingOpCodes;
                            null === s && (s = e.hostBindingOpCodes = []);
                            const a = ~n.index;
                            (function zN(e) {
                                let n = e.length;
                                for (; n > 0;) {
                                    const t = e[--n];
                                    if ("number" == typeof t && t < 0) return t
                                }
                                return 0
                            })(s) != a && s.push(a), s.push(t, r, i)
                        }
                    }(e, n, r, ds(e, t, o.hostVars, $), o)
            }

            function Cn(e, n, t, r, o, i) {
                const s = at(e, n);
                ! function Af(e, n, t, r, o, i, s) {
                    if (null == i) e.removeAttribute(n, o, t);
                    else {
                        const a = null == s ? V(i) : s(i, r || "", o);
                        e.setAttribute(n, o, a, t)
                    }
                }(n[P], s, i, e.value, t, r, o)
            }

            function JN(e, n, t, r, o, i) {
                const s = i[n];
                if (null !== s)
                    for (let a = 0; a < s.length;) o_(r, t, s[a++], s[a++], s[a++], s[a++])
            }

            function eO(e, n, t) {
                let r = null,
                    o = 0;
                for (; o < t.length;) {
                    const i = t[o];
                    if (0 !== i)
                        if (5 !== i) {
                            if ("number" == typeof i) break;
                            if (e.hasOwnProperty(i)) {
                                null === r && (r = []);
                                const s = e[i];
                                for (let a = 0; a < s.length; a += 3)
                                    if (s[a] === n) {
                                        r.push(i, s[a + 1], s[a + 2], t[o + 1]);
                                        break
                                    }
                            }
                            o += 2
                        } else o += 2;
                    else o += 4
                }
                return r
            }

            function f_(e, n, t, r) {
                return [e, !0, 0, n, null, r, null, t, null, null]
            }

            function h_(e, n) {
                const t = e.contentQueries;
                if (null !== t) {
                    const r = z(null);
                    try {
                        for (let o = 0; o < t.length; o += 2) {
                            const s = t[o + 1];
                            if (-1 !== s) {
                                const a = e.data[s];
                                ol(t[o]), a.contentQueries(2, n[s], s)
                            }
                        }
                    } finally {
                        z(r)
                    }
                }
            }

            function Fl(e, n) {
                return e[Ui] ? e[Xm][Kt] = n : e[Ui] = n, e[Xm] = n, n
            }

            function Nf(e, n, t) {
                ol(0);
                const r = z(null);
                try {
                    n(e, t)
                } finally {
                    z(r)
                }
            }

            function p_(e) {
                return e[_o] || (e[_o] = [])
            }

            function g_(e) {
                return e.cleanup || (e.cleanup = [])
            }

            function Ll(e, n) {
                const t = e[Qe],
                    r = t ? t.get(vn, null) : null;
                r && r.handleError(n)
            }

            function Of(e, n, t, r, o) {
                for (let i = 0; i < t.length;) {
                    const s = t[i++],
                        a = t[i++],
                        l = t[i++];
                    o_(e.data[s], n[s], r, a, l, o)
                }
            }

            function tO(e, n) {
                const t = Nt(n, e),
                    r = t[b];
                ! function nO(e, n) {
                    for (let t = n.length; t < e.blueprint.length; t++) n.push(e.blueprint[t])
                }(r, t);
                const o = t[De];
                null !== o && null === t[Tt] && (t[Tt] = ef(o, t[Qe])), Rf(r, t, t[fe])
            }

            function Rf(e, n, t) {
                Ad(n);
                try {
                    const r = e.viewQuery;
                    null !== r && Nf(1, r, t);
                    const o = e.template;
                    null !== o && i_(e, n, o, 1, t), e.firstCreatePass && (e.firstCreatePass = !1), n[Vn]?.finishViewCreation(e), e.staticContentQueries && h_(e, n), e.staticViewQueries && Nf(2, e.viewQuery, t);
                    const i = e.components;
                    null !== i && function rO(e, n) {
                        for (let t = 0; t < n.length; t++) tO(e, n[t])
                    }(n, i)
                } catch (r) {
                    throw e.firstCreatePass && (e.incompleteFirstPass = !0, e.firstCreatePass = !1), r
                } finally {
                    n[S] &= -5, Nd()
                }
            }

            function fs(e, n, t, r) {
                const o = z(null);
                try {
                    const i = n.tView,
                        l = kl(e, i, t, 4096 & e[S] ? 4096 : 16, null, n, null, null, r?.injector ?? null, r?.embeddedViewInjector ?? null, r?.dehydratedView ?? null);
                    l[Bi] = e[n.index];
                    const u = e[Vn];
                    return null !== u && (l[Vn] = u.createEmbeddedView(i)), Rf(i, l, t), l
                } finally {
                    z(o)
                }
            }

            function y_(e, n) {
                const t = Se + n;
                if (t < e.length) return e[t]
            }

            function Fo(e, n) {
                return !n || null === n.firstChild || pl(e)
            }

            function hs(e, n, t, r = !0) {
                const o = n[b];
                if (function DN(e, n, t, r) {
                        const o = Se + r,
                            i = t.length;
                        r > 0 && (t[o - 1][Kt] = n), r < i - Se ? (n[Kt] = t[o], Om(t, Se + r, n)) : (t.push(n), n[Kt] = null), n[xe] = t;
                        const s = n[Bi];
                        null !== s && t !== s && function wN(e, n) {
                            const t = e[wo];
                            n[Ee] !== n[xe][xe][Ee] && (e[S] |= pd.HasTransplantedViews), null === t ? e[wo] = [n] : t.push(n)
                        }(s, n);
                        const a = n[Vn];
                        null !== a && a.insertView(e), bd(n), n[S] |= 128
                    }(o, n, e, t), r) {
                    const s = Df(t, e),
                        a = n[P],
                        l = Ol(a, e[fn]);
                    null !== l && function _N(e, n, t, r, o, i) {
                        r[De] = o, r[Ke] = n, Pl(e, r, t, 1, o, i)
                    }(o, e[Ke], a, n, l, s)
                }
                const i = n[Tt];
                null !== i && null !== i.firstChild && (i.firstChild = null)
            }

            function Pf(e, n) {
                const t = ls(e, n);
                return void 0 !== t && Nl(t[b], t), t
            }

            function ps(e, n, t, r, o = !1) {
                for (; null !== t;) {
                    const i = n[t.index];
                    null !== i && r.push(ae(i)), et(i) && v_(i, r);
                    const s = t.type;
                    if (8 & s) ps(e, n, t.child, r);
                    else if (32 & s) {
                        const a = gf(t, n);
                        let l;
                        for (; l = a();) r.push(l)
                    } else if (16 & s) {
                        const a = Xv(n, t);
                        if (Array.isArray(a)) r.push(...a);
                        else {
                            const l = Fr(n[Ee]);
                            ps(l[b], l, a, r, !0)
                        }
                    }
                    t = o ? t.projectionNext : t.next
                }
                return r
            }

            function v_(e, n) {
                for (let t = Se; t < e.length; t++) {
                    const r = e[t],
                        o = r[b].firstChild;
                    null !== o && ps(r[b], r, o, n)
                }
                e[fn] !== e[De] && n.push(e[fn])
            }
            let __ = [];
            const aO = {
                    version: 0,
                    lastCleanEpoch: 0,
                    dirty: !1,
                    producerNode: void 0,
                    producerLastReadVersion: void 0,
                    producerIndexOfThis: void 0,
                    nextProducerIndex: 0,
                    liveConsumerNode: void 0,
                    liveConsumerIndexOfThis: void 0,
                    consumerAllowSignalWrites: !1,
                    consumerIsAlwaysLive: !1,
                    producerMustRecompute: () => !1,
                    producerRecomputeValue: () => {},
                    consumerMarkedDirty: () => {},
                    consumerOnSignalRead: () => {},
                    consumerIsAlwaysLive: !0,
                    consumerMarkedDirty: e => {
                        Wi(e.lView)
                    },
                    consumerOnSignalRead() {
                        this.lView[Pr] = this
                    }
                },
                C_ = 100;

            function Vl(e, n = !0, t = 0) {
                const r = e[Jt],
                    o = r.rendererFactory;
                o.begin?.();
                try {
                    ! function lO(e, n) {
                        kf(e, n);
                        let t = 0;
                        for (; wd(e);) {
                            if (t === C_) throw new C(103, !1);
                            t++, kf(e, 1)
                        }
                    }(e, t)
                } catch (s) {
                    throw n && Ll(e, s), s
                } finally {
                    o.end?.(), r.inlineEffectRunner?.flush()
                }
            }

            function cO(e, n, t, r) {
                const o = n[S];
                if (!(256 & ~o)) return;
                n[Jt].inlineEffectRunner?.flush(), Ad(n);
                let s = null,
                    a = null;
                (function uO(e) {
                    return 2 !== e.type
                })(e) && (a = function oO(e) {
                    return e[Pr] ?? function iO(e) {
                        const n = __.pop() ?? Object.create(aO);
                        return n.lView = e, n
                    }(e)
                }(n), s = function rm(e) {
                    return e && (e.nextProducerIndex = 0), z(e)
                }(a));
                try {
                    cy(n),
                        function gy(e) {
                            return k.lFrame.bindingIndex = e
                        }(e.bindingStartIndex), null !== t && i_(e, n, t, 2, r);
                    const l = !(3 & ~o);
                    if (l) {
                        const d = e.preOrderCheckHooks;
                        null !== d && al(n, d, null)
                    } else {
                        const d = e.preOrderHooks;
                        null !== d && ll(n, d, 0, null), Od(n, 0)
                    }
                    if (function dO(e) {
                            for (let n = tv(e); null !== n; n = nv(n)) {
                                if (!(n[S] & pd.HasTransplantedViews)) continue;
                                const t = n[wo];
                                for (let r = 0; r < t.length; r++) {
                                    oT(t[r])
                                }
                            }
                        }(n), D_(n, 0), null !== e.contentQueries && h_(e, n), l) {
                        const d = e.contentCheckHooks;
                        null !== d && al(n, d)
                    } else {
                        const d = e.contentHooks;
                        null !== d && ll(n, d, 1), Od(n, 1)
                    }! function NN(e, n) {
                        const t = e.hostBindingOpCodes;
                        if (null !== t) try {
                            for (let r = 0; r < t.length; r++) {
                                const o = t[r];
                                if (o < 0) Lr(~o);
                                else {
                                    const i = o,
                                        s = t[++r],
                                        a = t[++r];
                                    gT(s, i), a(2, n[i])
                                }
                            }
                        } finally {
                            Lr(-1)
                        }
                    }(e, n);
                    const c = e.components;
                    null !== c && b_(n, c, 0);
                    const u = e.viewQuery;
                    if (null !== u && Nf(2, u, r), l) {
                        const d = e.viewCheckHooks;
                        null !== d && al(n, d)
                    } else {
                        const d = e.viewHooks;
                        null !== d && ll(n, d, 2), Od(n, 2)
                    }
                    if (!0 === e.firstUpdatePass && (e.firstUpdatePass = !1), n[el]) {
                        for (const d of n[el]) d();
                        n[el] = null
                    }
                    n[S] &= -73
                } catch (l) {
                    throw Wi(n), l
                } finally {
                    null !== a && (function om(e, n) {
                        if (z(n), e && void 0 !== e.producerNode && void 0 !== e.producerIndexOfThis && void 0 !== e.producerLastReadVersion) {
                            if (Oi(e))
                                for (let t = e.nextProducerIndex; t < e.producerNode.length; t++) Aa(e.producerNode[t], e.producerIndexOfThis[t]);
                            for (; e.producerNode.length > e.nextProducerIndex;) e.producerNode.pop(), e.producerLastReadVersion.pop(), e.producerIndexOfThis.pop()
                        }
                    }(a, s), function sO(e) {
                        e.lView[Pr] !== e && (e.lView = null, __.push(e))
                    }(a)), Nd()
                }
            }

            function D_(e, n) {
                for (let t = tv(e); null !== t; t = nv(t))
                    for (let r = Se; r < t.length; r++) w_(t[r], n)
            }

            function fO(e, n, t) {
                w_(Nt(n, e), t)
            }

            function w_(e, n) {
                Dd(e) && kf(e, n)
            }

            function kf(e, n) {
                const r = e[b],
                    o = e[S],
                    i = e[Pr];
                let s = !!(0 === n && 16 & o);
                if (s ||= !!(64 & o && 0 === n), s ||= !!(1024 & o), s ||= !(!i?.dirty || !Au(i)), i && (i.dirty = !1), e[S] &= -9217, s) cO(r, e, r.template, e[fe]);
                else if (8192 & o) {
                    D_(e, 1);
                    const a = r.components;
                    null !== a && b_(e, a, 1)
                }
            }

            function b_(e, n, t) {
                for (let r = 0; r < n.length; r++) fO(e, n[r], t)
            }

            function gs(e) {
                for (e[Jt].changeDetectionScheduler?.notify(); e;) {
                    e[S] |= 64;
                    const n = Fr(e);
                    if (md(e) && !n) return e;
                    e = n
                }
                return null
            }
            class ms {
                get rootNodes() {
                    const n = this._lView,
                        t = n[b];
                    return ps(t, n, t.firstChild, [])
                }
                constructor(n, t, r = !0) {
                    this._lView = n, this._cdRefInjectingView = t, this.notifyErrorHandler = r, this._appRef = null, this._attachedToViewContainer = !1
                }
                get context() {
                    return this._lView[fe]
                }
                set context(n) {
                    this._lView[fe] = n
                }
                get destroyed() {
                    return !(256 & ~this._lView[S])
                }
                destroy() {
                    if (this._appRef) this._appRef.detachView(this);
                    else if (this._attachedToViewContainer) {
                        const n = this._lView[xe];
                        if (et(n)) {
                            const t = n[8],
                                r = t ? t.indexOf(this) : -1;
                            r > -1 && (ls(n, r), za(t, r))
                        }
                        this._attachedToViewContainer = !1
                    }
                    Nl(this._lView[b], this._lView)
                }
                onDestroy(n) {
                    rl(this._lView, n)
                }
                markForCheck() {
                    gs(this._cdRefInjectingView || this._lView)
                }
                detach() {
                    this._lView[S] &= -129
                }
                reattach() {
                    bd(this._lView), this._lView[S] |= 128
                }
                detectChanges() {
                    this._lView[S] |= 1024, Vl(this._lView, this.notifyErrorHandler)
                }
                checkNoChanges() {}
                attachToViewContainerRef() {
                    if (this._appRef) throw new C(902, !1);
                    this._attachedToViewContainer = !0
                }
                detachFromAppRef() {
                    this._appRef = null, Bv(this._lView[b], this._lView)
                }
                attachToAppRef(n) {
                    if (this._attachedToViewContainer) throw new C(902, !1);
                    this._appRef = n, bd(this._lView)
                }
            }
            let qn = (() => {
                class e {
                    static #e = this.__NG_ELEMENT_ID__ = gO
                }
                return e
            })();
            const hO = qn,
                pO = class extends hO {
                    constructor(n, t, r) {
                        super(), this._declarationLView = n, this._declarationTContainer = t, this.elementRef = r
                    }
                    get ssrId() {
                        return this._declarationTContainer.tView?.ssrId || null
                    }
                    createEmbeddedView(n, t) {
                        return this.createEmbeddedViewImpl(n, t)
                    }
                    createEmbeddedViewImpl(n, t, r) {
                        const o = fs(this._declarationLView, this._declarationTContainer, n, {
                            embeddedViewInjector: t,
                            dehydratedView: r
                        });
                        return new ms(o)
                    }
                };

            function gO() {
                return jl(ie(), _())
            }

            function jl(e, n) {
                return 4 & e.type ? new pO(n, e, To(e, n)) : null
            }
            let T_ = () => null;

            function Lo(e, n) {
                return T_(e, n)
            }
            class Uf {}
            class jO {}
            class A_ {}
            class UO {
                resolveComponentFactory(n) {
                    throw function $O(e) {
                        const n = Error(`No component factory found for ${Ve(e)}.`);
                        return n.ngComponent = e, n
                    }(n)
                }
            }
            let zl = (() => {
                class e {
                    static #e = this.NULL = new UO
                }
                return e
            })();
            class O_ {}
            let Dn = (() => {
                    class e {
                        constructor() {
                            this.destroyNode = null
                        }
                        static #e = this.__NG_ELEMENT_ID__ = () => function BO() {
                            const e = _(),
                                t = Nt(ie().index, e);
                            return (Je(t) ? t : e)[P]
                        }()
                    }
                    return e
                })(),
                HO = (() => {
                    class e {
                        static #e = this.\u0275prov = I({
                            token: e,
                            providedIn: "root",
                            factory: () => null
                        })
                    }
                    return e
                })();
            const Bf = {},
                R_ = new Set;

            function wn(e) {
                R_.has(e) || (R_.add(e), performance?.mark?.("mark_feature_usage", {
                    detail: {
                        feature: e
                    }
                }))
            }

            function P_(...e) {}
            class J {
                constructor({
                    enableLongStackTrace: n = !1,
                    shouldCoalesceEventChangeDetection: t = !1,
                    shouldCoalesceRunChangeDetection: r = !1
                }) {
                    if (this.hasPendingMacrotasks = !1, this.hasPendingMicrotasks = !1, this.isStable = !0, this.onUnstable = new _e(!1), this.onMicrotaskEmpty = new _e(!1), this.onStable = new _e(!1), this.onError = new _e(!1), typeof Zone > "u") throw new C(908, !1);
                    Zone.assertZonePatched();
                    const o = this;
                    o._nesting = 0, o._outer = o._inner = Zone.current, Zone.TaskTrackingZoneSpec && (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec)), n && Zone.longStackTraceZoneSpec && (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)), o.shouldCoalesceEventChangeDetection = !r && t, o.shouldCoalesceRunChangeDetection = r, o.lastRequestAnimationFrameId = -1, o.nativeRequestAnimationFrame = function zO() {
                            const e = "function" == typeof re.requestAnimationFrame;
                            let n = re[e ? "requestAnimationFrame" : "setTimeout"],
                                t = re[e ? "cancelAnimationFrame" : "clearTimeout"];
                            if (typeof Zone < "u" && n && t) {
                                const r = n[Zone.__symbol__("OriginalDelegate")];
                                r && (n = r);
                                const o = t[Zone.__symbol__("OriginalDelegate")];
                                o && (t = o)
                            }
                            return {
                                nativeRequestAnimationFrame: n,
                                nativeCancelAnimationFrame: t
                            }
                        }().nativeRequestAnimationFrame,
                        function WO(e) {
                            const n = () => {
                                ! function qO(e) {
                                    e.isCheckStableRunning || -1 !== e.lastRequestAnimationFrameId || (e.lastRequestAnimationFrameId = e.nativeRequestAnimationFrame.call(re, () => {
                                        e.fakeTopEventTask || (e.fakeTopEventTask = Zone.root.scheduleEventTask("fakeTopEventTask", () => {
                                            e.lastRequestAnimationFrameId = -1, zf(e), e.isCheckStableRunning = !0, Hf(e), e.isCheckStableRunning = !1
                                        }, void 0, () => {}, () => {})), e.fakeTopEventTask.invoke()
                                    }), zf(e))
                                }(e)
                            };
                            e._inner = e._inner.fork({
                                name: "angular",
                                properties: {
                                    isAngularZone: !0
                                },
                                onInvokeTask: (t, r, o, i, s, a) => {
                                    if (function ZO(e) {
                                            return !(!Array.isArray(e) || 1 !== e.length) && !0 === e[0].data?.__ignore_ng_zone__
                                        }(a)) return t.invokeTask(o, i, s, a);
                                    try {
                                        return k_(e), t.invokeTask(o, i, s, a)
                                    } finally {
                                        (e.shouldCoalesceEventChangeDetection && "eventTask" === i.type || e.shouldCoalesceRunChangeDetection) && n(), F_(e)
                                    }
                                },
                                onInvoke: (t, r, o, i, s, a, l) => {
                                    try {
                                        return k_(e), t.invoke(o, i, s, a, l)
                                    } finally {
                                        e.shouldCoalesceRunChangeDetection && n(), F_(e)
                                    }
                                },
                                onHasTask: (t, r, o, i) => {
                                    t.hasTask(o, i), r === o && ("microTask" == i.change ? (e._hasPendingMicrotasks = i.microTask, zf(e), Hf(e)) : "macroTask" == i.change && (e.hasPendingMacrotasks = i.macroTask))
                                },
                                onHandleError: (t, r, o, i) => (t.handleError(o, i), e.runOutsideAngular(() => e.onError.emit(i)), !1)
                            })
                        }(o)
                }
                static isInAngularZone() {
                    return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone")
                }
                static assertInAngularZone() {
                    if (!J.isInAngularZone()) throw new C(909, !1)
                }
                static assertNotInAngularZone() {
                    if (J.isInAngularZone()) throw new C(909, !1)
                }
                run(n, t, r) {
                    return this._inner.run(n, t, r)
                }
                runTask(n, t, r, o) {
                    const i = this._inner,
                        s = i.scheduleEventTask("NgZoneEvent: " + o, n, GO, P_, P_);
                    try {
                        return i.runTask(s, t, r)
                    } finally {
                        i.cancelTask(s)
                    }
                }
                runGuarded(n, t, r) {
                    return this._inner.runGuarded(n, t, r)
                }
                runOutsideAngular(n) {
                    return this._outer.run(n)
                }
            }
            const GO = {};

            function Hf(e) {
                if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable) try {
                    e._nesting++, e.onMicrotaskEmpty.emit(null)
                } finally {
                    if (e._nesting--, !e.hasPendingMicrotasks) try {
                        e.runOutsideAngular(() => e.onStable.emit(null))
                    } finally {
                        e.isStable = !0
                    }
                }
            }

            function zf(e) {
                e.hasPendingMicrotasks = !!(e._hasPendingMicrotasks || (e.shouldCoalesceEventChangeDetection || e.shouldCoalesceRunChangeDetection) && -1 !== e.lastRequestAnimationFrameId)
            }

            function k_(e) {
                e._nesting++, e.isStable && (e.isStable = !1, e.onUnstable.emit(null))
            }

            function F_(e) {
                e._nesting--, Hf(e)
            }
            class L_ {
                constructor() {
                    this.hasPendingMicrotasks = !1, this.hasPendingMacrotasks = !1, this.isStable = !0, this.onUnstable = new _e, this.onMicrotaskEmpty = new _e, this.onStable = new _e, this.onError = new _e
                }
                run(n, t, r) {
                    return n.apply(t, r)
                }
                runGuarded(n, t, r) {
                    return n.apply(t, r)
                }
                runOutsideAngular(n) {
                    return n()
                }
                runTask(n, t, r, o) {
                    return n.apply(t, r)
                }
            }
            var Ur = function(e) {
                return e[e.EarlyRead = 0] = "EarlyRead", e[e.Write = 1] = "Write", e[e.MixedReadWrite = 2] = "MixedReadWrite", e[e.Read = 3] = "Read", e
            }(Ur || {});
            const V_ = {
                destroy() {}
            };

            function j_(e, n) {
                !n && function Ka(e) {
                    if (!Qm()) throw new C(-203, !1)
                }();
                const t = n?.injector ?? w(ct);
                if (! function ar(e) {
                        return "browser" === (e ?? w(ct)).get(Hn)
                    }(t)) return V_;
                wn("NgAfterNextRender");
                const r = t.get(Ds),
                    o = r.handler ??= new U_,
                    i = n?.phase ?? Ur.MixedReadWrite,
                    s = () => {
                        o.unregister(l), a()
                    },
                    a = t.get(So).onDestroy(s),
                    l = dn(t, () => new $_(i, () => {
                        s(), e()
                    }));
                return o.register(l), {
                    destroy: s
                }
            }
            class $_ {
                constructor(n, t) {
                    this.phase = n, this.callbackFn = t, this.zone = w(J), this.errorHandler = w(vn, {
                        optional: !0
                    }), w(Uf, {
                        optional: !0
                    })?.notify(1)
                }
                invoke() {
                    try {
                        this.zone.runOutsideAngular(this.callbackFn)
                    } catch (n) {
                        this.errorHandler?.handleError(n)
                    }
                }
            }
            class U_ {
                constructor() {
                    this.executingCallbacks = !1, this.buckets = {
                        [Ur.EarlyRead]: new Set,
                        [Ur.Write]: new Set,
                        [Ur.MixedReadWrite]: new Set,
                        [Ur.Read]: new Set
                    }, this.deferredCallbacks = new Set
                }
                register(n) {
                    (this.executingCallbacks ? this.deferredCallbacks : this.buckets[n.phase]).add(n)
                }
                unregister(n) {
                    this.buckets[n.phase].delete(n), this.deferredCallbacks.delete(n)
                }
                execute() {
                    this.executingCallbacks = !0;
                    for (const n of Object.values(this.buckets))
                        for (const t of n) t.invoke();
                    this.executingCallbacks = !1;
                    for (const n of this.deferredCallbacks) this.buckets[n.phase].add(n);
                    this.deferredCallbacks.clear()
                }
                destroy() {
                    for (const n of Object.values(this.buckets)) n.clear();
                    this.deferredCallbacks.clear()
                }
            }
            let Ds = (() => {
                class e {
                    constructor() {
                        this.handler = null, this.internalCallbacks = []
                    }
                    execute() {
                        this.executeInternalCallbacks(), this.handler?.execute()
                    }
                    executeInternalCallbacks() {
                        const t = [...this.internalCallbacks];
                        this.internalCallbacks.length = 0;
                        for (const r of t) r()
                    }
                    ngOnDestroy() {
                        this.handler?.destroy(), this.handler = null, this.internalCallbacks.length = 0
                    }
                    static #e = this.\u0275prov = I({
                        token: e,
                        providedIn: "root",
                        factory: () => new e
                    })
                }
                return e
            })();

            function ql(e, n, t) {
                let r = t ? e.styles : null,
                    o = t ? e.classes : null,
                    i = 0;
                if (null !== n)
                    for (let s = 0; s < n.length; s++) {
                        const a = n[s];
                        "number" == typeof a ? i = a : 1 == i ? o = Uu(o, a) : 2 == i && (r = Uu(r, a + ": " + n[++s] + ";"))
                    }
                t ? e.styles = r : e.stylesWithoutHost = r, t ? e.classes = o : e.classesWithoutHost = o
            }
            class z_ extends zl {
                constructor(n) {
                    super(), this.ngModule = n
                }
                resolveComponentFactory(n) {
                    const t = G(n);
                    return new Es(t, this.ngModule)
                }
            }

            function G_(e) {
                const n = [];
                for (const t in e) {
                    if (!e.hasOwnProperty(t)) continue;
                    const r = e[t];
                    void 0 !== r && n.push({
                        propName: Array.isArray(r) ? r[0] : r,
                        templateName: t
                    })
                }
                return n
            }
            class Wl {
                constructor(n, t) {
                    this.injector = n, this.parentInjector = t
                }
                get(n, t, r) {
                    r = Ua(r);
                    const o = this.injector.get(n, Bf, r);
                    return o !== Bf || t === Bf ? o : this.parentInjector.get(n, t, r)
                }
            }
            class Es extends A_ {
                get inputs() {
                    const n = this.componentDef,
                        t = n.inputTransforms,
                        r = G_(n.inputs);
                    if (null !== t)
                        for (const o of r) t.hasOwnProperty(o.propName) && (o.transform = t[o.propName]);
                    return r
                }
                get outputs() {
                    return G_(this.componentDef.outputs)
                }
                constructor(n, t) {
                    super(), this.componentDef = n, this.ngModule = t, this.componentType = n.type, this.selector = function wS(e) {
                        return e.map(DS).join(",")
                    }(n.selectors), this.ngContentSelectors = n.ngContentSelectors ? n.ngContentSelectors : [], this.isBoundToModule = !!t
                }
                create(n, t, r, o) {
                    const i = z(null);
                    try {
                        let s = (o = o || this.ngModule) instanceof vt ? o : o?.injector;
                        s && null !== this.componentDef.getStandaloneInjector && (s = this.componentDef.getStandaloneInjector(s) || s);
                        const a = s ? new Wl(n, s) : n,
                            l = a.get(O_, null);
                        if (null === l) throw new C(407, !1);
                        const c = a.get(HO, null),
                            f = {
                                rendererFactory: l,
                                sanitizer: c,
                                inlineEffectRunner: null,
                                afterRenderEventManager: a.get(Ds, null),
                                changeDetectionScheduler: a.get(Uf, null)
                            },
                            h = l.createRenderer(null, this.componentDef),
                            p = this.componentDef.selectors[0][0] || "div",
                            g = r ? function RN(e, n, t, r) {
                                const i = r.get(vv, !1) || t === Yt.ShadowDom,
                                    s = e.selectRootElement(n, i);
                                return function PN(e) {
                                    a_(e)
                                }(s), s
                            }(h, r, this.componentDef.encapsulation, a) : Al(h, p, function JO(e) {
                                const n = e.toLowerCase();
                                return "svg" === n ? sy : "math" === n ? "math" : null
                            }(p));
                        let m = 512;
                        this.componentDef.signals ? m |= 4096 : this.componentDef.onPush || (m |= 16);
                        let y = null;
                        null !== g && (y = ef(g, a, !0));
                        const v = xf(0, null, null, 1, 0, null, null, null, null, null, null),
                            E = kl(null, v, null, m, null, null, f, h, a, null, y);
                        let T, B;
                        Ad(E);
                        try {
                            const ne = this.componentDef;
                            let We, er = null;
                            ne.findHostDirectiveDefs ? (We = [], er = new Map, ne.findHostDirectiveDefs(ne, We, er), We.push(ne)) : We = [ne];
                            const mx = function t1(e, n) {
                                    const t = e[b],
                                        r = j;
                                    return e[r] = n, ko(t, r, 2, "#host", null)
                                }(E, g),
                                y5 = function n1(e, n, t, r, o, i, s) {
                                    const a = o[b];
                                    ! function r1(e, n, t, r) {
                                        for (const o of e) n.mergedAttrs = Vi(n.mergedAttrs, o.hostAttrs);
                                        null !== n.mergedAttrs && (ql(n, n.mergedAttrs, !0), null !== t && t_(r, t, n))
                                    }(r, e, n, s);
                                    let l = null;
                                    null !== n && (l = ef(n, o[Qe]));
                                    const c = i.rendererFactory.createRenderer(n, t);
                                    let u = 16;
                                    t.signals ? u = 4096 : t.onPush && (u = 64);
                                    const d = kl(o, s_(t), null, u, o[e.index], e, i, c, null, null, l);
                                    return a.firstCreatePass && Tf(a, e, r.length - 1), Fl(o, d), o[e.index] = d
                                }(mx, g, ne, We, E, f, h);
                            B = qi(v, j), g && function i1(e, n, t, r) {
                                if (r) rd(e, t, ["ng-version", "17.3.4"]);
                                else {
                                    const {
                                        attrs: o,
                                        classes: i
                                    } = function bS(e) {
                                        const n = [],
                                            t = [];
                                        let r = 1,
                                            o = 2;
                                        for (; r < e.length;) {
                                            let i = e[r];
                                            if ("string" == typeof i) 2 === o ? "" !== i && n.push(i, e[++r]) : 8 === o && t.push(i);
                                            else {
                                                if (!Xt(o)) break;
                                                o = i
                                            }
                                            r++
                                        }
                                        return {
                                            attrs: n,
                                            classes: t
                                        }
                                    }(n.selectors[0]);
                                    o && rd(e, t, o), i && i.length > 0 && e_(e, t, i.join(" "))
                                }
                            }(h, ne, g, r), void 0 !== t && function s1(e, n, t) {
                                const r = e.projection = [];
                                for (let o = 0; o < n.length; o++) {
                                    const i = t[o];
                                    r.push(null != i ? Array.from(i) : null)
                                }
                            }(B, this.ngContentSelectors, t), T = function o1(e, n, t, r, o, i) {
                                const s = ie(),
                                    a = o[b],
                                    l = at(s, o);
                                u_(a, o, s, t, null, r);
                                for (let u = 0; u < t.length; u++) nt(Vr(o, a, s.directiveStart + u, s), o);
                                d_(a, o, s), l && nt(l, o);
                                const c = Vr(o, a, s.directiveStart + s.componentOffset, s);
                                if (e[fe] = o[fe] = c, null !== i)
                                    for (const u of i) u(c, n);
                                return Ef(a, s, o), c
                            }(y5, ne, We, er, E, [a1]), Rf(v, E, null)
                        } finally {
                            Nd()
                        }
                        return new e1(this.componentType, T, To(B, E), E, B)
                    } finally {
                        z(i)
                    }
                }
            }
            class e1 extends jO {
                constructor(n, t, r, o, i) {
                    super(), this.location = r, this._rootLView = o, this._tNode = i, this.previousInputValues = null, this.instance = t, this.hostView = this.changeDetectorRef = new ms(o, void 0, !1), this.componentType = n
                }
                setInput(n, t) {
                    const r = this._tNode.inputs;
                    let o;
                    if (null !== r && (o = r[n])) {
                        if (this.previousInputValues ??= new Map, this.previousInputValues.has(n) && Object.is(this.previousInputValues.get(n), t)) return;
                        const i = this._rootLView;
                        Of(i[b], i, o, n, t), this.previousInputValues.set(n, t), gs(Nt(this._tNode.index, i))
                    }
                }
                get injector() {
                    return new Ue(this._tNode, this._rootLView)
                }
                destroy() {
                    this.hostView.destroy()
                }
                onDestroy(n) {
                    this.hostView.onDestroy(n)
                }
            }

            function a1() {
                const e = ie();
                sl(_()[b], e)
            }
            let kt = (() => {
                class e {
                    static #e = this.__NG_ELEMENT_ID__ = l1
                }
                return e
            })();

            function l1() {
                return Z_(ie(), _())
            }
            const c1 = kt,
                q_ = class extends c1 {
                    constructor(n, t, r) {
                        super(), this._lContainer = n, this._hostTNode = t, this._hostLView = r
                    }
                    get element() {
                        return To(this._hostTNode, this._hostLView)
                    }
                    get injector() {
                        return new Ue(this._hostTNode, this._hostLView)
                    }
                    get parentInjector() {
                        const n = dl(this._hostTNode, this._hostLView);
                        if (Pd(n)) {
                            const t = Ki(n, this._hostLView),
                                r = Xi(n);
                            return new Ue(t[b].data[r + 8], t)
                        }
                        return new Ue(null, this._hostLView)
                    }
                    clear() {
                        for (; this.length > 0;) this.remove(this.length - 1)
                    }
                    get(n) {
                        const t = W_(this._lContainer);
                        return null !== t && t[n] || null
                    }
                    get length() {
                        return this._lContainer.length - Se
                    }
                    createEmbeddedView(n, t, r) {
                        let o, i;
                        "number" == typeof r ? o = r : null != r && (o = r.index, i = r.injector);
                        const s = Lo(this._lContainer, n.ssrId),
                            a = n.createEmbeddedViewImpl(t || {}, i, s);
                        return this.insertImpl(a, o, Fo(this._hostTNode, s)), a
                    }
                    createComponent(n, t, r, o, i) {
                        const s = n && ! function $i(e) {
                            return "function" == typeof e
                        }(n);
                        let a;
                        if (s) a = t;
                        else {
                            const p = t || {};
                            a = p.index, r = p.injector, o = p.projectableNodes, i = p.environmentInjector || p.ngModuleRef
                        }
                        const l = s ? n : new Es(G(n)),
                            c = r || this.parentInjector;
                        if (!i && null == l.ngModule) {
                            const g = (s ? c : this.parentInjector).get(vt, null);
                            g && (i = g)
                        }
                        const u = G(l.componentType ?? {}),
                            d = Lo(this._lContainer, u?.id ?? null),
                            h = l.create(c, o, d?.firstChild ?? null, i);
                        return this.insertImpl(h.hostView, a, Fo(this._hostTNode, d)), h
                    }
                    insert(n, t) {
                        return this.insertImpl(n, t, !0)
                    }
                    insertImpl(n, t, r) {
                        const o = n._lView;
                        if (function rT(e) {
                                return et(e[xe])
                            }(o)) {
                            const a = this.indexOf(n);
                            if (-1 !== a) this.detach(a);
                            else {
                                const l = o[xe],
                                    c = new q_(l, l[Ke], l[xe]);
                                c.detach(c.indexOf(n))
                            }
                        }
                        const i = this._adjustIndex(t),
                            s = this._lContainer;
                        return hs(s, o, i, r), n.attachToViewContainerRef(), Om(Zf(s), i, n), n
                    }
                    move(n, t) {
                        return this.insert(n, t)
                    }
                    indexOf(n) {
                        const t = W_(this._lContainer);
                        return null !== t ? t.indexOf(n) : -1
                    }
                    remove(n) {
                        const t = this._adjustIndex(n, -1),
                            r = ls(this._lContainer, t);
                        r && (za(Zf(this._lContainer), t), Nl(r[b], r))
                    }
                    detach(n) {
                        const t = this._adjustIndex(n, -1),
                            r = ls(this._lContainer, t);
                        return r && null != za(Zf(this._lContainer), t) ? new ms(r) : null
                    }
                    _adjustIndex(n, t = 0) {
                        return n ?? this.length + t
                    }
                };

            function W_(e) {
                return e[8]
            }

            function Zf(e) {
                return e[8] || (e[8] = [])
            }

            function Z_(e, n) {
                let t;
                const r = n[e.index];
                return et(r) ? t = r : (t = f_(r, n, null, e), n[e.index] = t, Fl(n, t)), Q_(t, n, e, r), new q_(t, e, n)
            }
            let Q_ = function X_(e, n, t, r) {
                    if (e[fn]) return;
                    let o;
                    o = 8 & t.type ? ae(r) : function u1(e, n) {
                        const t = e[P],
                            r = t.createComment(""),
                            o = at(n, e);
                        return $r(t, Ol(t, o), r, function IN(e, n) {
                            return e.nextSibling(n)
                        }(t, o), !1), r
                    }(n, t), e[fn] = o
                },
                Qf = () => !1;
            class Yf {
                constructor(n) {
                    this.queryList = n, this.matches = null
                }
                clone() {
                    return new Yf(this.queryList)
                }
                setDirty() {
                    this.queryList.setDirty()
                }
            }
            class Xf {
                constructor(n = []) {
                    this.queries = n
                }
                createEmbeddedView(n) {
                    const t = n.queries;
                    if (null !== t) {
                        const r = null !== n.contentQueries ? n.contentQueries[0] : t.length,
                            o = [];
                        for (let i = 0; i < r; i++) {
                            const s = t.getByIndex(i);
                            o.push(this.queries[s.indexInDeclarationView].clone())
                        }
                        return new Xf(o)
                    }
                    return null
                }
                insertView(n) {
                    this.dirtyQueriesWithMatches(n)
                }
                detachView(n) {
                    this.dirtyQueriesWithMatches(n)
                }
                finishViewCreation(n) {
                    this.dirtyQueriesWithMatches(n)
                }
                dirtyQueriesWithMatches(n) {
                    for (let t = 0; t < this.queries.length; t++) null !== nh(n, t).matches && this.queries[t].setDirty()
                }
            }
            class K_ {
                constructor(n, t, r = null) {
                    this.flags = t, this.read = r, this.predicate = "string" == typeof n ? function v1(e) {
                        return e.split(",").map(n => n.trim())
                    }(n) : n
                }
            }
            class Kf {
                constructor(n = []) {
                    this.queries = n
                }
                elementStart(n, t) {
                    for (let r = 0; r < this.queries.length; r++) this.queries[r].elementStart(n, t)
                }
                elementEnd(n) {
                    for (let t = 0; t < this.queries.length; t++) this.queries[t].elementEnd(n)
                }
                embeddedTView(n) {
                    let t = null;
                    for (let r = 0; r < this.length; r++) {
                        const o = null !== t ? t.length : 0,
                            i = this.getByIndex(r).embeddedTView(n, o);
                        i && (i.indexInDeclarationView = r, null !== t ? t.push(i) : t = [i])
                    }
                    return null !== t ? new Kf(t) : null
                }
                template(n, t) {
                    for (let r = 0; r < this.queries.length; r++) this.queries[r].template(n, t)
                }
                getByIndex(n) {
                    return this.queries[n]
                }
                get length() {
                    return this.queries.length
                }
                track(n) {
                    this.queries.push(n)
                }
            }
            class Jf {
                constructor(n, t = -1) {
                    this.metadata = n, this.matches = null, this.indexInDeclarationView = -1, this.crossesNgTemplate = !1, this._appliesToNextNode = !0, this._declarationNodeIndex = t
                }
                elementStart(n, t) {
                    this.isApplyingToNode(t) && this.matchTNode(n, t)
                }
                elementEnd(n) {
                    this._declarationNodeIndex === n.index && (this._appliesToNextNode = !1)
                }
                template(n, t) {
                    this.elementStart(n, t)
                }
                embeddedTView(n, t) {
                    return this.isApplyingToNode(n) ? (this.crossesNgTemplate = !0, this.addMatch(-n.index, t), new Jf(this.metadata)) : null
                }
                isApplyingToNode(n) {
                    if (this._appliesToNextNode && 1 & ~this.metadata.flags) {
                        const t = this._declarationNodeIndex;
                        let r = n.parent;
                        for (; null !== r && 8 & r.type && r.index !== t;) r = r.parent;
                        return t === (null !== r ? r.index : -1)
                    }
                    return this._appliesToNextNode
                }
                matchTNode(n, t) {
                    const r = this.metadata.predicate;
                    if (Array.isArray(r))
                        for (let o = 0; o < r.length; o++) {
                            const i = r[o];
                            this.matchTNodeWithReadOption(n, t, p1(t, i)), this.matchTNodeWithReadOption(n, t, fl(t, n, i, !1, !1))
                        } else r === qn ? 4 & t.type && this.matchTNodeWithReadOption(n, t, -1) : this.matchTNodeWithReadOption(n, t, fl(t, n, r, !1, !1))
                }
                matchTNodeWithReadOption(n, t, r) {
                    if (null !== r) {
                        const o = this.metadata.read;
                        if (null !== o)
                            if (o === ut || o === kt || o === qn && 4 & t.type) this.addMatch(t.index, -2);
                            else {
                                const i = fl(t, n, o, !1, !1);
                                null !== i && this.addMatch(t.index, i)
                            }
                        else this.addMatch(t.index, r)
                    }
                }
                addMatch(n, t) {
                    null === this.matches ? this.matches = [n, t] : this.matches.push(n, t)
                }
            }

            function p1(e, n) {
                const t = e.localNames;
                if (null !== t)
                    for (let r = 0; r < t.length; r += 2)
                        if (t[r] === n) return t[r + 1];
                return null
            }

            function m1(e, n, t, r) {
                return -1 === t ? function g1(e, n) {
                    return 11 & e.type ? To(e, n) : 4 & e.type ? jl(e, n) : null
                }(n, e) : -2 === t ? function y1(e, n, t) {
                    return t === ut ? To(n, e) : t === qn ? jl(n, e) : t === kt ? Z_(n, e) : void 0
                }(e, n, r) : Vr(e, e[b], t, n)
            }

            function J_(e, n, t, r) {
                const o = n[Vn].queries[r];
                if (null === o.matches) {
                    const i = e.data,
                        s = t.matches,
                        a = [];
                    for (let l = 0; null !== s && l < s.length; l += 2) {
                        const c = s[l];
                        a.push(c < 0 ? null : m1(n, i[c], s[l + 1], t.metadata.read))
                    }
                    o.matches = a
                }
                return o.matches
            }

            function eh(e, n, t, r) {
                const o = e.queries.getByIndex(t),
                    i = o.matches;
                if (null !== i) {
                    const s = J_(e, n, o, t);
                    for (let a = 0; a < i.length; a += 2) {
                        const l = i[a];
                        if (l > 0) r.push(s[a / 2]);
                        else {
                            const c = i[a + 1],
                                u = n[-l];
                            for (let d = Se; d < u.length; d++) {
                                const f = u[d];
                                f[Bi] === f[xe] && eh(f[b], f, c, r)
                            }
                            if (null !== u[wo]) {
                                const d = u[wo];
                                for (let f = 0; f < d.length; f++) {
                                    const h = d[f];
                                    eh(h[b], h, c, r)
                                }
                            }
                        }
                    }
                }
                return r
            }

            function tC(e, n, t) {
                const r = W();
                return r.firstCreatePass && (function rC(e, n, t) {
                        null === e.queries && (e.queries = new Kf), e.queries.track(new Jf(n, t))
                    }(r, new K_(e, n, t), -1), !(2 & ~n) && (r.staticViewQueries = !0)),
                    function eC(e, n, t) {
                        const r = new Bd(!(4 & ~t));
                        return function LN(e, n, t, r) {
                            const o = p_(n);
                            o.push(t), e.firstCreatePass && g_(e).push(r, o.length - 1)
                        }(e, n, r, r.destroy), (n[Vn] ??= new Xf).queries.push(new Yf(r)) - 1
                    }(r, _(), n)
            }

            function nh(e, n) {
                return e.queries.getByIndex(n)
            }

            function oC(e, n) {
                const t = e[b],
                    r = nh(t, n);
                return r.crossesNgTemplate ? eh(t, e, n, []) : J_(t, e, r, n)
            }

            function aC(e) {
                return function iC(e) {
                    return "function" == typeof e && void 0 !== e[Sr]
                }(e) && "function" == typeof e.set
            }

            function se(e) {
                let n = function vC(e) {
                        return Object.getPrototypeOf(e.prototype).constructor
                    }(e.type),
                    t = !0;
                const r = [e];
                for (; n;) {
                    let o;
                    if (en(e)) o = n.\u0275cmp || n.\u0275dir;
                    else {
                        if (n.\u0275cmp) throw new C(903, !1);
                        o = n.\u0275dir
                    }
                    if (o) {
                        if (t) {
                            r.push(o);
                            const s = e;
                            s.inputs = Ql(e.inputs), s.inputTransforms = Ql(e.inputTransforms), s.declaredInputs = Ql(e.declaredInputs), s.outputs = Ql(e.outputs);
                            const a = o.hostBindings;
                            a && P1(e, a);
                            const l = o.viewQuery,
                                c = o.contentQueries;
                            if (l && O1(e, l), c && R1(e, c), A1(e, o), Bx(e.outputs, o.outputs), en(o) && o.data.animation) {
                                const u = e.data;
                                u.animation = (u.animation || []).concat(o.data.animation)
                            }
                        }
                        const i = o.features;
                        if (i)
                            for (let s = 0; s < i.length; s++) {
                                const a = i[s];
                                a && a.ngInherit && a(e), a === se && (t = !1)
                            }
                    }
                    n = Object.getPrototypeOf(n)
                }! function N1(e) {
                    let n = 0,
                        t = null;
                    for (let r = e.length - 1; r >= 0; r--) {
                        const o = e[r];
                        o.hostVars = n += o.hostVars, o.hostAttrs = Vi(o.hostAttrs, t = Vi(t, o.hostAttrs))
                    }
                }(r)
            }

            function A1(e, n) {
                for (const t in n.inputs) {
                    if (!n.inputs.hasOwnProperty(t) || e.inputs.hasOwnProperty(t)) continue;
                    const r = n.inputs[t];
                    if (void 0 !== r && (e.inputs[t] = r, e.declaredInputs[t] = n.declaredInputs[t], null !== n.inputTransforms)) {
                        const o = Array.isArray(r) ? r[0] : r;
                        if (!n.inputTransforms.hasOwnProperty(o)) continue;
                        e.inputTransforms ??= {}, e.inputTransforms[o] = n.inputTransforms[o]
                    }
                }
            }

            function Ql(e) {
                return e === un ? {} : e === Y ? [] : e
            }

            function O1(e, n) {
                const t = e.viewQuery;
                e.viewQuery = t ? (r, o) => {
                    n(r, o), t(r, o)
                } : n
            }

            function R1(e, n) {
                const t = e.contentQueries;
                e.contentQueries = t ? (r, o, i) => {
                    n(r, o, i), t(r, o, i)
                } : n
            }

            function P1(e, n) {
                const t = e.hostBindings;
                e.hostBindings = t ? (r, o) => {
                    n(r, o), t(r, o)
                } : n
            }
            class Br {}
            class bC {}
            class oh extends Br {
                constructor(n, t, r) {
                    super(), this._parent = t, this._bootstrapComponents = [], this.destroyCbs = [], this.componentFactoryResolver = new z_(this);
                    const o = Xe(n);
                    this._bootstrapComponents = Pt(o.bootstrap), this._r3Injector = Uy(n, t, [{
                        provide: Br,
                        useValue: this
                    }, {
                        provide: zl,
                        useValue: this.componentFactoryResolver
                    }, ...r], Ve(n), new Set(["environment"])), this._r3Injector.resolveInjectorInitializers(), this.instance = this._r3Injector.get(n)
                }
                get injector() {
                    return this._r3Injector
                }
                destroy() {
                    const n = this._r3Injector;
                    !n.destroyed && n.destroy(), this.destroyCbs.forEach(t => t()), this.destroyCbs = null
                }
                onDestroy(n) {
                    this.destroyCbs.push(n)
                }
            }
            class ih extends bC {
                constructor(n) {
                    super(), this.moduleType = n
                }
                create(n) {
                    return new oh(this.moduleType, n, [])
                }
            }
            class EC extends Br {
                constructor(n) {
                    super(), this.componentFactoryResolver = new z_(this), this.instance = null;
                    const t = new mo([...n.providers, {
                        provide: Br,
                        useValue: this
                    }, {
                        provide: zl,
                        useValue: this.componentFactoryResolver
                    }], n.parent || Xa(), n.debugName, new Set(["environment"]));
                    this.injector = t, n.runEnvironmentInitializers && t.resolveInjectorInitializers()
                }
                destroy() {
                    this.injector.destroy()
                }
                onDestroy(n) {
                    this.injector.onDestroy(n)
                }
            }

            function Yl(e, n, t = null) {
                return new EC({
                    providers: e,
                    parent: n,
                    debugName: t,
                    runEnvironmentInitializers: !0
                }).injector
            }
            let dr = (() => {
                class e {
                    constructor() {
                        this.taskId = 0, this.pendingTasks = new Set, this.hasPendingTasks = new Ht(!1)
                    }
                    get _hasPendingTasks() {
                        return this.hasPendingTasks.value
                    }
                    add() {
                        this._hasPendingTasks || this.hasPendingTasks.next(!0);
                        const t = this.taskId++;
                        return this.pendingTasks.add(t), t
                    }
                    remove(t) {
                        this.pendingTasks.delete(t), 0 === this.pendingTasks.size && this._hasPendingTasks && this.hasPendingTasks.next(!1)
                    }
                    ngOnDestroy() {
                        this.pendingTasks.clear(), this._hasPendingTasks && this.hasPendingTasks.next(!1)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function sh(e) {
                return null !== e && ("function" == typeof e || "object" == typeof e)
            }

            function bn(e, n, t) {
                return e[n] = t
            }

            function Te(e, n, t) {
                return !Object.is(e[n], t) && (e[n] = t, !0)
            }

            function Hr(e, n, t, r) {
                const o = Te(e, n, t);
                return Te(e, n + 1, r) || o
            }

            function Gt(e, n, t, r, o, i) {
                const s = Hr(e, n, t, r);
                return Hr(e, n + 2, o, i) || s
            }

            function Ft(e, n, t, r, o, i, s, a) {
                const l = _(),
                    c = W(),
                    u = e + j,
                    d = c.firstCreatePass ? function W1(e, n, t, r, o, i, s, a, l) {
                        const c = n.consts,
                            u = ko(n, e, 4, s || null, pn(c, a));
                        Sf(n, t, u, pn(c, l)), sl(n, u);
                        const d = u.tView = xf(2, u, r, o, i, n.directiveRegistry, n.pipeRegistry, null, n.schemas, c, null);
                        return null !== n.queries && (n.queries.template(n, u), d.queries = n.queries.embeddedTView(u)), u
                    }(u, c, l, n, t, r, o, i, s) : c.data[u];
                gn(d, !1);
                const f = MC(c, l, d, e);
                Qi() && Rl(c, l, f, d), nt(f, l);
                const h = f_(f, l, f, d);
                return l[u] = h, Fl(l, h),
                    function Y_(e, n, t) {
                        return Qf(e, n, t)
                    }(h, d, l), nl(d) && Mf(c, l, d), null != s && If(l, d, a), Ft
            }
            let MC = function IC(e, n, t, r) {
                return mn(!0), n[P].createComment("")
            };

            function wt(e, n, t, r) {
                const o = _();
                return Te(o, tn(), n) && (W(), Cn(he(), o, e, n, t, r)), wt
            }

            function qo(e, n, t, r) {
                return Te(e, tn(), t) ? n + V(t) + r : $
            }

            function Wo(e, n, t, r, o, i) {
                const a = Hr(e, function Un() {
                    return k.lFrame.bindingIndex
                }(), t, o);
                return Bn(2), a ? n + V(t) + r + V(o) + i : $
            }

            function ic(e, n) {
                return e << 17 | n << 2
            }

            function hr(e) {
                return e >> 17 & 32767
            }

            function mh(e) {
                return 2 | e
            }

            function Gr(e) {
                return (131068 & e) >> 2
            }

            function yh(e, n) {
                return -131069 & e | n << 2
            }

            function vh(e) {
                return 1 | e
            }

            function rD(e, n, t, r) {
                const o = e[t + 1],
                    i = null === n;
                let s = r ? hr(o) : Gr(o),
                    a = !1;
                for (; 0 !== s && (!1 === a || i);) {
                    const c = e[s + 1];
                    OR(e[s], n) && (a = !0, e[s + 1] = r ? vh(c) : mh(c)), s = r ? hr(c) : Gr(c)
                }
                a && (e[t + 1] = r ? mh(o) : vh(o))
            }

            function OR(e, n) {
                return null === e || null == n || (Array.isArray(e) ? e[1] : e) === n || !(!Array.isArray(e) || "string" != typeof n) && go(e, n) >= 0
            }

            function pr(e, n, t) {
                const r = _();
                return Te(r, tn(), n) && Dt(W(), he(), r, e, n, r[P], t, !1), pr
            }

            function _h(e, n, t, r, o) {
                const s = o ? "class" : "style";
                Of(e, t, n.inputs[s], s, r)
            }

            function Ns(e, n) {
                return function nn(e, n, t, r) {
                    const o = _(),
                        i = W(),
                        s = Bn(2);
                    i.firstUpdatePass && function fD(e, n, t, r) {
                        const o = e.data;
                        if (null === o[t + 1]) {
                            const i = o[tt()],
                                s = function dD(e, n) {
                                    return n >= e.expandoStartIndex
                                }(e, t);
                            (function mD(e, n) {
                                return !!(e.flags & (n ? 8 : 16))
                            })(i, r) && null === n && !s && (n = !1), n = function UR(e, n, t, r) {
                                    const o = function Sd(e) {
                                        const n = k.lFrame.currentDirectiveIndex;
                                        return -1 === n ? null : e[n]
                                    }(e);
                                    let i = r ? n.residualClasses : n.residualStyles;
                                    if (null === o) 0 === (r ? n.classBindings : n.styleBindings) && (t = Os(t = Ch(null, e, n, t, r), n.attrs, r), i = null);
                                    else {
                                        const s = n.directiveStylingLast;
                                        if (-1 === s || e[s] !== o)
                                            if (t = Ch(o, e, n, t, r), null === i) {
                                                let l = function BR(e, n, t) {
                                                    const r = t ? n.classBindings : n.styleBindings;
                                                    if (0 !== Gr(r)) return e[hr(r)]
                                                }(e, n, r);
                                                void 0 !== l && Array.isArray(l) && (l = Ch(null, e, n, l[1], r), l = Os(l, n.attrs, r), function HR(e, n, t, r) {
                                                    e[hr(t ? n.classBindings : n.styleBindings)] = r
                                                }(e, n, r, l))
                                            } else i = function zR(e, n, t) {
                                                let r;
                                                const o = n.directiveEnd;
                                                for (let i = 1 + n.directiveStylingLast; i < o; i++) r = Os(r, e[i].hostAttrs, t);
                                                return Os(r, n.attrs, t)
                                            }(e, n, r)
                                    }
                                    return void 0 !== i && (r ? n.residualClasses = i : n.residualStyles = i), t
                                }(o, i, n, r),
                                function AR(e, n, t, r, o, i) {
                                    let s = i ? n.classBindings : n.styleBindings,
                                        a = hr(s),
                                        l = Gr(s);
                                    e[r] = t;
                                    let u, c = !1;
                                    if (Array.isArray(t) ? (u = t[1], (null === u || go(t, u) > 0) && (c = !0)) : u = t, o)
                                        if (0 !== l) {
                                            const f = hr(e[a + 1]);
                                            e[r + 1] = ic(f, a), 0 !== f && (e[f + 1] = yh(e[f + 1], r)), e[a + 1] = function SR(e, n) {
                                                return 131071 & e | n << 17
                                            }(e[a + 1], r)
                                        } else e[r + 1] = ic(a, 0), 0 !== a && (e[a + 1] = yh(e[a + 1], r)), a = r;
                                    else e[r + 1] = ic(l, 0), 0 === a ? a = r : e[l + 1] = yh(e[l + 1], r), l = r;
                                    c && (e[r + 1] = mh(e[r + 1])), rD(e, u, r, !0), rD(e, u, r, !1),
                                        function NR(e, n, t, r, o) {
                                            const i = o ? e.residualClasses : e.residualStyles;
                                            null != i && "string" == typeof n && go(i, n) >= 0 && (t[r + 1] = vh(t[r + 1]))
                                        }(n, u, e, r, i), s = ic(a, l), i ? n.classBindings = s : n.styleBindings = s
                                }(o, i, n, t, s, r)
                        }
                    }(i, e, s, r), n !== $ && Te(o, s, n) && function pD(e, n, t, r, o, i, s, a) {
                        if (!(3 & n.type)) return;
                        const l = e.data,
                            c = l[a + 1],
                            u = function TR(e) {
                                return !(1 & ~e)
                            }(c) ? gD(l, n, t, o, Gr(c), s) : void 0;
                        sc(u) || (sc(i) || function xR(e) {
                            return !(2 & ~e)
                        }(c) && (i = gD(l, null, t, o, a, s)), function TN(e, n, t, r, o) {
                            if (n) o ? e.addClass(t, r) : e.removeClass(t, r);
                            else {
                                let i = -1 === r.indexOf("-") ? void 0 : lr.DashCase;
                                null == o ? e.removeStyle(t, r, i) : ("string" == typeof o && o.endsWith("!important") && (o = o.slice(0, -10), i |= lr.Important), e.setStyle(t, r, o, i))
                            }
                        }(r, s, Gi(tt(), t), o, i))
                    }(i, i.data[tt()], o, o[P], e, o[s + 1] = function ZR(e, n) {
                        return null == e || "" === e || ("string" == typeof n ? e += n : "object" == typeof e && (e = Ve(Ot(e)))), e
                    }(n, t), r, s)
                }(e, n, null, !0), Ns
            }

            function Ch(e, n, t, r, o) {
                let i = null;
                const s = t.directiveEnd;
                let a = t.directiveStylingLast;
                for (-1 === a ? a = t.directiveStart : a++; a < s && (i = n[a], r = Os(r, i.hostAttrs, o), i !== e);) a++;
                return null !== e && (t.directiveStylingLast = a), r
            }

            function Os(e, n, t) {
                const r = t ? 1 : 2;
                let o = -1;
                if (null !== n)
                    for (let i = 0; i < n.length; i++) {
                        const s = n[i];
                        "number" == typeof s ? o = s : o === r && (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]), St(e, s, !!t || n[++i]))
                    }
                return void 0 === e ? null : e
            }

            function gD(e, n, t, r, o, i) {
                const s = null === n;
                let a;
                for (; o > 0;) {
                    const l = e[o],
                        c = Array.isArray(l),
                        u = c ? l[1] : l,
                        d = null === u;
                    let f = t[o + 1];
                    f === $ && (f = d ? Y : void 0);
                    let h = d ? td(f, r) : u === r ? f : void 0;
                    if (c && !sc(h) && (h = td(l, r)), sc(h) && (a = h, s)) return a;
                    const p = e[o + 1];
                    o = s ? hr(p) : Gr(p)
                }
                if (null !== n) {
                    let l = i ? n.residualClasses : n.residualStyles;
                    null != l && (a = td(l, r))
                }
                return a
            }

            function sc(e) {
                return void 0 !== e
            }
            class iP {
                destroy(n) {}
                updateValue(n, t) {}
                swap(n, t) {
                    const r = Math.min(n, t),
                        o = Math.max(n, t),
                        i = this.detach(o);
                    if (o - r > 1) {
                        const s = this.detach(r);
                        this.attach(r, i), this.attach(o, s)
                    } else this.attach(r, i)
                }
                move(n, t) {
                    this.attach(t, this.detach(n))
                }
            }

            function Dh(e, n, t, r, o) {
                return e === t && Object.is(n, r) ? 1 : Object.is(o(e, n), o(t, r)) ? -1 : 0
            }

            function wh(e, n, t, r) {
                return !(void 0 === n || !n.has(r) || (e.attach(t, n.get(r)), n.delete(r), 0))
            }

            function yD(e, n, t, r, o) {
                if (wh(e, n, r, t(r, o))) e.updateValue(r, o);
                else {
                    const i = e.create(r, o);
                    e.attach(r, i)
                }
            }

            function vD(e, n, t, r) {
                const o = new Set;
                for (let i = n; i <= t; i++) o.add(r(i, e.at(i)));
                return o
            }
            class _D {
                constructor() {
                    this.kvMap = new Map, this._vMap = void 0
                }
                has(n) {
                    return this.kvMap.has(n)
                }
                delete(n) {
                    if (!this.has(n)) return !1;
                    const t = this.kvMap.get(n);
                    return void 0 !== this._vMap && this._vMap.has(t) ? (this.kvMap.set(n, this._vMap.get(t)), this._vMap.delete(t)) : this.kvMap.delete(n), !0
                }
                get(n) {
                    return this.kvMap.get(n)
                }
                set(n, t) {
                    if (this.kvMap.has(n)) {
                        let r = this.kvMap.get(n);
                        void 0 === this._vMap && (this._vMap = new Map);
                        const o = this._vMap;
                        for (; o.has(r);) r = o.get(r);
                        o.set(r, t)
                    } else this.kvMap.set(n, t)
                }
                forEach(n) {
                    for (let [t, r] of this.kvMap)
                        if (n(r, t), void 0 !== this._vMap) {
                            const o = this._vMap;
                            for (; o.has(r);) r = o.get(r), n(r, t)
                        }
                }
            }

            function Vt(e, n, t) {
                wn("NgControlFlow");
                const r = _(),
                    o = tn(),
                    i = bh(r, j + e);
                if (Te(r, o, n)) {
                    const a = z(null);
                    try {
                        if (Pf(i, 0), -1 !== n) {
                            const l = Eh(r[b], j + n),
                                c = Lo(i, l.tView.ssrId);
                            hs(i, fs(r, l, t, {
                                dehydratedView: c
                            }), 0, Fo(l, c))
                        }
                    } finally {
                        z(a)
                    }
                } else {
                    const a = y_(i, 0);
                    void 0 !== a && (a[fe] = t)
                }
            }
            class aP {
                constructor(n, t, r) {
                    this.lContainer = n, this.$implicit = t, this.$index = r
                }
                get $count() {
                    return this.lContainer.length - Se
                }
            }

            function ac(e) {
                return e
            }
            class cP {
                constructor(n, t, r) {
                    this.hasEmptyBlock = n, this.trackByFn = t, this.liveCollection = r
                }
            }

            function lc(e, n, t, r, o, i, s, a, l, c, u, d, f) {
                wn("NgControlFlow");
                const h = void 0 !== l,
                    p = _(),
                    g = a ? s.bind(p[Ee][fe]) : s,
                    m = new cP(h, g);
                p[j + e] = m, Ft(e + 1, n, t, r, o, i), h && Ft(e + 2, l, c, u, d, f)
            }
            class uP extends iP {
                constructor(n, t, r) {
                    super(), this.lContainer = n, this.hostLView = t, this.templateTNode = r, this.needsIndexUpdate = !1
                }
                get length() {
                    return this.lContainer.length - Se
                }
                at(n) {
                    return this.getLView(n)[fe].$implicit
                }
                attach(n, t) {
                    const r = t[Tt];
                    this.needsIndexUpdate ||= n !== this.length, hs(this.lContainer, t, n, Fo(this.templateTNode, r))
                }
                detach(n) {
                    return this.needsIndexUpdate ||= n !== this.length - 1,
                        function dP(e, n) {
                            return ls(e, n)
                        }(this.lContainer, n)
                }
                create(n, t) {
                    const r = Lo(this.lContainer, this.templateTNode.tView.ssrId);
                    return fs(this.hostLView, this.templateTNode, new aP(this.lContainer, t, n), {
                        dehydratedView: r
                    })
                }
                destroy(n) {
                    Nl(n[b], n)
                }
                updateValue(n, t) {
                    this.getLView(n)[fe].$implicit = t
                }
                reset() {
                    this.needsIndexUpdate = !1
                }
                updateIndexes() {
                    if (this.needsIndexUpdate)
                        for (let n = 0; n < this.length; n++) this.getLView(n)[fe].$index = n
                }
                getLView(n) {
                    return function fP(e, n) {
                        return y_(e, n)
                    }(this.lContainer, n)
                }
            }

            function cc(e) {
                const n = z(null),
                    t = tt();
                try {
                    const r = _(),
                        o = r[b],
                        i = r[t];
                    if (void 0 === i.liveCollection) {
                        const a = t + 1,
                            l = bh(r, a),
                            c = Eh(o, a);
                        i.liveCollection = new uP(l, r, c)
                    } else i.liveCollection.reset();
                    const s = i.liveCollection;
                    if (function sP(e, n, t) {
                            let r, o, i = 0,
                                s = e.length - 1;
                            if (Array.isArray(n)) {
                                let a = n.length - 1;
                                for (; i <= s && i <= a;) {
                                    const l = e.at(i),
                                        c = n[i],
                                        u = Dh(i, l, i, c, t);
                                    if (0 !== u) {
                                        u < 0 && e.updateValue(i, c), i++;
                                        continue
                                    }
                                    const d = e.at(s),
                                        f = n[a],
                                        h = Dh(s, d, a, f, t);
                                    if (0 !== h) {
                                        h < 0 && e.updateValue(s, f), s--, a--;
                                        continue
                                    }
                                    const p = t(i, l),
                                        g = t(s, d),
                                        m = t(i, c);
                                    if (Object.is(m, g)) {
                                        const y = t(a, f);
                                        Object.is(y, p) ? (e.swap(i, s), e.updateValue(s, f), a--, s--) : e.move(s, i), e.updateValue(i, c), i++
                                    } else if (r ??= new _D, o ??= vD(e, i, s, t), wh(e, r, i, m)) e.updateValue(i, c), i++, s++;
                                    else if (o.has(m)) r.set(p, e.detach(i)), s--;
                                    else {
                                        const y = e.create(i, n[i]);
                                        e.attach(i, y), i++, s++
                                    }
                                }
                                for (; i <= a;) yD(e, r, t, i, n[i]), i++
                            } else if (null != n) {
                                const a = n[Symbol.iterator]();
                                let l = a.next();
                                for (; !l.done && i <= s;) {
                                    const c = e.at(i),
                                        u = l.value,
                                        d = Dh(i, c, i, u, t);
                                    if (0 !== d) d < 0 && e.updateValue(i, u), i++, l = a.next();
                                    else {
                                        r ??= new _D, o ??= vD(e, i, s, t);
                                        const f = t(i, u);
                                        if (wh(e, r, i, f)) e.updateValue(i, u), i++, s++, l = a.next();
                                        else if (o.has(f)) {
                                            const h = t(i, c);
                                            r.set(h, e.detach(i)), s--
                                        } else e.attach(i, e.create(i, u)), i++, s++, l = a.next()
                                    }
                                }
                                for (; !l.done;) yD(e, r, t, e.length, l.value), l = a.next()
                            }
                            for (; i <= s;) e.destroy(e.detach(s--));
                            r?.forEach(a => {
                                e.destroy(a)
                            })
                        }(s, e, i.trackByFn), s.updateIndexes(), i.hasEmptyBlock) {
                        const a = tn(),
                            l = 0 === s.length;
                        if (Te(r, a, l)) {
                            const c = t + 2,
                                u = bh(r, c);
                            if (l) {
                                const d = Eh(o, c),
                                    f = Lo(u, d.tView.ssrId);
                                hs(u, fs(r, d, void 0, {
                                    dehydratedView: f
                                }), 0, Fo(d, f))
                            } else Pf(u, 0)
                        }
                    }
                } finally {
                    z(n)
                }
            }

            function bh(e, n) {
                return e[n]
            }

            function Eh(e, n) {
                return qi(e, n)
            }

            function O(e, n, t, r) {
                const o = _(),
                    i = W(),
                    s = j + e,
                    a = o[P],
                    l = i.firstCreatePass ? function hP(e, n, t, r, o, i) {
                        const s = n.consts,
                            l = ko(n, e, 2, r, pn(s, o));
                        return Sf(n, t, l, pn(s, i)), null !== l.attrs && ql(l, l.attrs, !1), null !== l.mergedAttrs && ql(l, l.mergedAttrs, !0), null !== n.queries && n.queries.elementStart(n, l), l
                    }(s, i, o, n, t, r) : i.data[s],
                    c = CD(i, o, l, a, n, e);
                o[s] = c;
                const u = nl(l);
                return gn(l, !0), t_(a, c, l), ! function xs(e) {
                        return !(32 & ~e.flags)
                    }(l) && Qi() && Rl(i, o, c, l), 0 === function iT() {
                        return k.lFrame.elementDepthCount
                    }() && nt(c, o),
                    function sT() {
                        k.lFrame.elementDepthCount++
                    }(), u && (Mf(i, o, l), Ef(i, l, o)), null !== r && If(o, l), O
            }

            function F() {
                let e = ie();
                Md() ? Id() : (e = e.parent, gn(e, !1));
                const n = e;
                (function lT(e) {
                    return k.skipHydrationRootTNode === e
                })(n) && function fT() {
                    k.skipHydrationRootTNode = null
                }(),
                function aT() {
                    k.lFrame.elementDepthCount--
                }();
                const t = W();
                return t.firstCreatePass && (sl(t, e), gd(e) && t.queries.elementEnd(e)), null != n.classesWithoutHost && function IT(e) {
                    return !!(8 & e.flags)
                }(n) && _h(t, n, _(), n.classesWithoutHost, !0), null != n.stylesWithoutHost && function xT(e) {
                    return !!(16 & e.flags)
                }(n) && _h(t, n, _(), n.stylesWithoutHost, !1), F
            }

            function Ce(e, n, t, r) {
                return O(e, n, t, r), F(), Ce
            }
            let CD = (e, n, t, r, o, i) => (mn(!0), Al(r, o, function wy() {
                return k.lFrame.currentNamespace
            }()));

            function qr() {
                return _()
            }
            const ni = "en-US";
            let xD = ni;

            function Re(e, n, t, r) {
                const o = _(),
                    i = W(),
                    s = ie();
                return Th(i, o, o[P], s, e, n, r), Re
            }

            function Th(e, n, t, r, o, i, s) {
                const a = nl(r),
                    c = e.firstCreatePass && g_(e),
                    u = n[fe],
                    d = p_(n);
                let f = !0;
                if (3 & r.type || s) {
                    const g = at(r, n),
                        m = s ? s(g) : g,
                        y = d.length,
                        v = s ? T => s(ae(T[r.index])) : r.index;
                    let E = null;
                    if (!s && a && (E = function yk(e, n, t, r) {
                            const o = e.cleanup;
                            if (null != o)
                                for (let i = 0; i < o.length - 1; i += 2) {
                                    const s = o[i];
                                    if (s === t && o[i + 1] === r) {
                                        const a = n[_o],
                                            l = o[i + 2];
                                        return a.length > l ? a[l] : null
                                    }
                                    "string" == typeof s && (i += 2)
                                }
                            return null
                        }(e, n, o, r.index)), null !== E)(E.__ngLastListenerFn__ || E).__ngNextListenerFn__ = i, E.__ngLastListenerFn__ = i, f = !1;
                    else {
                        i = tw(r, n, u, i, !1);
                        const T = t.listen(m, o, i);
                        d.push(i, T), c && c.push(o, v, y, y + 1)
                    }
                } else i = tw(r, n, u, i, !1);
                const h = r.outputs;
                let p;
                if (f && null !== h && (p = h[o])) {
                    const g = p.length;
                    if (g)
                        for (let m = 0; m < g; m += 2) {
                            const B = n[p[m]][p[m + 1]].subscribe(i),
                                ne = d.length;
                            d.push(i, B), c && c.push(o, r.index, ne, -(ne + 1))
                        }
                }
            }

            function ew(e, n, t, r) {
                const o = z(null);
                try {
                    return hn(6, n, t), !1 !== t(r)
                } catch (i) {
                    return Ll(e, i), !1
                } finally {
                    hn(7, n, t), z(o)
                }
            }

            function tw(e, n, t, r, o) {
                return function i(s) {
                    if (s === Function) return r;
                    gs(e.componentOffset > -1 ? Nt(e.index, n) : n);
                    let l = ew(n, t, r, s),
                        c = i.__ngNextListenerFn__;
                    for (; c;) l = ew(n, t, c, s) && l, c = c.__ngNextListenerFn__;
                    return o && !1 === l && s.preventDefault(), l
                }
            }

            function we(e = 1) {
                return function vT(e) {
                    return (k.lFrame.contextLView = function uy(e, n) {
                        for (; e > 0;) n = n[Co], e--;
                        return n
                    }(e, k.lFrame.contextLView))[fe]
                }(e)
            }

            function vk(e, n) {
                let t = null;
                const r = function yS(e) {
                    const n = e.attrs;
                    if (null != n) {
                        const t = n.indexOf(5);
                        if (!(1 & t)) return n[t + 1]
                    }
                    return null
                }(e);
                for (let o = 0; o < n.length; o++) {
                    const i = n[o];
                    if ("*" !== i) {
                        if (null === r ? $m(e, i, !0) : CS(r, i)) return o
                    } else t = o
                }
                return t
            }

            function In(e, n, t) {
                return xn(e, "", n, "", t), In
            }

            function xn(e, n, t, r, o) {
                const i = _(),
                    s = qo(i, n, t, r);
                return s !== $ && Dt(W(), he(), i, e, s, i[P], o, !1), xn
            }

            function pc(e, n, t, r, o, i, s) {
                const a = _(),
                    l = Wo(a, n, t, r, o, i);
                return l !== $ && Dt(W(), he(), a, e, l, a[P], s, !1), pc
            }

            function js(e, n, t) {
                tC(e, n, t)
            }

            function ri(e) {
                const n = _(),
                    t = W(),
                    r = Td();
                ol(r + 1);
                const o = nh(t, r);
                if (e.dirty && function nT(e) {
                        return !(4 & ~e[S])
                    }(n) === !(2 & ~o.metadata.flags)) {
                    if (null === o.matches) e.reset([]);
                    else {
                        const i = oC(n, r);
                        e.reset(i, Gy), e.notifyOnChanges()
                    }
                    return !0
                }
                return !1
            }

            function oi() {
                return function th(e, n) {
                    return e[Vn].queries[n].queryList
                }(_(), Td())
            }

            function qe(e, n = "") {
                const t = _(),
                    r = W(),
                    o = e + j,
                    i = r.firstCreatePass ? ko(r, o, 1, n, null) : r.data[o],
                    s = Dw(r, t, i, n, e);
                t[o] = s, Qi() && Rl(r, t, s, i), gn(i, !1)
            }
            let Dw = (e, n, t, r, o) => (mn(!0), function mf(e, n) {
                return e.createText(n)
            }(n[P], r));

            function rt(e) {
                return Ah("", e, ""), rt
            }

            function Ah(e, n, t) {
                const r = _(),
                    o = qo(r, e, n, t);
                return o !== $ && function Gn(e, n, t) {
                    const r = Gi(n, e);
                    ! function Uv(e, n, t) {
                        e.setValue(n, t)
                    }(e[P], r, t)
                }(r, tt(), o), Ah
            }

            function Nh(e, n, t) {
                aC(n) && (n = n());
                const r = _();
                return Te(r, tn(), n) && Dt(W(), he(), r, e, n, r[P], t, !1), Nh
            }

            function Oh(e, n) {
                const t = _(),
                    r = W(),
                    o = ie();
                return Th(r, t, t[P], o, e, n), Oh
            }

            function Rh(e, n, t, r, o) {
                if (e = N(e), Array.isArray(e))
                    for (let i = 0; i < e.length; i++) Rh(e[i], n, t, r, o);
                else {
                    const i = W(),
                        s = _(),
                        a = ie();
                    let l = Rr(e) ? e : N(e.provide);
                    const c = Zm(e),
                        u = 1048575 & a.providerIndexes,
                        d = a.directiveStart,
                        f = a.providerIndexes >> 20;
                    if (Rr(e) || !e.multi) {
                        const h = new Yi(c, o, D),
                            p = kh(l, n, o ? u : u + f, d); - 1 === p ? (Ld(ul(a, s), i, l), Ph(i, e, n.length), n.push(l), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), t.push(h), s.push(h)) : (t[p] = h, s[p] = h)
                    } else {
                        const h = kh(l, n, u + f, d),
                            p = kh(l, n, u, u + f),
                            m = p >= 0 && t[p];
                        if (o && !m || !o && !(h >= 0 && t[h])) {
                            Ld(ul(a, s), i, l);
                            const y = function Vk(e, n, t, r, o) {
                                const i = new Yi(e, t, D);
                                return i.multi = [], i.index = n, i.componentProviders = 0, Nw(i, o, r && !t), i
                            }(o ? Lk : Fk, t.length, o, r, c);
                            !o && m && (t[p].providerFactory = y), Ph(i, e, n.length, 0), n.push(l), a.directiveStart++, a.directiveEnd++, o && (a.providerIndexes += 1048576), t.push(y), s.push(y)
                        } else Ph(i, e, h > -1 ? h : p, Nw(t[o ? p : h], c, !o && r));
                        !o && r && m && t[p].componentProviders++
                    }
                }
            }

            function Ph(e, n, t, r) {
                const o = Rr(n),
                    i = function AS(e) {
                        return !!e.useClass
                    }(n);
                if (o || i) {
                    const l = (i ? N(n.useClass) : n).prototype.ngOnDestroy;
                    if (l) {
                        const c = e.destroyHooks || (e.destroyHooks = []);
                        if (!o && n.multi) {
                            const u = c.indexOf(t); - 1 === u ? c.push(t, [r, l]) : c[u + 1].push(r, l)
                        } else c.push(t, l)
                    }
                }
            }

            function Nw(e, n, t) {
                return t && e.componentProviders++, e.multi.push(n) - 1
            }

            function kh(e, n, t, r) {
                for (let o = t; o < r; o++)
                    if (n[o] === e) return o;
                return -1
            }

            function Fk(e, n, t, r) {
                return Fh(this.multi, [])
            }

            function Lk(e, n, t, r) {
                const o = this.multi;
                let i;
                if (this.providerFactory) {
                    const s = this.providerFactory.componentProviders,
                        a = Vr(t, t[b], this.providerFactory.index, r);
                    i = a.slice(0, s), Fh(o, i);
                    for (let l = s; l < a.length; l++) i.push(a[l])
                } else i = [], Fh(o, i);
                return i
            }

            function Fh(e, n) {
                for (let t = 0; t < e.length; t++) n.push((0, e[t])());
                return n
            }

            function be(e, n = []) {
                return t => {
                    t.providersResolver = (r, o) => function kk(e, n, t) {
                        const r = W();
                        if (r.firstCreatePass) {
                            const o = en(e);
                            Rh(t, r.data, r.blueprint, o, !0), Rh(n, r.data, r.blueprint, o, !1)
                        }
                    }(r, o ? o(e) : e, n)
                }
            }
            let jk = (() => {
                class e {
                    constructor(t) {
                        this._injector = t, this.cachedInjectors = new Map
                    }
                    getOrCreateStandaloneInjector(t) {
                        if (!t.standalone) return null;
                        if (!this.cachedInjectors.has(t)) {
                            const r = id(0, t.type),
                                o = r.length > 0 ? Yl([r], this._injector, `Standalone[${t.type.name}]`) : null;
                            this.cachedInjectors.set(t, o)
                        }
                        return this.cachedInjectors.get(t)
                    }
                    ngOnDestroy() {
                        try {
                            for (const t of this.cachedInjectors.values()) null !== t && t.destroy()
                        } finally {
                            this.cachedInjectors.clear()
                        }
                    }
                    static #e = this.\u0275prov = I({
                        token: e,
                        providedIn: "environment",
                        factory: () => new e(x(vt))
                    })
                }
                return e
            })();

            function gc(e) {
                wn("NgStandalone"), e.getStandaloneInjector = n => n.get(jk).getOrCreateStandaloneInjector(e)
            }

            function Pw(e, n, t, r, o) {
                return function Lw(e, n, t, r, o, i, s) {
                    const a = n + t;
                    return Hr(e, a, o, i) ? bn(e, a + 2, s ? r.call(s, o, i) : r(o, i)) : $s(e, a + 2)
                }(_(), lt(), e, n, t, r, o)
            }

            function $s(e, n) {
                const t = e[n];
                return t === $ ? void 0 : t
            }

            function Fw(e, n, t, r, o, i) {
                const s = n + t;
                return Te(e, s, o) ? bn(e, s + 1, i ? r.call(i, o) : r(o)) : $s(e, s + 1)
            }

            function Lh(e, n) {
                const t = W();
                let r;
                const o = e + j;
                t.firstCreatePass ? (r = function Qk(e, n) {
                    if (n)
                        for (let t = n.length - 1; t >= 0; t--) {
                            const r = n[t];
                            if (e === r.name) return r
                        }
                }(n, t.pipeRegistry), t.data[o] = r, r.onDestroy && (t.destroyHooks ??= []).push(o, r.onDestroy)) : r = t.data[o];
                const i = r.factory || (r.factory = Nr(r.type)),
                    a = mt(D);
                try {
                    const l = cl(!1),
                        c = i();
                    return cl(l),
                        function wk(e, n, t, r) {
                            t >= e.data.length && (e.data[t] = null, e.blueprint[t] = null), n[t] = r
                        }(t, _(), o, c), c
                } finally {
                    mt(a)
                }
            }

            function Vh(e, n, t) {
                const r = e + j,
                    o = _(),
                    i = function bo(e, n) {
                        return e[n]
                    }(o, r);
                return function Us(e, n) {
                    return e[b].data[n].pure
                }(o, r) ? Fw(o, lt(), n, i.transform, t, i) : i.transform(t)
            }
            let nb = (() => {
                class e {
                    log(t) {
                        console.log(t)
                    }
                    warn(t) {
                        console.warn(t)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "platform"
                    })
                }
                return e
            })();
            const ab = new M(""),
                _c = new M("");
            let qh, zh = (() => {
                    class e {
                        constructor(t, r, o) {
                            this._ngZone = t, this.registry = r, this._pendingCount = 0, this._isZoneStable = !0, this._callbacks = [], this.taskTrackingZone = null, qh || (function WF(e) {
                                qh = e
                            }(o), o.addToWindow(r)), this._watchAngularEvents(), t.run(() => {
                                this.taskTrackingZone = typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone")
                            })
                        }
                        _watchAngularEvents() {
                            this._ngZone.onUnstable.subscribe({
                                next: () => {
                                    this._isZoneStable = !1
                                }
                            }), this._ngZone.runOutsideAngular(() => {
                                this._ngZone.onStable.subscribe({
                                    next: () => {
                                        J.assertNotInAngularZone(), queueMicrotask(() => {
                                            this._isZoneStable = !0, this._runCallbacksIfReady()
                                        })
                                    }
                                })
                            })
                        }
                        increasePendingRequestCount() {
                            return this._pendingCount += 1, this._pendingCount
                        }
                        decreasePendingRequestCount() {
                            if (this._pendingCount -= 1, this._pendingCount < 0) throw new Error("pending async requests below zero");
                            return this._runCallbacksIfReady(), this._pendingCount
                        }
                        isStable() {
                            return this._isZoneStable && 0 === this._pendingCount && !this._ngZone.hasPendingMacrotasks
                        }
                        _runCallbacksIfReady() {
                            if (this.isStable()) queueMicrotask(() => {
                                for (; 0 !== this._callbacks.length;) {
                                    let t = this._callbacks.pop();
                                    clearTimeout(t.timeoutId), t.doneCb()
                                }
                            });
                            else {
                                let t = this.getPendingTasks();
                                this._callbacks = this._callbacks.filter(r => !r.updateCb || !r.updateCb(t) || (clearTimeout(r.timeoutId), !1))
                            }
                        }
                        getPendingTasks() {
                            return this.taskTrackingZone ? this.taskTrackingZone.macroTasks.map(t => ({
                                source: t.source,
                                creationLocation: t.creationLocation,
                                data: t.data
                            })) : []
                        }
                        addCallback(t, r, o) {
                            let i = -1;
                            r && r > 0 && (i = setTimeout(() => {
                                this._callbacks = this._callbacks.filter(s => s.timeoutId !== i), t()
                            }, r)), this._callbacks.push({
                                doneCb: t,
                                timeoutId: i,
                                updateCb: o
                            })
                        }
                        whenStable(t, r, o) {
                            if (o && !this.taskTrackingZone) throw new Error('Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?');
                            this.addCallback(t, r, o), this._runCallbacksIfReady()
                        }
                        getPendingRequestCount() {
                            return this._pendingCount
                        }
                        registerApplication(t) {
                            this.registry.registerApplication(t, this)
                        }
                        unregisterApplication(t) {
                            this.registry.unregisterApplication(t)
                        }
                        findProviders(t, r, o) {
                            return []
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(x(J), x(Gh), x(_c))
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac
                        })
                    }
                    return e
                })(),
                Gh = (() => {
                    class e {
                        constructor() {
                            this._applications = new Map
                        }
                        registerApplication(t, r) {
                            this._applications.set(t, r)
                        }
                        unregisterApplication(t) {
                            this._applications.delete(t)
                        }
                        unregisterAllApplications() {
                            this._applications.clear()
                        }
                        getTestability(t) {
                            return this._applications.get(t) || null
                        }
                        getAllTestabilities() {
                            return Array.from(this._applications.values())
                        }
                        getAllRootElements() {
                            return Array.from(this._applications.keys())
                        }
                        findTestabilityInTree(t, r = !0) {
                            return qh?.findTestabilityInTree(this, t, r) ?? null
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "platform"
                        })
                    }
                    return e
                })();

            function Gs(e) {
                return !!e && "function" == typeof e.then
            }

            function lb(e) {
                return !!e && "function" == typeof e.subscribe
            }
            const Wh = new M("");
            let Zh = (() => {
                class e {
                    constructor() {
                        this.initialized = !1, this.done = !1, this.donePromise = new Promise((t, r) => {
                            this.resolve = t, this.reject = r
                        }), this.appInits = w(Wh, {
                            optional: !0
                        }) ?? []
                    }
                    runInitializers() {
                        if (this.initialized) return;
                        const t = [];
                        for (const o of this.appInits) {
                            const i = o();
                            if (Gs(i)) t.push(i);
                            else if (lb(i)) {
                                const s = new Promise((a, l) => {
                                    i.subscribe({
                                        complete: a,
                                        error: l
                                    })
                                });
                                t.push(s)
                            }
                        }
                        const r = () => {
                            this.done = !0, this.resolve()
                        };
                        Promise.all(t).then(() => {
                            r()
                        }).catch(o => {
                            this.reject(o)
                        }), 0 === t.length && r(), this.initialized = !0
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            const Qh = new M("");

            function db(e, n) {
                return Array.isArray(n) ? n.reduce(db, e) : {
                    ...e,
                    ...n
                }
            }
            let gr = (() => {
                class e {
                    constructor() {
                        this._bootstrapListeners = [], this._runningTick = !1, this._destroyed = !1, this._destroyListeners = [], this._views = [], this.internalErrorHandler = w(Hy), this.afterRenderEffectManager = w(Ds), this.externalTestViews = new Set, this.beforeRender = new ze, this.afterTick = new ze, this.componentTypes = [], this.components = [], this.isStable = w(dr).hasPendingTasks.pipe(Z(t => !t)), this._injector = w(vt)
                    }
                    get destroyed() {
                        return this._destroyed
                    }
                    get injector() {
                        return this._injector
                    }
                    bootstrap(t, r) {
                        const o = t instanceof A_;
                        if (!this._injector.get(Zh).done) throw !o && function or(e) {
                            const n = G(e) || je(e) || Ze(e);
                            return null !== n && n.standalone
                        }(t), new C(405, !1);
                        let s;
                        s = o ? t : this._injector.get(zl).resolveComponentFactory(t), this.componentTypes.push(s.componentType);
                        const a = function ZF(e) {
                                return e.isBoundToModule
                            }(s) ? void 0 : this._injector.get(Br),
                            c = s.create(ct.NULL, [], r || s.selector, a),
                            u = c.location.nativeElement,
                            d = c.injector.get(ab, null);
                        return d?.registerApplication(u), c.onDestroy(() => {
                            this.detachView(c.hostView), Cc(this.components, c), d?.unregisterApplication(u)
                        }), this._loadComponent(c), c
                    }
                    tick() {
                        this._tick(!0)
                    }
                    _tick(t) {
                        if (this._runningTick) throw new C(101, !1);
                        const r = z(null);
                        try {
                            this._runningTick = !0, this.detectChangesInAttachedViews(t)
                        } catch (o) {
                            this.internalErrorHandler(o)
                        } finally {
                            this.afterTick.next(), this._runningTick = !1, z(r)
                        }
                    }
                    detectChangesInAttachedViews(t) {
                        let r = 0;
                        const o = this.afterRenderEffectManager;
                        for (;;) {
                            if (r === C_) throw new C(103, !1);
                            if (t) {
                                const i = 0 === r;
                                this.beforeRender.next(i);
                                for (let {
                                        _lView: s,
                                        notifyErrorHandler: a
                                    }
                                    of this._views) YF(s, i, a)
                            }
                            if (r++, o.executeInternalCallbacks(), ![...this.externalTestViews.keys(), ...this._views].some(({
                                    _lView: i
                                }) => Yh(i)) && (o.execute(), ![...this.externalTestViews.keys(), ...this._views].some(({
                                    _lView: i
                                }) => Yh(i)))) break
                        }
                    }
                    attachView(t) {
                        const r = t;
                        this._views.push(r), r.attachToAppRef(this)
                    }
                    detachView(t) {
                        const r = t;
                        Cc(this._views, r), r.detachFromAppRef()
                    }
                    _loadComponent(t) {
                        this.attachView(t.hostView), this.tick(), this.components.push(t);
                        const r = this._injector.get(Qh, []);
                        [...this._bootstrapListeners, ...r].forEach(o => o(t))
                    }
                    ngOnDestroy() {
                        if (!this._destroyed) try {
                            this._destroyListeners.forEach(t => t()), this._views.slice().forEach(t => t.destroy())
                        } finally {
                            this._destroyed = !0, this._views = [], this._bootstrapListeners = [], this._destroyListeners = []
                        }
                    }
                    onDestroy(t) {
                        return this._destroyListeners.push(t), () => Cc(this._destroyListeners, t)
                    }
                    destroy() {
                        if (this._destroyed) throw new C(406, !1);
                        const t = this._injector;
                        t.destroy && !t.destroyed && t.destroy()
                    }
                    get viewCount() {
                        return this._views.length
                    }
                    warnIfDestroyed() {}
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function Cc(e, n) {
                const t = e.indexOf(n);
                t > -1 && e.splice(t, 1)
            }

            function YF(e, n, t) {
                !n && !Yh(e) || function XF(e, n, t) {
                    let r;
                    t ? (r = 0, e[S] |= 1024) : r = 64 & e[S] ? 0 : 1, Vl(e, n, r)
                }(e, t, n)
            }

            function Yh(e) {
                return wd(e)
            }
            class KF {
                constructor(n, t) {
                    this.ngModuleFactory = n, this.componentFactories = t
                }
            }
            let fb = (() => {
                    class e {
                        compileModuleSync(t) {
                            return new ih(t)
                        }
                        compileModuleAsync(t) {
                            return Promise.resolve(this.compileModuleSync(t))
                        }
                        compileModuleAndAllComponentsSync(t) {
                            const r = this.compileModuleSync(t),
                                i = Pt(Xe(t).declarations).reduce((s, a) => {
                                    const l = G(a);
                                    return l && s.push(new Es(l)), s
                                }, []);
                            return new KF(r, i)
                        }
                        compileModuleAndAllComponentsAsync(t) {
                            return Promise.resolve(this.compileModuleAndAllComponentsSync(t))
                        }
                        clearCache() {}
                        clearCacheFor(t) {}
                        getModuleId(t) {}
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                tL = (() => {
                    class e {
                        constructor() {
                            this.zone = w(J), this.applicationRef = w(gr)
                        }
                        initialize() {
                            this._onMicrotaskEmptySubscription || (this._onMicrotaskEmptySubscription = this.zone.onMicrotaskEmpty.subscribe({
                                next: () => {
                                    this.zone.run(() => {
                                        this.applicationRef.tick()
                                    })
                                }
                            }))
                        }
                        ngOnDestroy() {
                            this._onMicrotaskEmptySubscription?.unsubscribe()
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })();

            function nL() {
                const e = w(J),
                    n = w(vn);
                return t => e.runOutsideAngular(() => n.handleError(t))
            }
            let oL = (() => {
                class e {
                    constructor() {
                        this.subscription = new st, this.initialized = !1, this.zone = w(J), this.pendingTasks = w(dr)
                    }
                    initialize() {
                        if (this.initialized) return;
                        this.initialized = !0;
                        let t = null;
                        !this.zone.isStable && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (t = this.pendingTasks.add()), this.zone.runOutsideAngular(() => {
                            this.subscription.add(this.zone.onStable.subscribe(() => {
                                J.assertNotInAngularZone(), queueMicrotask(() => {
                                    null !== t && !this.zone.hasPendingMacrotasks && !this.zone.hasPendingMicrotasks && (this.pendingTasks.remove(t), t = null)
                                })
                            }))
                        }), this.subscription.add(this.zone.onUnstable.subscribe(() => {
                            J.assertInAngularZone(), t ??= this.pendingTasks.add()
                        }))
                    }
                    ngOnDestroy() {
                        this.subscription.unsubscribe()
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            const Wn = new M("", {
                    providedIn: "root",
                    factory: () => w(Wn, q.Optional | q.SkipSelf) || function iL() {
                        return typeof $localize < "u" && $localize.locale || ni
                    }()
                }),
                Xh = new M("");
            let mb = (() => {
                    class e {
                        constructor(t) {
                            this._injector = t, this._modules = [], this._destroyListeners = [], this._destroyed = !1
                        }
                        bootstrapModuleFactory(t, r) {
                            const o = function QO(e = "zone.js", n) {
                                return "noop" === e ? new L_ : "zone.js" === e ? new J(n) : e
                            }(r?.ngZone, function gb(e) {
                                return {
                                    enableLongStackTrace: !1,
                                    shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                                    shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1
                                }
                            }({
                                eventCoalescing: r?.ngZoneEventCoalescing,
                                runCoalescing: r?.ngZoneRunCoalescing
                            }));
                            return o.run(() => {
                                const i = function U1(e, n, t) {
                                        return new oh(e, n, t)
                                    }(t.moduleType, this.injector, function pb(e) {
                                        return [{
                                            provide: J,
                                            useFactory: e
                                        }, {
                                            provide: Or,
                                            multi: !0,
                                            useFactory: () => {
                                                const n = w(tL, {
                                                    optional: !0
                                                });
                                                return () => n.initialize()
                                            }
                                        }, {
                                            provide: Or,
                                            multi: !0,
                                            useFactory: () => {
                                                const n = w(oL);
                                                return () => {
                                                    n.initialize()
                                                }
                                            }
                                        }, {
                                            provide: Hy,
                                            useFactory: nL
                                        }]
                                    }(() => o)),
                                    s = i.injector.get(vn, null);
                                return o.runOutsideAngular(() => {
                                        const a = o.onError.subscribe({
                                            next: l => {
                                                s.handleError(l)
                                            }
                                        });
                                        i.onDestroy(() => {
                                            Cc(this._modules, i), a.unsubscribe()
                                        })
                                    }),
                                    function ub(e, n, t) {
                                        try {
                                            const r = t();
                                            return Gs(r) ? r.catch(o => {
                                                throw n.runOutsideAngular(() => e.handleError(o)), o
                                            }) : r
                                        } catch (r) {
                                            throw n.runOutsideAngular(() => e.handleError(r)), r
                                        }
                                    }(s, o, () => {
                                        const a = i.injector.get(Zh);
                                        return a.runInitializers(), a.donePromise.then(() => (function SD(e) {
                                            "string" == typeof e && (xD = e.toLowerCase().replace(/_/g, "-"))
                                        }(i.injector.get(Wn, ni) || ni), this._moduleDoBootstrap(i), i))
                                    })
                            })
                        }
                        bootstrapModule(t, r = []) {
                            const o = db({}, r);
                            return function eL(e, n, t) {
                                const r = new ih(t);
                                return Promise.resolve(r)
                            }(0, 0, t).then(i => this.bootstrapModuleFactory(i, o))
                        }
                        _moduleDoBootstrap(t) {
                            const r = t.injector.get(gr);
                            if (t._bootstrapComponents.length > 0) t._bootstrapComponents.forEach(o => r.bootstrap(o));
                            else {
                                if (!t.instance.ngDoBootstrap) throw new C(-403, !1);
                                t.instance.ngDoBootstrap(r)
                            }
                            this._modules.push(t)
                        }
                        onDestroy(t) {
                            this._destroyListeners.push(t)
                        }
                        get injector() {
                            return this._injector
                        }
                        destroy() {
                            if (this._destroyed) throw new C(404, !1);
                            this._modules.slice().forEach(r => r.destroy()), this._destroyListeners.forEach(r => r());
                            const t = this._injector.get(Xh, null);
                            t && (t.forEach(r => r()), t.clear()), this._destroyed = !0
                        }
                        get destroyed() {
                            return this._destroyed
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(x(ct))
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "platform"
                        })
                    }
                    return e
                })(),
                mr = null;
            const yb = new M("");

            function vb(e, n, t = []) {
                const r = `Platform: ${n}`,
                    o = new M(r);
                return (i = []) => {
                    let s = Kh();
                    if (!s || s.injector.get(yb, !1)) {
                        const a = [...t, ...i, {
                            provide: o,
                            useValue: !0
                        }];
                        e ? e(a) : function lL(e) {
                            if (mr && !mr.get(yb, !1)) throw new C(400, !1);
                            (function cb() {
                                ! function Ex(e) {
                                    lm = e
                                }(() => {
                                    throw new C(600, !1)
                                })
                            })(), mr = e;
                            const n = e.get(mb);
                            (function Cb(e) {
                                e.get(dv, null)?.forEach(t => t())
                            })(e)
                        }(function _b(e = [], n) {
                            return ct.create({
                                name: n,
                                providers: [{
                                    provide: ld,
                                    useValue: "platform"
                                }, {
                                    provide: Xh,
                                    useValue: new Set([() => mr = null])
                                }, ...e]
                            })
                        }(a, r))
                    }
                    return function cL(e) {
                        const n = Kh();
                        if (!n) throw new C(401, !1);
                        return n
                    }()
                }
            }

            function Kh() {
                return mr?.get(mb) ?? null
            }
            let qs = (() => {
                class e {
                    static #e = this.__NG_ELEMENT_ID__ = dL
                }
                return e
            })();

            function dL(e) {
                return function fL(e, n, t) {
                    if (kr(e) && !t) {
                        const r = Nt(e.index, n);
                        return new ms(r, r)
                    }
                    return 47 & e.type ? new ms(n[Ee], n) : null
                }(ie(), _(), !(16 & ~e))
            }
            class Sb {
                constructor() {}
                supports(n) {
                    return n instanceof Map || sh(n)
                }
                create() {
                    return new CL
                }
            }
            class CL {
                constructor() {
                    this._records = new Map, this._mapHead = null, this._appendAfter = null, this._previousMapHead = null, this._changesHead = null, this._changesTail = null, this._additionsHead = null, this._additionsTail = null, this._removalsHead = null, this._removalsTail = null
                }
                get isDirty() {
                    return null !== this._additionsHead || null !== this._changesHead || null !== this._removalsHead
                }
                forEachItem(n) {
                    let t;
                    for (t = this._mapHead; null !== t; t = t._next) n(t)
                }
                forEachPreviousItem(n) {
                    let t;
                    for (t = this._previousMapHead; null !== t; t = t._nextPrevious) n(t)
                }
                forEachChangedItem(n) {
                    let t;
                    for (t = this._changesHead; null !== t; t = t._nextChanged) n(t)
                }
                forEachAddedItem(n) {
                    let t;
                    for (t = this._additionsHead; null !== t; t = t._nextAdded) n(t)
                }
                forEachRemovedItem(n) {
                    let t;
                    for (t = this._removalsHead; null !== t; t = t._nextRemoved) n(t)
                }
                diff(n) {
                    if (n) {
                        if (!(n instanceof Map || sh(n))) throw new C(900, !1)
                    } else n = new Map;
                    return this.check(n) ? this : null
                }
                onDestroy() {}
                check(n) {
                    this._reset();
                    let t = this._mapHead;
                    if (this._appendAfter = null, this._forEach(n, (r, o) => {
                            if (t && t.key === o) this._maybeAddToChanges(t, r), this._appendAfter = t, t = t._next;
                            else {
                                const i = this._getOrCreateRecordForKey(o, r);
                                t = this._insertBeforeOrAppend(t, i)
                            }
                        }), t) {
                        t._prev && (t._prev._next = null), this._removalsHead = t;
                        for (let r = t; null !== r; r = r._nextRemoved) r === this._mapHead && (this._mapHead = null), this._records.delete(r.key), r._nextRemoved = r._next, r.previousValue = r.currentValue, r.currentValue = null, r._prev = null, r._next = null
                    }
                    return this._changesTail && (this._changesTail._nextChanged = null), this._additionsTail && (this._additionsTail._nextAdded = null), this.isDirty
                }
                _insertBeforeOrAppend(n, t) {
                    if (n) {
                        const r = n._prev;
                        return t._next = n, t._prev = r, n._prev = t, r && (r._next = t), n === this._mapHead && (this._mapHead = t), this._appendAfter = n, n
                    }
                    return this._appendAfter ? (this._appendAfter._next = t, t._prev = this._appendAfter) : this._mapHead = t, this._appendAfter = t, null
                }
                _getOrCreateRecordForKey(n, t) {
                    if (this._records.has(n)) {
                        const o = this._records.get(n);
                        this._maybeAddToChanges(o, t);
                        const i = o._prev,
                            s = o._next;
                        return i && (i._next = s), s && (s._prev = i), o._next = null, o._prev = null, o
                    }
                    const r = new DL(n);
                    return this._records.set(n, r), r.currentValue = t, this._addToAdditions(r), r
                }
                _reset() {
                    if (this.isDirty) {
                        let n;
                        for (this._previousMapHead = this._mapHead, n = this._previousMapHead; null !== n; n = n._next) n._nextPrevious = n._next;
                        for (n = this._changesHead; null !== n; n = n._nextChanged) n.previousValue = n.currentValue;
                        for (n = this._additionsHead; null != n; n = n._nextAdded) n.previousValue = n.currentValue;
                        this._changesHead = this._changesTail = null, this._additionsHead = this._additionsTail = null, this._removalsHead = null
                    }
                }
                _maybeAddToChanges(n, t) {
                    Object.is(t, n.currentValue) || (n.previousValue = n.currentValue, n.currentValue = t, this._addToChanges(n))
                }
                _addToAdditions(n) {
                    null === this._additionsHead ? this._additionsHead = this._additionsTail = n : (this._additionsTail._nextAdded = n, this._additionsTail = n)
                }
                _addToChanges(n) {
                    null === this._changesHead ? this._changesHead = this._changesTail = n : (this._changesTail._nextChanged = n, this._changesTail = n)
                }
                _forEach(n, t) {
                    n instanceof Map ? n.forEach(t) : Object.keys(n).forEach(r => t(n[r], r))
                }
            }
            class DL {
                constructor(n) {
                    this.key = n, this.previousValue = null, this.currentValue = null, this._nextPrevious = null, this._next = null, this._prev = null, this._nextAdded = null, this._nextRemoved = null, this._nextChanged = null
                }
            }

            function Ab() {
                return new Ec([new Sb])
            }
            let Ec = (() => {
                class e {
                    static #e = this.\u0275prov = I({
                        token: e,
                        providedIn: "root",
                        factory: Ab
                    });
                    constructor(t) {
                        this.factories = t
                    }
                    static create(t, r) {
                        if (r) {
                            const o = r.factories.slice();
                            t = t.concat(o)
                        }
                        return new e(t)
                    }
                    static extend(t) {
                        return {
                            provide: e,
                            useFactory: r => e.create(t, r || Ab()),
                            deps: [
                                [e, new Ha, new Ba]
                            ]
                        }
                    }
                    find(t) {
                        const r = this.factories.find(o => o.supports(t));
                        if (r) return r;
                        throw new C(901, !1)
                    }
                }
                return e
            })();
            const EL = vb(null, "core", []);
            let ML = (() => {
                class e {
                    constructor(t) {}
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(gr))
                    };
                    static #t = this.\u0275mod = zt({
                        type: e
                    });
                    static #n = this.\u0275inj = xt({})
                }
                return e
            })();

            function Kb(e) {
                const n = z(null);
                try {
                    return e()
                } finally {
                    z(n)
                }
            }
            let Jb = null;

            function yr() {
                return Jb
            }
            class l2 {}
            const Et = new M("");
            let sp = (() => {
                class e {
                    historyGo(t) {
                        throw new Error("")
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: () => w(u2),
                        providedIn: "platform"
                    })
                }
                return e
            })();
            const c2 = new M("");
            let u2 = (() => {
                class e extends sp {
                    constructor() {
                        super(), this._doc = w(Et), this._location = window.location, this._history = window.history
                    }
                    getBaseHrefFromDOM() {
                        return yr().getBaseHref(this._doc)
                    }
                    onPopState(t) {
                        const r = yr().getGlobalEventTarget(this._doc, "window");
                        return r.addEventListener("popstate", t, !1), () => r.removeEventListener("popstate", t)
                    }
                    onHashChange(t) {
                        const r = yr().getGlobalEventTarget(this._doc, "window");
                        return r.addEventListener("hashchange", t, !1), () => r.removeEventListener("hashchange", t)
                    }
                    get href() {
                        return this._location.href
                    }
                    get protocol() {
                        return this._location.protocol
                    }
                    get hostname() {
                        return this._location.hostname
                    }
                    get port() {
                        return this._location.port
                    }
                    get pathname() {
                        return this._location.pathname
                    }
                    get search() {
                        return this._location.search
                    }
                    get hash() {
                        return this._location.hash
                    }
                    set pathname(t) {
                        this._location.pathname = t
                    }
                    pushState(t, r, o) {
                        this._history.pushState(t, r, o)
                    }
                    replaceState(t, r, o) {
                        this._history.replaceState(t, r, o)
                    }
                    forward() {
                        this._history.forward()
                    }
                    back() {
                        this._history.back()
                    }
                    historyGo(t = 0) {
                        this._history.go(t)
                    }
                    getState() {
                        return this._history.state
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: () => new e,
                        providedIn: "platform"
                    })
                }
                return e
            })();

            function ap(e, n) {
                if (0 == e.length) return n;
                if (0 == n.length) return e;
                let t = 0;
                return e.endsWith("/") && t++, n.startsWith("/") && t++, 2 == t ? e + n.substring(1) : 1 == t ? e + n : e + "/" + n
            }

            function e0(e) {
                const n = e.match(/#|\?|$/),
                    t = n && n.index || e.length;
                return e.slice(0, t - ("/" === e[t - 1] ? 1 : 0)) + e.slice(t)
            }

            function Zn(e) {
                return e && "?" !== e[0] ? "?" + e : e
            }
            let Qr = (() => {
                class e {
                    historyGo(t) {
                        throw new Error("")
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: () => w(n0),
                        providedIn: "root"
                    })
                }
                return e
            })();
            const t0 = new M("");
            let n0 = (() => {
                    class e extends Qr {
                        constructor(t, r) {
                            super(), this._platformLocation = t, this._removeListenerFns = [], this._baseHref = r ?? this._platformLocation.getBaseHrefFromDOM() ?? w(Et).location?.origin ?? ""
                        }
                        ngOnDestroy() {
                            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                        }
                        onPopState(t) {
                            this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
                        }
                        getBaseHref() {
                            return this._baseHref
                        }
                        prepareExternalUrl(t) {
                            return ap(this._baseHref, t)
                        }
                        path(t = !1) {
                            const r = this._platformLocation.pathname + Zn(this._platformLocation.search),
                                o = this._platformLocation.hash;
                            return o && t ? `${r}${o}` : r
                        }
                        pushState(t, r, o, i) {
                            const s = this.prepareExternalUrl(o + Zn(i));
                            this._platformLocation.pushState(t, r, s)
                        }
                        replaceState(t, r, o, i) {
                            const s = this.prepareExternalUrl(o + Zn(i));
                            this._platformLocation.replaceState(t, r, s)
                        }
                        forward() {
                            this._platformLocation.forward()
                        }
                        back() {
                            this._platformLocation.back()
                        }
                        getState() {
                            return this._platformLocation.getState()
                        }
                        historyGo(t = 0) {
                            this._platformLocation.historyGo?.(t)
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(x(sp), x(t0, 8))
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                d2 = (() => {
                    class e extends Qr {
                        constructor(t, r) {
                            super(), this._platformLocation = t, this._baseHref = "", this._removeListenerFns = [], null != r && (this._baseHref = r)
                        }
                        ngOnDestroy() {
                            for (; this._removeListenerFns.length;) this._removeListenerFns.pop()()
                        }
                        onPopState(t) {
                            this._removeListenerFns.push(this._platformLocation.onPopState(t), this._platformLocation.onHashChange(t))
                        }
                        getBaseHref() {
                            return this._baseHref
                        }
                        path(t = !1) {
                            const r = this._platformLocation.hash ?? "#";
                            return r.length > 0 ? r.substring(1) : r
                        }
                        prepareExternalUrl(t) {
                            const r = ap(this._baseHref, t);
                            return r.length > 0 ? "#" + r : r
                        }
                        pushState(t, r, o, i) {
                            let s = this.prepareExternalUrl(o + Zn(i));
                            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.pushState(t, r, s)
                        }
                        replaceState(t, r, o, i) {
                            let s = this.prepareExternalUrl(o + Zn(i));
                            0 == s.length && (s = this._platformLocation.pathname), this._platformLocation.replaceState(t, r, s)
                        }
                        forward() {
                            this._platformLocation.forward()
                        }
                        back() {
                            this._platformLocation.back()
                        }
                        getState() {
                            return this._platformLocation.getState()
                        }
                        historyGo(t = 0) {
                            this._platformLocation.historyGo?.(t)
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(x(sp), x(t0, 8))
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac
                        })
                    }
                    return e
                })(),
                Qs = (() => {
                    class e {
                        constructor(t) {
                            this._subject = new _e, this._urlChangeListeners = [], this._urlChangeSubscription = null, this._locationStrategy = t;
                            const r = this._locationStrategy.getBaseHref();
                            this._basePath = function p2(e) {
                                if (new RegExp("^(https?:)?//").test(e)) {
                                    const [, t] = e.split(/\/\/[^\/]+/);
                                    return t
                                }
                                return e
                            }(e0(r0(r))), this._locationStrategy.onPopState(o => {
                                this._subject.emit({
                                    url: this.path(!0),
                                    pop: !0,
                                    state: o.state,
                                    type: o.type
                                })
                            })
                        }
                        ngOnDestroy() {
                            this._urlChangeSubscription?.unsubscribe(), this._urlChangeListeners = []
                        }
                        path(t = !1) {
                            return this.normalize(this._locationStrategy.path(t))
                        }
                        getState() {
                            return this._locationStrategy.getState()
                        }
                        isCurrentPathEqualTo(t, r = "") {
                            return this.path() == this.normalize(t + Zn(r))
                        }
                        normalize(t) {
                            return e.stripTrailingSlash(function h2(e, n) {
                                if (!e || !n.startsWith(e)) return n;
                                const t = n.substring(e.length);
                                return "" === t || ["/", ";", "?", "#"].includes(t[0]) ? t : n
                            }(this._basePath, r0(t)))
                        }
                        prepareExternalUrl(t) {
                            return t && "/" !== t[0] && (t = "/" + t), this._locationStrategy.prepareExternalUrl(t)
                        }
                        go(t, r = "", o = null) {
                            this._locationStrategy.pushState(o, "", t, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Zn(r)), o)
                        }
                        replaceState(t, r = "", o = null) {
                            this._locationStrategy.replaceState(o, "", t, r), this._notifyUrlChangeListeners(this.prepareExternalUrl(t + Zn(r)), o)
                        }
                        forward() {
                            this._locationStrategy.forward()
                        }
                        back() {
                            this._locationStrategy.back()
                        }
                        historyGo(t = 0) {
                            this._locationStrategy.historyGo?.(t)
                        }
                        onUrlChange(t) {
                            return this._urlChangeListeners.push(t), this._urlChangeSubscription ??= this.subscribe(r => {
                                this._notifyUrlChangeListeners(r.url, r.state)
                            }), () => {
                                const r = this._urlChangeListeners.indexOf(t);
                                this._urlChangeListeners.splice(r, 1), 0 === this._urlChangeListeners.length && (this._urlChangeSubscription?.unsubscribe(), this._urlChangeSubscription = null)
                            }
                        }
                        _notifyUrlChangeListeners(t = "", r) {
                            this._urlChangeListeners.forEach(o => o(t, r))
                        }
                        subscribe(t, r, o) {
                            return this._subject.subscribe({
                                next: t,
                                error: r,
                                complete: o
                            })
                        }
                        static #e = this.normalizeQueryParams = Zn;
                        static #t = this.joinWithSlash = ap;
                        static #n = this.stripTrailingSlash = e0;
                        static #r = this.\u0275fac = function(r) {
                            return new(r || e)(x(Qr))
                        };
                        static #o = this.\u0275prov = I({
                            token: e,
                            factory: () => function f2() {
                                return new Qs(x(Qr))
                            }(),
                            providedIn: "root"
                        })
                    }
                    return e
                })();

            function r0(e) {
                return e.replace(/\/index.html$/, "")
            }

            function h0(e, n) {
                n = encodeURIComponent(n);
                for (const t of e.split(";")) {
                    const r = t.indexOf("="),
                        [o, i] = -1 == r ? [t, ""] : [t.slice(0, r), t.slice(r + 1)];
                    if (o.trim() === n) return decodeURIComponent(i)
                }
                return null
            }
            const yp = /\s+/,
                p0 = [];
            let g0 = (() => {
                    class e {
                        constructor(t, r) {
                            this._ngEl = t, this._renderer = r, this.initialClasses = p0, this.stateMap = new Map
                        }
                        set klass(t) {
                            this.initialClasses = null != t ? t.trim().split(yp) : p0
                        }
                        set ngClass(t) {
                            this.rawClass = "string" == typeof t ? t.trim().split(yp) : t
                        }
                        ngDoCheck() {
                            for (const r of this.initialClasses) this._updateState(r, !0);
                            const t = this.rawClass;
                            if (Array.isArray(t) || t instanceof Set)
                                for (const r of t) this._updateState(r, !0);
                            else if (null != t)
                                for (const r of Object.keys(t)) this._updateState(r, !!t[r]);
                            this._applyStateDiff()
                        }
                        _updateState(t, r) {
                            const o = this.stateMap.get(t);
                            void 0 !== o ? (o.enabled !== r && (o.changed = !0, o.enabled = r), o.touched = !0) : this.stateMap.set(t, {
                                enabled: r,
                                changed: !0,
                                touched: !0
                            })
                        }
                        _applyStateDiff() {
                            for (const t of this.stateMap) {
                                const r = t[0],
                                    o = t[1];
                                o.changed ? (this._toggleClass(r, o.enabled), o.changed = !1) : o.touched || (o.enabled && this._toggleClass(r, !1), this.stateMap.delete(r)), o.touched = !1
                            }
                        }
                        _toggleClass(t, r) {
                            (t = t.trim()).length > 0 && t.split(yp).forEach(o => {
                                r ? this._renderer.addClass(this._ngEl.nativeElement, o) : this._renderer.removeClass(this._ngEl.nativeElement, o)
                            })
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(D(ut), D(Dn))
                        };
                        static #t = this.\u0275dir = L({
                            type: e,
                            selectors: [
                                ["", "ngClass", ""]
                            ],
                            inputs: {
                                klass: [ve.None, "class", "klass"],
                                ngClass: "ngClass"
                            },
                            standalone: !0
                        })
                    }
                    return e
                })(),
                C0 = (() => {
                    class e {
                        constructor(t, r, o) {
                            this._ngEl = t, this._differs = r, this._renderer = o, this._ngStyle = null, this._differ = null
                        }
                        set ngStyle(t) {
                            this._ngStyle = t, !this._differ && t && (this._differ = this._differs.find(t).create())
                        }
                        ngDoCheck() {
                            if (this._differ) {
                                const t = this._differ.diff(this._ngStyle);
                                t && this._applyChanges(t)
                            }
                        }
                        _setStyle(t, r) {
                            const [o, i] = t.split("."), s = -1 === o.indexOf("-") ? void 0 : lr.DashCase;
                            null != r ? this._renderer.setStyle(this._ngEl.nativeElement, o, i ? `${r}${i}` : r, s) : this._renderer.removeStyle(this._ngEl.nativeElement, o, s)
                        }
                        _applyChanges(t) {
                            t.forEachRemovedItem(r => this._setStyle(r.key, null)), t.forEachAddedItem(r => this._setStyle(r.key, r.currentValue)), t.forEachChangedItem(r => this._setStyle(r.key, r.currentValue))
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(D(ut), D(Ec), D(Dn))
                        };
                        static #t = this.\u0275dir = L({
                            type: e,
                            selectors: [
                                ["", "ngStyle", ""]
                            ],
                            inputs: {
                                ngStyle: "ngStyle"
                            },
                            standalone: !0
                        })
                    }
                    return e
                })();
            class aV {
                createSubscription(n, t) {
                    return Kb(() => n.subscribe({
                        next: t,
                        error: r => {
                            throw r
                        }
                    }))
                }
                dispose(n) {
                    Kb(() => n.unsubscribe())
                }
            }
            class lV {
                createSubscription(n, t) {
                    return n.then(t, r => {
                        throw r
                    })
                }
                dispose(n) {}
            }
            const cV = new lV,
                uV = new aV;
            let D0 = (() => {
                    class e {
                        constructor(t) {
                            this._latestValue = null, this.markForCheckOnValueUpdate = !0, this._subscription = null, this._obj = null, this._strategy = null, this._ref = t
                        }
                        ngOnDestroy() {
                            this._subscription && this._dispose(), this._ref = null
                        }
                        transform(t) {
                            if (!this._obj) {
                                if (t) try {
                                    this.markForCheckOnValueUpdate = !1, this._subscribe(t)
                                } finally {
                                    this.markForCheckOnValueUpdate = !0
                                }
                                return this._latestValue
                            }
                            return t !== this._obj ? (this._dispose(), this.transform(t)) : this._latestValue
                        }
                        _subscribe(t) {
                            this._obj = t, this._strategy = this._selectStrategy(t), this._subscription = this._strategy.createSubscription(t, r => this._updateLatestValue(t, r))
                        }
                        _selectStrategy(t) {
                            if (Gs(t)) return cV;
                            if (lb(t)) return uV;
                            throw function sn(e, n) {
                                return new C(2100, !1)
                            }()
                        }
                        _dispose() {
                            this._strategy.dispose(this._subscription), this._latestValue = null, this._subscription = null, this._obj = null
                        }
                        _updateLatestValue(t, r) {
                            t === this._obj && (this._latestValue = r, this.markForCheckOnValueUpdate && this._ref?.markForCheck())
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(D(qs, 16))
                        };
                        static #t = this.\u0275pipe = Ye({
                            name: "async",
                            type: e,
                            pure: !1,
                            standalone: !0
                        })
                    }
                    return e
                })(),
                b0 = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275mod = zt({
                            type: e
                        });
                        static #n = this.\u0275inj = xt({})
                    }
                    return e
                })();
            const E0 = "browser";

            function Yr(e) {
                return e === E0
            }

            function M0(e) {
                return "server" === e
            }
            let NV = (() => {
                class e {
                    static #e = this.\u0275prov = I({
                        token: e,
                        providedIn: "root",
                        factory: () => Yr(w(Hn)) ? new OV(w(Et), window) : new PV
                    })
                }
                return e
            })();
            class OV {
                constructor(n, t) {
                    this.document = n, this.window = t, this.offset = () => [0, 0]
                }
                setOffset(n) {
                    this.offset = Array.isArray(n) ? () => n : n
                }
                getScrollPosition() {
                    return [this.window.scrollX, this.window.scrollY]
                }
                scrollToPosition(n) {
                    this.window.scrollTo(n[0], n[1])
                }
                scrollToAnchor(n) {
                    const t = function RV(e, n) {
                        const t = e.getElementById(n) || e.getElementsByName(n)[0];
                        if (t) return t;
                        if ("function" == typeof e.createTreeWalker && e.body && "function" == typeof e.body.attachShadow) {
                            const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
                            let o = r.currentNode;
                            for (; o;) {
                                const i = o.shadowRoot;
                                if (i) {
                                    const s = i.getElementById(n) || i.querySelector(`[name="${n}"]`);
                                    if (s) return s
                                }
                                o = r.nextNode()
                            }
                        }
                        return null
                    }(this.document, n);
                    t && (this.scrollToElement(t), t.focus())
                }
                setHistoryScrollRestoration(n) {
                    this.window.history.scrollRestoration = n
                }
                scrollToElement(n) {
                    const t = n.getBoundingClientRect(),
                        r = t.left + this.window.pageXOffset,
                        o = t.top + this.window.pageYOffset,
                        i = this.offset();
                    this.window.scrollTo(r - i[0], o - i[1])
                }
            }
            class PV {
                setOffset(n) {}
                getScrollPosition() {
                    return [0, 0]
                }
                scrollToPosition(n) {}
                scrollToAnchor(n) {}
                setHistoryScrollRestoration(n) {}
            }
            class I0 {}
            class lj extends l2 {
                constructor() {
                    super(...arguments), this.supportsDOMEvents = !0
                }
            }
            class bp extends lj {
                static makeCurrent() {
                    ! function a2(e) {
                        Jb ??= e
                    }(new bp)
                }
                onAndCancel(n, t, r) {
                    return n.addEventListener(t, r), () => {
                        n.removeEventListener(t, r)
                    }
                }
                dispatchEvent(n, t) {
                    n.dispatchEvent(t)
                }
                remove(n) {
                    n.parentNode && n.parentNode.removeChild(n)
                }
                createElement(n, t) {
                    return (t = t || this.getDefaultDocument()).createElement(n)
                }
                createHtmlDocument() {
                    return document.implementation.createHTMLDocument("fakeTitle")
                }
                getDefaultDocument() {
                    return document
                }
                isElementNode(n) {
                    return n.nodeType === Node.ELEMENT_NODE
                }
                isShadowRoot(n) {
                    return n instanceof DocumentFragment
                }
                getGlobalEventTarget(n, t) {
                    return "window" === t ? window : "document" === t ? n : "body" === t ? n.body : null
                }
                getBaseHref(n) {
                    const t = function cj() {
                        return Js = Js || document.querySelector("base"), Js ? Js.getAttribute("href") : null
                    }();
                    return null == t ? null : function uj(e) {
                        return new URL(e, document.baseURI).pathname
                    }(t)
                }
                resetBaseElement() {
                    Js = null
                }
                getUserAgent() {
                    return window.navigator.userAgent
                }
                getCookie(n) {
                    return h0(document.cookie, n)
                }
            }
            let Js = null,
                fj = (() => {
                    class e {
                        build() {
                            return new XMLHttpRequest
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac
                        })
                    }
                    return e
                })();
            const Ep = new M("");
            let k0 = (() => {
                class e {
                    constructor(t, r) {
                        this._zone = r, this._eventNameToPlugin = new Map, t.forEach(o => {
                            o.manager = this
                        }), this._plugins = t.slice().reverse()
                    }
                    addEventListener(t, r, o) {
                        return this._findPluginFor(r).addEventListener(t, r, o)
                    }
                    getZone() {
                        return this._zone
                    }
                    _findPluginFor(t) {
                        let r = this._eventNameToPlugin.get(t);
                        if (r) return r;
                        if (r = this._plugins.find(i => i.supports(t)), !r) throw new C(5101, !1);
                        return this._eventNameToPlugin.set(t, r), r
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(Ep), x(J))
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            class F0 {
                constructor(n) {
                    this._doc = n
                }
            }
            const Mp = "ng-app-id";
            let L0 = (() => {
                class e {
                    constructor(t, r, o, i = {}) {
                        this.doc = t, this.appId = r, this.nonce = o, this.platformId = i, this.styleRef = new Map, this.hostNodes = new Set, this.styleNodesInDOM = this.collectServerRenderedStyles(), this.platformIsServer = M0(i), this.resetHostNodes()
                    }
                    addStyles(t) {
                        for (const r of t) 1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r)
                    }
                    removeStyles(t) {
                        for (const r of t) this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r)
                    }
                    ngOnDestroy() {
                        const t = this.styleNodesInDOM;
                        t && (t.forEach(r => r.remove()), t.clear());
                        for (const r of this.getAllStyles()) this.onStyleRemoved(r);
                        this.resetHostNodes()
                    }
                    addHost(t) {
                        this.hostNodes.add(t);
                        for (const r of this.getAllStyles()) this.addStyleToHost(t, r)
                    }
                    removeHost(t) {
                        this.hostNodes.delete(t)
                    }
                    getAllStyles() {
                        return this.styleRef.keys()
                    }
                    onStyleAdded(t) {
                        for (const r of this.hostNodes) this.addStyleToHost(r, t)
                    }
                    onStyleRemoved(t) {
                        const r = this.styleRef;
                        r.get(t)?.elements?.forEach(o => o.remove()), r.delete(t)
                    }
                    collectServerRenderedStyles() {
                        const t = this.doc.head?.querySelectorAll(`style[${Mp}="${this.appId}"]`);
                        if (t?.length) {
                            const r = new Map;
                            return t.forEach(o => {
                                null != o.textContent && r.set(o.textContent, o)
                            }), r
                        }
                        return null
                    }
                    changeUsageCount(t, r) {
                        const o = this.styleRef;
                        if (o.has(t)) {
                            const i = o.get(t);
                            return i.usage += r, i.usage
                        }
                        return o.set(t, {
                            usage: r,
                            elements: []
                        }), r
                    }
                    getStyleElement(t, r) {
                        const o = this.styleNodesInDOM,
                            i = o?.get(r);
                        if (i?.parentNode === t) return o.delete(r), i.removeAttribute(Mp), i;
                        {
                            const s = this.doc.createElement("style");
                            return this.nonce && s.setAttribute("nonce", this.nonce), s.textContent = r, this.platformIsServer && s.setAttribute(Mp, this.appId), t.appendChild(s), s
                        }
                    }
                    addStyleToHost(t, r) {
                        const o = this.getStyleElement(t, r),
                            i = this.styleRef,
                            s = i.get(r)?.elements;
                        s ? s.push(o) : i.set(r, {
                            elements: [o],
                            usage: 1
                        })
                    }
                    resetHostNodes() {
                        const t = this.hostNodes;
                        t.clear(), t.add(this.doc.head)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(Et), x(yl), x(fv, 8), x(Hn))
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const Ip = {
                    svg: "http://www.w3.org/2000/svg",
                    xhtml: "http://www.w3.org/1999/xhtml",
                    xlink: "http://www.w3.org/1999/xlink",
                    xml: "http://www.w3.org/XML/1998/namespace",
                    xmlns: "http://www.w3.org/2000/xmlns/",
                    math: "http://www.w3.org/1998/MathML/"
                },
                xp = /%COMP%/g,
                mj = new M("", {
                    providedIn: "root",
                    factory: () => !0
                });

            function j0(e, n) {
                return n.map(t => t.replace(xp, e))
            }
            let $0 = (() => {
                class e {
                    constructor(t, r, o, i, s, a, l, c = null) {
                        this.eventManager = t, this.sharedStylesHost = r, this.appId = o, this.removeStylesOnCompDestroy = i, this.doc = s, this.platformId = a, this.ngZone = l, this.nonce = c, this.rendererByCompId = new Map, this.platformIsServer = M0(a), this.defaultRenderer = new Sp(t, s, l, this.platformIsServer)
                    }
                    createRenderer(t, r) {
                        if (!t || !r) return this.defaultRenderer;
                        this.platformIsServer && r.encapsulation === Yt.ShadowDom && (r = {
                            ...r,
                            encapsulation: Yt.Emulated
                        });
                        const o = this.getOrCreateRenderer(t, r);
                        return o instanceof B0 ? o.applyToHost(t) : o instanceof Tp && o.applyStyles(), o
                    }
                    getOrCreateRenderer(t, r) {
                        const o = this.rendererByCompId;
                        let i = o.get(r.id);
                        if (!i) {
                            const s = this.doc,
                                a = this.ngZone,
                                l = this.eventManager,
                                c = this.sharedStylesHost,
                                u = this.removeStylesOnCompDestroy,
                                d = this.platformIsServer;
                            switch (r.encapsulation) {
                                case Yt.Emulated:
                                    i = new B0(l, c, r, this.appId, u, s, a, d);
                                    break;
                                case Yt.ShadowDom:
                                    return new Cj(l, c, t, r, s, a, this.nonce, d);
                                default:
                                    i = new Tp(l, c, r, u, s, a, d)
                            }
                            o.set(r.id, i)
                        }
                        return i
                    }
                    ngOnDestroy() {
                        this.rendererByCompId.clear()
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(k0), x(L0), x(yl), x(mj), x(Et), x(Hn), x(J), x(fv))
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            class Sp {
                constructor(n, t, r, o) {
                    this.eventManager = n, this.doc = t, this.ngZone = r, this.platformIsServer = o, this.data = Object.create(null), this.throwOnSyntheticProps = !0, this.destroyNode = null
                }
                destroy() {}
                createElement(n, t) {
                    return t ? this.doc.createElementNS(Ip[t] || t, n) : this.doc.createElement(n)
                }
                createComment(n) {
                    return this.doc.createComment(n)
                }
                createText(n) {
                    return this.doc.createTextNode(n)
                }
                appendChild(n, t) {
                    (U0(n) ? n.content : n).appendChild(t)
                }
                insertBefore(n, t, r) {
                    n && (U0(n) ? n.content : n).insertBefore(t, r)
                }
                removeChild(n, t) {
                    n && n.removeChild(t)
                }
                selectRootElement(n, t) {
                    let r = "string" == typeof n ? this.doc.querySelector(n) : n;
                    if (!r) throw new C(-5104, !1);
                    return t || (r.textContent = ""), r
                }
                parentNode(n) {
                    return n.parentNode
                }
                nextSibling(n) {
                    return n.nextSibling
                }
                setAttribute(n, t, r, o) {
                    if (o) {
                        t = o + ":" + t;
                        const i = Ip[o];
                        i ? n.setAttributeNS(i, t, r) : n.setAttribute(t, r)
                    } else n.setAttribute(t, r)
                }
                removeAttribute(n, t, r) {
                    if (r) {
                        const o = Ip[r];
                        o ? n.removeAttributeNS(o, t) : n.removeAttribute(`${r}:${t}`)
                    } else n.removeAttribute(t)
                }
                addClass(n, t) {
                    n.classList.add(t)
                }
                removeClass(n, t) {
                    n.classList.remove(t)
                }
                setStyle(n, t, r, o) {
                    o & (lr.DashCase | lr.Important) ? n.style.setProperty(t, r, o & lr.Important ? "important" : "") : n.style[t] = r
                }
                removeStyle(n, t, r) {
                    r & lr.DashCase ? n.style.removeProperty(t) : n.style[t] = ""
                }
                setProperty(n, t, r) {
                    null != n && (n[t] = r)
                }
                setValue(n, t) {
                    n.nodeValue = t
                }
                listen(n, t, r) {
                    if ("string" == typeof n && !(n = yr().getGlobalEventTarget(this.doc, n))) throw new Error(`Unsupported event target ${n} for event ${t}`);
                    return this.eventManager.addEventListener(n, t, this.decoratePreventDefault(r))
                }
                decoratePreventDefault(n) {
                    return t => {
                        if ("__ngUnwrap__" === t) return n;
                        !1 === (this.platformIsServer ? this.ngZone.runGuarded(() => n(t)) : n(t)) && t.preventDefault()
                    }
                }
            }

            function U0(e) {
                return "TEMPLATE" === e.tagName && void 0 !== e.content
            }
            class Cj extends Sp {
                constructor(n, t, r, o, i, s, a, l) {
                    super(n, i, s, l), this.sharedStylesHost = t, this.hostEl = r, this.shadowRoot = r.attachShadow({
                        mode: "open"
                    }), this.sharedStylesHost.addHost(this.shadowRoot);
                    const c = j0(o.id, o.styles);
                    for (const u of c) {
                        const d = document.createElement("style");
                        a && d.setAttribute("nonce", a), d.textContent = u, this.shadowRoot.appendChild(d)
                    }
                }
                nodeOrShadowRoot(n) {
                    return n === this.hostEl ? this.shadowRoot : n
                }
                appendChild(n, t) {
                    return super.appendChild(this.nodeOrShadowRoot(n), t)
                }
                insertBefore(n, t, r) {
                    return super.insertBefore(this.nodeOrShadowRoot(n), t, r)
                }
                removeChild(n, t) {
                    return super.removeChild(this.nodeOrShadowRoot(n), t)
                }
                parentNode(n) {
                    return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))
                }
                destroy() {
                    this.sharedStylesHost.removeHost(this.shadowRoot)
                }
            }
            class Tp extends Sp {
                constructor(n, t, r, o, i, s, a, l) {
                    super(n, i, s, a), this.sharedStylesHost = t, this.removeStylesOnCompDestroy = o, this.styles = l ? j0(l, r.styles) : r.styles
                }
                applyStyles() {
                    this.sharedStylesHost.addStyles(this.styles)
                }
                destroy() {
                    this.removeStylesOnCompDestroy && this.sharedStylesHost.removeStyles(this.styles)
                }
            }
            class B0 extends Tp {
                constructor(n, t, r, o, i, s, a, l) {
                    const c = o + "-" + r.id;
                    super(n, t, r, i, s, a, l, c), this.contentAttr = function yj(e) {
                        return "_ngcontent-%COMP%".replace(xp, e)
                    }(c), this.hostAttr = function vj(e) {
                        return "_nghost-%COMP%".replace(xp, e)
                    }(c)
                }
                applyToHost(n) {
                    this.applyStyles(), this.setAttribute(n, this.hostAttr, "")
                }
                createElement(n, t) {
                    const r = super.createElement(n, t);
                    return super.setAttribute(r, this.contentAttr, ""), r
                }
            }
            let Dj = (() => {
                class e extends F0 {
                    constructor(t) {
                        super(t)
                    }
                    supports(t) {
                        return !0
                    }
                    addEventListener(t, r, o) {
                        return t.addEventListener(r, o, !1), () => this.removeEventListener(t, r, o)
                    }
                    removeEventListener(t, r, o) {
                        return t.removeEventListener(r, o)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(Et))
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const H0 = ["alt", "control", "meta", "shift"],
                wj = {
                    "\b": "Backspace",
                    "\t": "Tab",
                    "\x7f": "Delete",
                    "\x1b": "Escape",
                    Del: "Delete",
                    Esc: "Escape",
                    Left: "ArrowLeft",
                    Right: "ArrowRight",
                    Up: "ArrowUp",
                    Down: "ArrowDown",
                    Menu: "ContextMenu",
                    Scroll: "ScrollLock",
                    Win: "OS"
                },
                bj = {
                    alt: e => e.altKey,
                    control: e => e.ctrlKey,
                    meta: e => e.metaKey,
                    shift: e => e.shiftKey
                };
            let Ej = (() => {
                class e extends F0 {
                    constructor(t) {
                        super(t)
                    }
                    supports(t) {
                        return null != e.parseEventName(t)
                    }
                    addEventListener(t, r, o) {
                        const i = e.parseEventName(r),
                            s = e.eventCallback(i.fullKey, o, this.manager.getZone());
                        return this.manager.getZone().runOutsideAngular(() => yr().onAndCancel(t, i.domEventName, s))
                    }
                    static parseEventName(t) {
                        const r = t.toLowerCase().split("."),
                            o = r.shift();
                        if (0 === r.length || "keydown" !== o && "keyup" !== o) return null;
                        const i = e._normalizeKey(r.pop());
                        let s = "",
                            a = r.indexOf("code");
                        if (a > -1 && (r.splice(a, 1), s = "code."), H0.forEach(c => {
                                const u = r.indexOf(c);
                                u > -1 && (r.splice(u, 1), s += c + ".")
                            }), s += i, 0 != r.length || 0 === i.length) return null;
                        const l = {};
                        return l.domEventName = o, l.fullKey = s, l
                    }
                    static matchEventFullKeyCode(t, r) {
                        let o = wj[t.key] || t.key,
                            i = "";
                        return r.indexOf("code.") > -1 && (o = t.code, i = "code."), !(null == o || !o) && (o = o.toLowerCase(), " " === o ? o = "space" : "." === o && (o = "dot"), H0.forEach(s => {
                            s !== o && (0, bj[s])(t) && (i += s + ".")
                        }), i += o, i === r)
                    }
                    static eventCallback(t, r, o) {
                        return i => {
                            e.matchEventFullKeyCode(i, t) && o.runGuarded(() => r(i))
                        }
                    }
                    static _normalizeKey(t) {
                        return "esc" === t ? "escape" : t
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(Et))
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const Sj = vb(EL, "browser", [{
                    provide: Hn,
                    useValue: E0
                }, {
                    provide: dv,
                    useValue: function Mj() {
                        bp.makeCurrent()
                    },
                    multi: !0
                }, {
                    provide: Et,
                    useFactory: function xj() {
                        return function pA(e) {
                            qd = e
                        }(document), document
                    },
                    deps: []
                }]),
                Tj = new M(""),
                q0 = [{
                    provide: _c,
                    useClass: class dj {
                        addToWindow(n) {
                            re.getAngularTestability = (r, o = !0) => {
                                const i = n.findTestabilityInTree(r, o);
                                if (null == i) throw new C(5103, !1);
                                return i
                            }, re.getAllAngularTestabilities = () => n.getAllTestabilities(), re.getAllAngularRootElements = () => n.getAllRootElements(), re.frameworkStabilizers || (re.frameworkStabilizers = []), re.frameworkStabilizers.push(r => {
                                const o = re.getAllAngularTestabilities();
                                let i = o.length;
                                const s = function() {
                                    i--, 0 == i && r()
                                };
                                o.forEach(a => {
                                    a.whenStable(s)
                                })
                            })
                        }
                        findTestabilityInTree(n, t, r) {
                            return null == t ? null : n.getTestability(t) ?? (r ? yr().isShadowRoot(t) ? this.findTestabilityInTree(n, t.host, !0) : this.findTestabilityInTree(n, t.parentElement, !0) : null)
                        }
                    },
                    deps: []
                }, {
                    provide: ab,
                    useClass: zh,
                    deps: [J, Gh, _c]
                }, {
                    provide: zh,
                    useClass: zh,
                    deps: [J, Gh, _c]
                }],
                W0 = [{
                        provide: ld,
                        useValue: "root"
                    }, {
                        provide: vn,
                        useFactory: function Ij() {
                            return new vn
                        },
                        deps: []
                    }, {
                        provide: Ep,
                        useClass: Dj,
                        multi: !0,
                        deps: [Et, J, Hn]
                    }, {
                        provide: Ep,
                        useClass: Ej,
                        multi: !0,
                        deps: [Et]
                    }, $0, L0, k0, {
                        provide: O_,
                        useExisting: $0
                    }, {
                        provide: I0,
                        useClass: fj,
                        deps: []
                    },
                    []
                ];
            let Aj = (() => {
                    class e {
                        constructor(t) {}
                        static withServerTransition(t) {
                            return {
                                ngModule: e,
                                providers: [{
                                    provide: yl,
                                    useValue: t.appId
                                }]
                            }
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(x(Tj, 12))
                        };
                        static #t = this.\u0275mod = zt({
                            type: e
                        });
                        static #n = this.\u0275inj = xt({
                            providers: [...W0, ...q0],
                            imports: [b0, ML]
                        })
                    }
                    return e
                })(),
                Nj = (() => {
                    class e {
                        constructor(t) {
                            this._doc = t
                        }
                        getTitle() {
                            return this._doc.title
                        }
                        setTitle(t) {
                            this._doc.title = t || ""
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(x(Et))
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                Ap = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: function(r) {
                                let o = null;
                                return o = r ? new(r || e) : x(kj), o
                            },
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                kj = (() => {
                    class e extends Ap {
                        constructor(t) {
                            super(), this._doc = t
                        }
                        sanitize(t, r) {
                            if (null == r) return null;
                            switch (t) {
                                case Rt.NONE:
                                    return r;
                                case Rt.HTML:
                                    return _n(r, "HTML") ? Ot(r) : Nv(this._doc, String(r)).toString();
                                case Rt.STYLE:
                                    return _n(r, "Style") ? Ot(r) : r;
                                case Rt.SCRIPT:
                                    if (_n(r, "Script")) return Ot(r);
                                    throw new C(5200, !1);
                                case Rt.URL:
                                    return _n(r, "URL") ? Ot(r) : Il(String(r));
                                case Rt.RESOURCE_URL:
                                    if (_n(r, "ResourceURL")) return Ot(r);
                                    throw new C(5201, !1);
                                default:
                                    throw new C(5202, !1)
                            }
                        }
                        bypassSecurityTrustHtml(t) {
                            return function kA(e) {
                                return new TA(e)
                            }(t)
                        }
                        bypassSecurityTrustStyle(t) {
                            return function FA(e) {
                                return new AA(e)
                            }(t)
                        }
                        bypassSecurityTrustScript(t) {
                            return function LA(e) {
                                return new NA(e)
                            }(t)
                        }
                        bypassSecurityTrustUrl(t) {
                            return function VA(e) {
                                return new OA(e)
                            }(t)
                        }
                        bypassSecurityTrustResourceUrl(t) {
                            return function jA(e) {
                                return new RA(e)
                            }(t)
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(x(Et))
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })();

            function vr(e) {
                return this instanceof vr ? (this.v = e, this) : new vr(e)
            }

            function eE(e) {
                if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                var t, n = e[Symbol.asyncIterator];
                return n ? n.call(e) : (e = function Pp(e) {
                    var n = "function" == typeof Symbol && Symbol.iterator,
                        t = n && e[n],
                        r = 0;
                    if (t) return t.call(e);
                    if (e && "number" == typeof e.length) return {
                        next: function() {
                            return e && r >= e.length && (e = void 0), {
                                value: e && e[r++],
                                done: !e
                            }
                        }
                    };
                    throw new TypeError(n ? "Object is not iterable." : "Symbol.iterator is not defined.")
                }(e), t = {}, r("next"), r("throw"), r("return"), t[Symbol.asyncIterator] = function() {
                    return this
                }, t);

                function r(i) {
                    t[i] = e[i] && function(s) {
                        return new Promise(function(a, l) {
                            ! function o(i, s, a, l) {
                                Promise.resolve(l).then(function(c) {
                                    i({
                                        value: c,
                                        done: a
                                    })
                                }, s)
                            }(a, l, (s = e[i](s)).done, s.value)
                        })
                    }
                }
            }
            "function" == typeof SuppressedError && SuppressedError;
            const tE = e => e && "number" == typeof e.length && "function" != typeof e;

            function nE(e) {
                return ye(e?.then)
            }

            function rE(e) {
                return ye(e[ju])
            }

            function oE(e) {
                return Symbol.asyncIterator && ye(e?.[Symbol.asyncIterator])
            }

            function iE(e) {
                return new TypeError(`You provided ${null!==e&&"object"==typeof e?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)
            }
            const sE = function r$() {
                return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator"
            }();

            function aE(e) {
                return ye(e?.[sE])
            }

            function lE(e) {
                return function J0(e, n, t) {
                    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
                    var o, r = t.apply(e, n || []),
                        i = [];
                    return o = {}, s("next"), s("throw"), s("return"), o[Symbol.asyncIterator] = function() {
                        return this
                    }, o;

                    function s(f) {
                        r[f] && (o[f] = function(h) {
                            return new Promise(function(p, g) {
                                i.push([f, h, p, g]) > 1 || a(f, h)
                            })
                        })
                    }

                    function a(f, h) {
                        try {
                            ! function l(f) {
                                f.value instanceof vr ? Promise.resolve(f.value.v).then(c, u) : d(i[0][2], f)
                            }(r[f](h))
                        } catch (p) {
                            d(i[0][3], p)
                        }
                    }

                    function c(f) {
                        a("next", f)
                    }

                    function u(f) {
                        a("throw", f)
                    }

                    function d(f, h) {
                        f(h), i.shift(), i.length && a(i[0][0], i[0][1])
                    }
                }(this, arguments, function*() {
                    const t = e.getReader();
                    try {
                        for (;;) {
                            const {
                                value: r,
                                done: o
                            } = yield vr(t.read());
                            if (o) return yield vr(void 0);
                            yield yield vr(r)
                        }
                    } finally {
                        t.releaseLock()
                    }
                })
            }

            function cE(e) {
                return ye(e?.getReader)
            }

            function $t(e) {
                if (e instanceof Ie) return e;
                if (null != e) {
                    if (rE(e)) return function o$(e) {
                        return new Ie(n => {
                            const t = e[ju]();
                            if (ye(t.subscribe)) return t.subscribe(n);
                            throw new TypeError("Provided object does not correctly implement Symbol.observable")
                        })
                    }(e);
                    if (tE(e)) return function i$(e) {
                        return new Ie(n => {
                            for (let t = 0; t < e.length && !n.closed; t++) n.next(e[t]);
                            n.complete()
                        })
                    }(e);
                    if (nE(e)) return function s$(e) {
                        return new Ie(n => {
                            e.then(t => {
                                n.closed || (n.next(t), n.complete())
                            }, t => n.error(t)).then(null, pm)
                        })
                    }(e);
                    if (oE(e)) return uE(e);
                    if (aE(e)) return function a$(e) {
                        return new Ie(n => {
                            for (const t of e)
                                if (n.next(t), n.closed) return;
                            n.complete()
                        })
                    }(e);
                    if (cE(e)) return function l$(e) {
                        return uE(lE(e))
                    }(e)
                }
                throw iE(e)
            }

            function uE(e) {
                return new Ie(n => {
                    (function c$(e, n) {
                        var t, r, o, i;
                        return function X0(e, n, t, r) {
                            return new(t || (t = Promise))(function(i, s) {
                                function a(u) {
                                    try {
                                        c(r.next(u))
                                    } catch (d) {
                                        s(d)
                                    }
                                }

                                function l(u) {
                                    try {
                                        c(r.throw(u))
                                    } catch (d) {
                                        s(d)
                                    }
                                }

                                function c(u) {
                                    u.done ? i(u.value) : function o(i) {
                                        return i instanceof t ? i : new t(function(s) {
                                            s(i)
                                        })
                                    }(u.value).then(a, l)
                                }
                                c((r = r.apply(e, n || [])).next())
                            })
                        }(this, void 0, void 0, function*() {
                            try {
                                for (t = eE(e); !(r = yield t.next()).done;)
                                    if (n.next(r.value), n.closed) return
                            } catch (s) {
                                o = {
                                    error: s
                                }
                            } finally {
                                try {
                                    r && !r.done && (i = t.return) && (yield i.call(t))
                                } finally {
                                    if (o) throw o.error
                                }
                            }
                            n.complete()
                        })
                    })(e, n).catch(t => n.error(t))
                })
            }

            function Xn(e, n, t, r = 0, o = !1) {
                const i = n.schedule(function() {
                    t(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
                }, r);
                if (e.add(i), !o) return i
            }

            function dE(e, n = 0) {
                return Le((t, r) => {
                    t.subscribe(Oe(r, o => Xn(r, e, () => r.next(o), n), () => Xn(r, e, () => r.complete(), n), o => Xn(r, e, () => r.error(o), n)))
                })
            }

            function fE(e, n = 0) {
                return Le((t, r) => {
                    r.add(e.schedule(() => t.subscribe(r), n))
                })
            }

            function hE(e, n) {
                if (!e) throw new Error("Iterable cannot be null");
                return new Ie(t => {
                    Xn(t, n, () => {
                        const r = e[Symbol.asyncIterator]();
                        Xn(t, n, () => {
                            r.next().then(o => {
                                o.done ? t.complete() : t.next(o.value)
                            })
                        }, 0, !0)
                    })
                })
            }

            function Fe(e, n) {
                return n ? function g$(e, n) {
                    if (null != e) {
                        if (rE(e)) return function u$(e, n) {
                            return $t(e).pipe(fE(n), dE(n))
                        }(e, n);
                        if (tE(e)) return function f$(e, n) {
                            return new Ie(t => {
                                let r = 0;
                                return n.schedule(function() {
                                    r === e.length ? t.complete() : (t.next(e[r++]), t.closed || this.schedule())
                                })
                            })
                        }(e, n);
                        if (nE(e)) return function d$(e, n) {
                            return $t(e).pipe(fE(n), dE(n))
                        }(e, n);
                        if (oE(e)) return hE(e, n);
                        if (aE(e)) return function h$(e, n) {
                            return new Ie(t => {
                                let r;
                                return Xn(t, n, () => {
                                    r = e[sE](), Xn(t, n, () => {
                                        let o, i;
                                        try {
                                            ({
                                                value: o,
                                                done: i
                                            } = r.next())
                                        } catch (s) {
                                            return void t.error(s)
                                        }
                                        i ? t.complete() : t.next(o)
                                    }, 0, !0)
                                }), () => ye(r?.return) && r.return()
                            })
                        }(e, n);
                        if (cE(e)) return function p$(e, n) {
                            return hE(lE(e), n)
                        }(e, n)
                    }
                    throw iE(e)
                }(e, n) : $t(e)
            }
            const {
                isArray: m$
            } = Array, {
                getPrototypeOf: y$,
                prototype: v$,
                keys: _$
            } = Object;

            function pE(e) {
                if (1 === e.length) {
                    const n = e[0];
                    if (m$(n)) return {
                        args: n,
                        keys: null
                    };
                    if (function C$(e) {
                            return e && "object" == typeof e && y$(e) === v$
                        }(n)) {
                        const t = _$(n);
                        return {
                            args: t.map(r => n[r]),
                            keys: t
                        }
                    }
                }
                return {
                    args: e,
                    keys: null
                }
            }

            function gE(e) {
                return e && ye(e.schedule)
            }

            function kp(e) {
                return e[e.length - 1]
            }

            function mE(e) {
                return ye(kp(e)) ? e.pop() : void 0
            }

            function ta(e) {
                return gE(kp(e)) ? e.pop() : void 0
            }
            const {
                isArray: w$
            } = Array;

            function yE(e) {
                return Z(n => function b$(e, n) {
                    return w$(n) ? e(...n) : e(n)
                }(e, n))
            }

            function vE(e, n) {
                return e.reduce((t, r, o) => (t[r] = n[o], t), {})
            }
            let _E = (() => {
                    class e {
                        constructor(t, r) {
                            this._renderer = t, this._elementRef = r, this.onChange = o => {}, this.onTouched = () => {}
                        }
                        setProperty(t, r) {
                            this._renderer.setProperty(this._elementRef.nativeElement, t, r)
                        }
                        registerOnTouched(t) {
                            this.onTouched = t
                        }
                        registerOnChange(t) {
                            this.onChange = t
                        }
                        setDisabledState(t) {
                            this.setProperty("disabled", t)
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(D(Dn), D(ut))
                        };
                        static #t = this.\u0275dir = L({
                            type: e
                        })
                    }
                    return e
                })(),
                Xr = (() => {
                    class e extends _E {
                        static #e = this.\u0275fac = (() => {
                            let t;
                            return function(o) {
                                return (t || (t = Ge(e)))(o || e)
                            }
                        })();
                        static #t = this.\u0275dir = L({
                            type: e,
                            features: [se]
                        })
                    }
                    return e
                })();
            const Sn = new M(""),
                I$ = {
                    provide: Sn,
                    useExisting: de(() => zc),
                    multi: !0
                },
                S$ = new M("");
            let zc = (() => {
                class e extends _E {
                    constructor(t, r, o) {
                        super(t, r), this._compositionMode = o, this._composing = !1, null == this._compositionMode && (this._compositionMode = ! function x$() {
                            const e = yr() ? yr().getUserAgent() : "";
                            return /android (\d+)/.test(e.toLowerCase())
                        }())
                    }
                    writeValue(t) {
                        this.setProperty("value", t ?? "")
                    }
                    _handleInput(t) {
                        (!this._compositionMode || this._compositionMode && !this._composing) && this.onChange(t)
                    }
                    _compositionStart() {
                        this._composing = !0
                    }
                    _compositionEnd(t) {
                        this._composing = !1, this._compositionMode && this.onChange(t)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(D(Dn), D(ut), D(S$, 8))
                    };
                    static #t = this.\u0275dir = L({
                        type: e,
                        selectors: [
                            ["input", "formControlName", "", 3, "type", "checkbox"],
                            ["textarea", "formControlName", ""],
                            ["input", "formControl", "", 3, "type", "checkbox"],
                            ["textarea", "formControl", ""],
                            ["input", "ngModel", "", 3, "type", "checkbox"],
                            ["textarea", "ngModel", ""],
                            ["", "ngDefaultControl", ""]
                        ],
                        hostBindings: function(r, o) {
                            1 & r && Re("input", function(s) {
                                return o._handleInput(s.target.value)
                            })("blur", function() {
                                return o.onTouched()
                            })("compositionstart", function() {
                                return o._compositionStart()
                            })("compositionend", function(s) {
                                return o._compositionEnd(s.target.value)
                            })
                        },
                        features: [be([I$]), se]
                    })
                }
                return e
            })();
            const ot = new M(""),
                Cr = new M("");

            function AE(e) {
                return null != e
            }

            function NE(e) {
                return Gs(e) ? Fe(e) : e
            }

            function OE(e) {
                let n = {};
                return e.forEach(t => {
                    n = null != t ? {
                        ...n,
                        ...t
                    } : n
                }), 0 === Object.keys(n).length ? null : n
            }

            function RE(e, n) {
                return n.map(t => t(e))
            }

            function PE(e) {
                return e.map(n => function A$(e) {
                    return !e.validate
                }(n) ? n : t => n.validate(t))
            }

            function Fp(e) {
                return null != e ? function kE(e) {
                    if (!e) return null;
                    const n = e.filter(AE);
                    return 0 == n.length ? null : function(t) {
                        return OE(RE(t, n))
                    }
                }(PE(e)) : null
            }

            function Lp(e) {
                return null != e ? function FE(e) {
                    if (!e) return null;
                    const n = e.filter(AE);
                    return 0 == n.length ? null : function(t) {
                        return function E$(...e) {
                            const n = mE(e),
                                {
                                    args: t,
                                    keys: r
                                } = pE(e),
                                o = new Ie(i => {
                                    const {
                                        length: s
                                    } = t;
                                    if (!s) return void i.complete();
                                    const a = new Array(s);
                                    let l = s,
                                        c = s;
                                    for (let u = 0; u < s; u++) {
                                        let d = !1;
                                        $t(t[u]).subscribe(Oe(i, f => {
                                            d || (d = !0, c--), a[u] = f
                                        }, () => l--, void 0, () => {
                                            (!l || !d) && (c || i.next(r ? vE(r, a) : a), i.complete())
                                        }))
                                    }
                                });
                            return n ? o.pipe(yE(n)) : o
                        }(RE(t, n).map(NE)).pipe(Z(OE))
                    }
                }(PE(e)) : null
            }

            function LE(e, n) {
                return null === e ? [n] : Array.isArray(e) ? [...e, n] : [e, n]
            }

            function Vp(e) {
                return e ? Array.isArray(e) ? e : [e] : []
            }

            function qc(e, n) {
                return Array.isArray(e) ? e.includes(n) : e === n
            }

            function $E(e, n) {
                const t = Vp(n);
                return Vp(e).forEach(o => {
                    qc(t, o) || t.push(o)
                }), t
            }

            function UE(e, n) {
                return Vp(n).filter(t => !qc(e, t))
            }
            class BE {
                constructor() {
                    this._rawValidators = [], this._rawAsyncValidators = [], this._onDestroyCallbacks = []
                }
                get value() {
                    return this.control ? this.control.value : null
                }
                get valid() {
                    return this.control ? this.control.valid : null
                }
                get invalid() {
                    return this.control ? this.control.invalid : null
                }
                get pending() {
                    return this.control ? this.control.pending : null
                }
                get disabled() {
                    return this.control ? this.control.disabled : null
                }
                get enabled() {
                    return this.control ? this.control.enabled : null
                }
                get errors() {
                    return this.control ? this.control.errors : null
                }
                get pristine() {
                    return this.control ? this.control.pristine : null
                }
                get dirty() {
                    return this.control ? this.control.dirty : null
                }
                get touched() {
                    return this.control ? this.control.touched : null
                }
                get status() {
                    return this.control ? this.control.status : null
                }
                get untouched() {
                    return this.control ? this.control.untouched : null
                }
                get statusChanges() {
                    return this.control ? this.control.statusChanges : null
                }
                get valueChanges() {
                    return this.control ? this.control.valueChanges : null
                }
                get path() {
                    return null
                }
                _setValidators(n) {
                    this._rawValidators = n || [], this._composedValidatorFn = Fp(this._rawValidators)
                }
                _setAsyncValidators(n) {
                    this._rawAsyncValidators = n || [], this._composedAsyncValidatorFn = Lp(this._rawAsyncValidators)
                }
                get validator() {
                    return this._composedValidatorFn || null
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn || null
                }
                _registerOnDestroy(n) {
                    this._onDestroyCallbacks.push(n)
                }
                _invokeOnDestroyCallbacks() {
                    this._onDestroyCallbacks.forEach(n => n()), this._onDestroyCallbacks = []
                }
                reset(n = void 0) {
                    this.control && this.control.reset(n)
                }
                hasError(n, t) {
                    return !!this.control && this.control.hasError(n, t)
                }
                getError(n, t) {
                    return this.control ? this.control.getError(n, t) : null
                }
            }
            class pt extends BE {
                get formDirective() {
                    return null
                }
                get path() {
                    return null
                }
            }
            class Dr extends BE {
                constructor() {
                    super(...arguments), this._parent = null, this.name = null, this.valueAccessor = null
                }
            }
            class HE {
                constructor(n) {
                    this._cd = n
                }
                get isTouched() {
                    return !!this._cd?.control?.touched
                }
                get isUntouched() {
                    return !!this._cd?.control?.untouched
                }
                get isPristine() {
                    return !!this._cd?.control?.pristine
                }
                get isDirty() {
                    return !!this._cd?.control?.dirty
                }
                get isValid() {
                    return !!this._cd?.control?.valid
                }
                get isInvalid() {
                    return !!this._cd?.control?.invalid
                }
                get isPending() {
                    return !!this._cd?.control?.pending
                }
                get isSubmitted() {
                    return !!this._cd?.submitted
                }
            }
            let zE = (() => {
                class e extends HE {
                    constructor(t) {
                        super(t)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(D(Dr, 2))
                    };
                    static #t = this.\u0275dir = L({
                        type: e,
                        selectors: [
                            ["", "formControlName", ""],
                            ["", "ngModel", ""],
                            ["", "formControl", ""]
                        ],
                        hostVars: 14,
                        hostBindings: function(r, o) {
                            2 & r && Ns("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)("ng-pristine", o.isPristine)("ng-dirty", o.isDirty)("ng-valid", o.isValid)("ng-invalid", o.isInvalid)("ng-pending", o.isPending)
                        },
                        features: [se]
                    })
                }
                return e
            })();
            const na = "VALID",
                Zc = "INVALID",
                ui = "PENDING",
                ra = "DISABLED";

            function Qc(e) {
                return null != e && !Array.isArray(e) && "object" == typeof e
            }
            class Hp {
                constructor(n, t) {
                    this._pendingDirty = !1, this._hasOwnPendingAsyncValidator = !1, this._pendingTouched = !1, this._onCollectionChange = () => {}, this._parent = null, this.pristine = !0, this.touched = !1, this._onDisabledChange = [], this._assignValidators(n), this._assignAsyncValidators(t)
                }
                get validator() {
                    return this._composedValidatorFn
                }
                set validator(n) {
                    this._rawValidators = this._composedValidatorFn = n
                }
                get asyncValidator() {
                    return this._composedAsyncValidatorFn
                }
                set asyncValidator(n) {
                    this._rawAsyncValidators = this._composedAsyncValidatorFn = n
                }
                get parent() {
                    return this._parent
                }
                get valid() {
                    return this.status === na
                }
                get invalid() {
                    return this.status === Zc
                }
                get pending() {
                    return this.status == ui
                }
                get disabled() {
                    return this.status === ra
                }
                get enabled() {
                    return this.status !== ra
                }
                get dirty() {
                    return !this.pristine
                }
                get untouched() {
                    return !this.touched
                }
                get updateOn() {
                    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change"
                }
                setValidators(n) {
                    this._assignValidators(n)
                }
                setAsyncValidators(n) {
                    this._assignAsyncValidators(n)
                }
                addValidators(n) {
                    this.setValidators($E(n, this._rawValidators))
                }
                addAsyncValidators(n) {
                    this.setAsyncValidators($E(n, this._rawAsyncValidators))
                }
                removeValidators(n) {
                    this.setValidators(UE(n, this._rawValidators))
                }
                removeAsyncValidators(n) {
                    this.setAsyncValidators(UE(n, this._rawAsyncValidators))
                }
                hasValidator(n) {
                    return qc(this._rawValidators, n)
                }
                hasAsyncValidator(n) {
                    return qc(this._rawAsyncValidators, n)
                }
                clearValidators() {
                    this.validator = null
                }
                clearAsyncValidators() {
                    this.asyncValidator = null
                }
                markAsTouched(n = {}) {
                    this.touched = !0, this._parent && !n.onlySelf && this._parent.markAsTouched(n)
                }
                markAllAsTouched() {
                    this.markAsTouched({
                        onlySelf: !0
                    }), this._forEachChild(n => n.markAllAsTouched())
                }
                markAsUntouched(n = {}) {
                    this.touched = !1, this._pendingTouched = !1, this._forEachChild(t => {
                        t.markAsUntouched({
                            onlySelf: !0
                        })
                    }), this._parent && !n.onlySelf && this._parent._updateTouched(n)
                }
                markAsDirty(n = {}) {
                    this.pristine = !1, this._parent && !n.onlySelf && this._parent.markAsDirty(n)
                }
                markAsPristine(n = {}) {
                    this.pristine = !0, this._pendingDirty = !1, this._forEachChild(t => {
                        t.markAsPristine({
                            onlySelf: !0
                        })
                    }), this._parent && !n.onlySelf && this._parent._updatePristine(n)
                }
                markAsPending(n = {}) {
                    this.status = ui, !1 !== n.emitEvent && this.statusChanges.emit(this.status), this._parent && !n.onlySelf && this._parent.markAsPending(n)
                }
                disable(n = {}) {
                    const t = this._parentMarkedDirty(n.onlySelf);
                    this.status = ra, this.errors = null, this._forEachChild(r => {
                        r.disable({
                            ...n,
                            onlySelf: !0
                        })
                    }), this._updateValue(), !1 !== n.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._updateAncestors({
                        ...n,
                        skipPristineCheck: t
                    }), this._onDisabledChange.forEach(r => r(!0))
                }
                enable(n = {}) {
                    const t = this._parentMarkedDirty(n.onlySelf);
                    this.status = na, this._forEachChild(r => {
                        r.enable({
                            ...n,
                            onlySelf: !0
                        })
                    }), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    }), this._updateAncestors({
                        ...n,
                        skipPristineCheck: t
                    }), this._onDisabledChange.forEach(r => r(!1))
                }
                _updateAncestors(n) {
                    this._parent && !n.onlySelf && (this._parent.updateValueAndValidity(n), n.skipPristineCheck || this._parent._updatePristine(), this._parent._updateTouched())
                }
                setParent(n) {
                    this._parent = n
                }
                getRawValue() {
                    return this.value
                }
                updateValueAndValidity(n = {}) {
                    this._setInitialStatus(), this._updateValue(), this.enabled && (this._cancelExistingSubscription(), this.errors = this._runValidator(), this.status = this._calculateStatus(), (this.status === na || this.status === ui) && this._runAsyncValidator(n.emitEvent)), !1 !== n.emitEvent && (this.valueChanges.emit(this.value), this.statusChanges.emit(this.status)), this._parent && !n.onlySelf && this._parent.updateValueAndValidity(n)
                }
                _updateTreeValidity(n = {
                    emitEvent: !0
                }) {
                    this._forEachChild(t => t._updateTreeValidity(n)), this.updateValueAndValidity({
                        onlySelf: !0,
                        emitEvent: n.emitEvent
                    })
                }
                _setInitialStatus() {
                    this.status = this._allControlsDisabled() ? ra : na
                }
                _runValidator() {
                    return this.validator ? this.validator(this) : null
                }
                _runAsyncValidator(n) {
                    if (this.asyncValidator) {
                        this.status = ui, this._hasOwnPendingAsyncValidator = !0;
                        const t = NE(this.asyncValidator(this));
                        this._asyncValidationSubscription = t.subscribe(r => {
                            this._hasOwnPendingAsyncValidator = !1, this.setErrors(r, {
                                emitEvent: n
                            })
                        })
                    }
                }
                _cancelExistingSubscription() {
                    this._asyncValidationSubscription && (this._asyncValidationSubscription.unsubscribe(), this._hasOwnPendingAsyncValidator = !1)
                }
                setErrors(n, t = {}) {
                    this.errors = n, this._updateControlsErrors(!1 !== t.emitEvent)
                }
                get(n) {
                    let t = n;
                    return null == t || (Array.isArray(t) || (t = t.split(".")), 0 === t.length) ? null : t.reduce((r, o) => r && r._find(o), this)
                }
                getError(n, t) {
                    const r = t ? this.get(t) : this;
                    return r && r.errors ? r.errors[n] : null
                }
                hasError(n, t) {
                    return !!this.getError(n, t)
                }
                get root() {
                    let n = this;
                    for (; n._parent;) n = n._parent;
                    return n
                }
                _updateControlsErrors(n) {
                    this.status = this._calculateStatus(), n && this.statusChanges.emit(this.status), this._parent && this._parent._updateControlsErrors(n)
                }
                _initObservables() {
                    this.valueChanges = new _e, this.statusChanges = new _e
                }
                _calculateStatus() {
                    return this._allControlsDisabled() ? ra : this.errors ? Zc : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(ui) ? ui : this._anyControlsHaveStatus(Zc) ? Zc : na
                }
                _anyControlsHaveStatus(n) {
                    return this._anyControls(t => t.status === n)
                }
                _anyControlsDirty() {
                    return this._anyControls(n => n.dirty)
                }
                _anyControlsTouched() {
                    return this._anyControls(n => n.touched)
                }
                _updatePristine(n = {}) {
                    this.pristine = !this._anyControlsDirty(), this._parent && !n.onlySelf && this._parent._updatePristine(n)
                }
                _updateTouched(n = {}) {
                    this.touched = this._anyControlsTouched(), this._parent && !n.onlySelf && this._parent._updateTouched(n)
                }
                _registerOnCollectionChange(n) {
                    this._onCollectionChange = n
                }
                _setUpdateStrategy(n) {
                    Qc(n) && null != n.updateOn && (this._updateOn = n.updateOn)
                }
                _parentMarkedDirty(n) {
                    return !n && !(!this._parent || !this._parent.dirty) && !this._parent._anyControlsDirty()
                }
                _find(n) {
                    return null
                }
                _assignValidators(n) {
                    this._rawValidators = Array.isArray(n) ? n.slice() : n, this._composedValidatorFn = function k$(e) {
                        return Array.isArray(e) ? Fp(e) : e || null
                    }(this._rawValidators)
                }
                _assignAsyncValidators(n) {
                    this._rawAsyncValidators = Array.isArray(n) ? n.slice() : n, this._composedAsyncValidatorFn = function F$(e) {
                        return Array.isArray(e) ? Lp(e) : e || null
                    }(this._rawAsyncValidators)
                }
            }
            const Kr = new M("CallSetDisabledState", {
                    providedIn: "root",
                    factory: () => oa
                }),
                oa = "always";

            function ia(e, n, t = oa) {
                (function Gp(e, n) {
                    const t = function VE(e) {
                        return e._rawValidators
                    }(e);
                    null !== n.validator ? e.setValidators(LE(t, n.validator)) : "function" == typeof t && e.setValidators([t]);
                    const r = function jE(e) {
                        return e._rawAsyncValidators
                    }(e);
                    null !== n.asyncValidator ? e.setAsyncValidators(LE(r, n.asyncValidator)) : "function" == typeof r && e.setAsyncValidators([r]);
                    const o = () => e.updateValueAndValidity();
                    Kc(n._rawValidators, o), Kc(n._rawAsyncValidators, o)
                })(e, n), n.valueAccessor.writeValue(e.value), (e.disabled || "always" === t) && n.valueAccessor.setDisabledState?.(e.disabled),
                    function j$(e, n) {
                        n.valueAccessor.registerOnChange(t => {
                            e._pendingValue = t, e._pendingChange = !0, e._pendingDirty = !0, "change" === e.updateOn && ZE(e, n)
                        })
                    }(e, n),
                    function U$(e, n) {
                        const t = (r, o) => {
                            n.valueAccessor.writeValue(r), o && n.viewToModelUpdate(r)
                        };
                        e.registerOnChange(t), n._registerOnDestroy(() => {
                            e._unregisterOnChange(t)
                        })
                    }(e, n),
                    function $$(e, n) {
                        n.valueAccessor.registerOnTouched(() => {
                            e._pendingTouched = !0, "blur" === e.updateOn && e._pendingChange && ZE(e, n), "submit" !== e.updateOn && e.markAsTouched()
                        })
                    }(e, n),
                    function V$(e, n) {
                        if (n.valueAccessor.setDisabledState) {
                            const t = r => {
                                n.valueAccessor.setDisabledState(r)
                            };
                            e.registerOnDisabledChange(t), n._registerOnDestroy(() => {
                                e._unregisterOnDisabledChange(t)
                            })
                        }
                    }(e, n)
            }

            function Kc(e, n) {
                e.forEach(t => {
                    t.registerOnValidatorChange && t.registerOnValidatorChange(n)
                })
            }

            function ZE(e, n) {
                e._pendingDirty && e.markAsDirty(), e.setValue(e._pendingValue, {
                    emitModelToViewChange: !1
                }), n.viewToModelUpdate(e._pendingValue), e._pendingChange = !1
            }

            function XE(e, n) {
                const t = e.indexOf(n);
                t > -1 && e.splice(t, 1)
            }

            function KE(e) {
                return "object" == typeof e && null !== e && 2 === Object.keys(e).length && "value" in e && "disabled" in e
            }
            Promise.resolve();
            const JE = class extends Hp {
                    constructor(n = null, t, r) {
                        super(function Up(e) {
                            return (Qc(e) ? e.validators : e) || null
                        }(t), function Bp(e, n) {
                            return (Qc(n) ? n.asyncValidators : e) || null
                        }(r, t)), this.defaultValue = null, this._onChange = [], this._pendingChange = !1, this._applyFormState(n), this._setUpdateStrategy(t), this._initObservables(), this.updateValueAndValidity({
                            onlySelf: !0,
                            emitEvent: !!this.asyncValidator
                        }), Qc(t) && (t.nonNullable || t.initialValueIsDefault) && (this.defaultValue = KE(n) ? n.value : n)
                    }
                    setValue(n, t = {}) {
                        this.value = this._pendingValue = n, this._onChange.length && !1 !== t.emitModelToViewChange && this._onChange.forEach(r => r(this.value, !1 !== t.emitViewToModelChange)), this.updateValueAndValidity(t)
                    }
                    patchValue(n, t = {}) {
                        this.setValue(n, t)
                    }
                    reset(n = this.defaultValue, t = {}) {
                        this._applyFormState(n), this.markAsPristine(t), this.markAsUntouched(t), this.setValue(this.value, t), this._pendingChange = !1
                    }
                    _updateValue() {}
                    _anyControls(n) {
                        return !1
                    }
                    _allControlsDisabled() {
                        return this.disabled
                    }
                    registerOnChange(n) {
                        this._onChange.push(n)
                    }
                    _unregisterOnChange(n) {
                        XE(this._onChange, n)
                    }
                    registerOnDisabledChange(n) {
                        this._onDisabledChange.push(n)
                    }
                    _unregisterOnDisabledChange(n) {
                        XE(this._onDisabledChange, n)
                    }
                    _forEachChild(n) {}
                    _syncPendingControls() {
                        return !("submit" !== this.updateOn || (this._pendingDirty && this.markAsDirty(), this._pendingTouched && this.markAsTouched(), !this._pendingChange) || (this.setValue(this._pendingValue, {
                            onlySelf: !0,
                            emitModelToViewChange: !1
                        }), 0))
                    }
                    _applyFormState(n) {
                        KE(n) ? (this.value = this._pendingValue = n.value, n.disabled ? this.disable({
                            onlySelf: !0,
                            emitEvent: !1
                        }) : this.enable({
                            onlySelf: !0,
                            emitEvent: !1
                        })) : this.value = this._pendingValue = n
                    }
                },
                Q$ = {
                    provide: Dr,
                    useExisting: de(() => Yp)
                },
                nM = Promise.resolve();
            let Yp = (() => {
                class e extends Dr {
                    constructor(t, r, o, i, s, a) {
                        super(), this._changeDetectorRef = s, this.callSetDisabledState = a, this.control = new JE, this._registered = !1, this.name = "", this.update = new _e, this._parent = t, this._setValidators(r), this._setAsyncValidators(o), this.valueAccessor = function Zp(e, n) {
                            if (!n) return null;
                            let t, r, o;
                            return Array.isArray(n), n.forEach(i => {
                                i.constructor === zc ? t = i : function z$(e) {
                                    return Object.getPrototypeOf(e.constructor) === Xr
                                }(i) ? r = i : o = i
                            }), o || r || t || null
                        }(0, i)
                    }
                    ngOnChanges(t) {
                        if (this._checkForErrors(), !this._registered || "name" in t) {
                            if (this._registered && (this._checkName(), this.formDirective)) {
                                const r = t.name.previousValue;
                                this.formDirective.removeControl({
                                    name: r,
                                    path: this._getPath(r)
                                })
                            }
                            this._setUpControl()
                        }
                        "isDisabled" in t && this._updateDisabled(t),
                            function Wp(e, n) {
                                if (!e.hasOwnProperty("model")) return !1;
                                const t = e.model;
                                return !!t.isFirstChange() || !Object.is(n, t.currentValue)
                            }(t, this.viewModel) && (this._updateValue(this.model), this.viewModel = this.model)
                    }
                    ngOnDestroy() {
                        this.formDirective && this.formDirective.removeControl(this)
                    }
                    get path() {
                        return this._getPath(this.name)
                    }
                    get formDirective() {
                        return this._parent ? this._parent.formDirective : null
                    }
                    viewToModelUpdate(t) {
                        this.viewModel = t, this.update.emit(t)
                    }
                    _setUpControl() {
                        this._setUpdateStrategy(), this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this), this._registered = !0
                    }
                    _setUpdateStrategy() {
                        this.options && null != this.options.updateOn && (this.control._updateOn = this.options.updateOn)
                    }
                    _isStandalone() {
                        return !this._parent || !(!this.options || !this.options.standalone)
                    }
                    _setUpStandalone() {
                        ia(this.control, this, this.callSetDisabledState), this.control.updateValueAndValidity({
                            emitEvent: !1
                        })
                    }
                    _checkForErrors() {
                        this._isStandalone() || this._checkParentType(), this._checkName()
                    }
                    _checkParentType() {}
                    _checkName() {
                        this.options && this.options.name && (this.name = this.options.name), this._isStandalone()
                    }
                    _updateValue(t) {
                        nM.then(() => {
                            this.control.setValue(t, {
                                emitViewToModelChange: !1
                            }), this._changeDetectorRef?.markForCheck()
                        })
                    }
                    _updateDisabled(t) {
                        const r = t.isDisabled.currentValue,
                            o = 0 !== r && function li(e) {
                                return "boolean" == typeof e ? e : null != e && "false" !== e
                            }(r);
                        nM.then(() => {
                            o && !this.control.disabled ? this.control.disable() : !o && this.control.disabled && this.control.enable(), this._changeDetectorRef?.markForCheck()
                        })
                    }
                    _getPath(t) {
                        return this._parent ? function Yc(e, n) {
                            return [...n.path, e]
                        }(t, this._parent) : [t]
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(D(pt, 9), D(ot, 10), D(Cr, 10), D(Sn, 10), D(qs, 8), D(Kr, 8))
                    };
                    static #t = this.\u0275dir = L({
                        type: e,
                        selectors: [
                            ["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""]
                        ],
                        inputs: {
                            name: "name",
                            isDisabled: [ve.None, "disabled", "isDisabled"],
                            model: [ve.None, "ngModel", "model"],
                            options: [ve.None, "ngModelOptions", "options"]
                        },
                        outputs: {
                            update: "ngModelChange"
                        },
                        exportAs: ["ngModel"],
                        features: [be([Q$]), se, At]
                    })
                }
                return e
            })();
            const Xp = new M("");
            let CM = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275mod = zt({
                            type: e
                        });
                        static #n = this.\u0275inj = xt({})
                    }
                    return e
                })(),
                DU = (() => {
                    class e {
                        static withConfig(t) {
                            return {
                                ngModule: e,
                                providers: [{
                                    provide: Kr,
                                    useValue: t.callSetDisabledState ?? oa
                                }]
                            }
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275mod = zt({
                            type: e
                        });
                        static #n = this.\u0275inj = xt({
                            imports: [CM]
                        })
                    }
                    return e
                })(),
                wU = (() => {
                    class e {
                        static withConfig(t) {
                            return {
                                ngModule: e,
                                providers: [{
                                    provide: Xp,
                                    useValue: t.warnOnNgModelWithFormControl ?? "always"
                                }, {
                                    provide: Kr,
                                    useValue: t.callSetDisabledState ?? oa
                                }]
                            }
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275mod = zt({
                            type: e
                        });
                        static #n = this.\u0275inj = xt({
                            imports: [CM]
                        })
                    }
                    return e
                })();

            function R(...e) {
                return Fe(e, ta(e))
            }

            function it(e, n, t = 1 / 0) {
                return ye(n) ? it((r, o) => Z((i, s) => n(r, i, o, s))($t(e(r, o))), t) : ("number" == typeof n && (t = n), Le((r, o) => function bU(e, n, t, r, o, i, s, a) {
                    const l = [];
                    let c = 0,
                        u = 0,
                        d = !1;
                    const f = () => {
                            d && !l.length && !c && n.complete()
                        },
                        h = g => c < r ? p(g) : l.push(g),
                        p = g => {
                            i && n.next(g), c++;
                            let m = !1;
                            $t(t(g, u++)).subscribe(Oe(n, y => {
                                o?.(y), i ? h(y) : n.next(y)
                            }, () => {
                                m = !0
                            }, void 0, () => {
                                if (m) try {
                                    for (c--; l.length && c < r;) {
                                        const y = l.shift();
                                        s ? Xn(n, s, () => p(y)) : p(y)
                                    }
                                    f()
                                } catch (y) {
                                    n.error(y)
                                }
                            }))
                        };
                    return e.subscribe(Oe(n, h, () => {
                        d = !0, f()
                    })), () => {
                        a?.()
                    }
                }(r, o, e, t)))
            }

            function di(e, n) {
                return ye(n) ? it(e, n, 1) : it(e, 1)
            }

            function Kn(e, n) {
                return Le((t, r) => {
                    let o = 0;
                    t.subscribe(Oe(r, i => e.call(n, i, o++) && r.next(i)))
                })
            }

            function aa(e) {
                return Le((n, t) => {
                    try {
                        n.subscribe(t)
                    } finally {
                        t.add(e)
                    }
                })
            }

            function Zt(e, n) {
                return Le((t, r) => {
                    let o = null,
                        i = 0,
                        s = !1;
                    const a = () => s && !o && r.complete();
                    t.subscribe(Oe(r, l => {
                        o?.unsubscribe();
                        let c = 0;
                        const u = i++;
                        $t(e(l, u)).subscribe(o = Oe(r, d => r.next(n ? n(l, d, u, c++) : d), () => {
                            o = null, a()
                        }))
                    }, () => {
                        s = !0, a()
                    }))
                })
            }
            class eu {}
            class tu {}
            class Qt {
                constructor(n) {
                    this.normalizedNames = new Map, this.lazyUpdate = null, n ? "string" == typeof n ? this.lazyInit = () => {
                        this.headers = new Map, n.split("\n").forEach(t => {
                            const r = t.indexOf(":");
                            if (r > 0) {
                                const o = t.slice(0, r),
                                    i = o.toLowerCase(),
                                    s = t.slice(r + 1).trim();
                                this.maybeSetNormalizedName(o, i), this.headers.has(i) ? this.headers.get(i).push(s) : this.headers.set(i, [s])
                            }
                        })
                    } : typeof Headers < "u" && n instanceof Headers ? (this.headers = new Map, n.forEach((t, r) => {
                        this.setHeaderEntries(r, t)
                    })) : this.lazyInit = () => {
                        this.headers = new Map, Object.entries(n).forEach(([t, r]) => {
                            this.setHeaderEntries(t, r)
                        })
                    } : this.headers = new Map
                }
                has(n) {
                    return this.init(), this.headers.has(n.toLowerCase())
                }
                get(n) {
                    this.init();
                    const t = this.headers.get(n.toLowerCase());
                    return t && t.length > 0 ? t[0] : null
                }
                keys() {
                    return this.init(), Array.from(this.normalizedNames.values())
                }
                getAll(n) {
                    return this.init(), this.headers.get(n.toLowerCase()) || null
                }
                append(n, t) {
                    return this.clone({
                        name: n,
                        value: t,
                        op: "a"
                    })
                }
                set(n, t) {
                    return this.clone({
                        name: n,
                        value: t,
                        op: "s"
                    })
                }
                delete(n, t) {
                    return this.clone({
                        name: n,
                        value: t,
                        op: "d"
                    })
                }
                maybeSetNormalizedName(n, t) {
                    this.normalizedNames.has(t) || this.normalizedNames.set(t, n)
                }
                init() {
                    this.lazyInit && (this.lazyInit instanceof Qt ? this.copyFrom(this.lazyInit) : this.lazyInit(), this.lazyInit = null, this.lazyUpdate && (this.lazyUpdate.forEach(n => this.applyUpdate(n)), this.lazyUpdate = null))
                }
                copyFrom(n) {
                    n.init(), Array.from(n.headers.keys()).forEach(t => {
                        this.headers.set(t, n.headers.get(t)), this.normalizedNames.set(t, n.normalizedNames.get(t))
                    })
                }
                clone(n) {
                    const t = new Qt;
                    return t.lazyInit = this.lazyInit && this.lazyInit instanceof Qt ? this.lazyInit : this, t.lazyUpdate = (this.lazyUpdate || []).concat([n]), t
                }
                applyUpdate(n) {
                    const t = n.name.toLowerCase();
                    switch (n.op) {
                        case "a":
                        case "s":
                            let r = n.value;
                            if ("string" == typeof r && (r = [r]), 0 === r.length) return;
                            this.maybeSetNormalizedName(n.name, t);
                            const o = ("a" === n.op ? this.headers.get(t) : void 0) || [];
                            o.push(...r), this.headers.set(t, o);
                            break;
                        case "d":
                            const i = n.value;
                            if (i) {
                                let s = this.headers.get(t);
                                if (!s) return;
                                s = s.filter(a => -1 === i.indexOf(a)), 0 === s.length ? (this.headers.delete(t), this.normalizedNames.delete(t)) : this.headers.set(t, s)
                            } else this.headers.delete(t), this.normalizedNames.delete(t)
                    }
                }
                setHeaderEntries(n, t) {
                    const r = (Array.isArray(t) ? t : [t]).map(i => i.toString()),
                        o = n.toLowerCase();
                    this.headers.set(o, r), this.maybeSetNormalizedName(n, o)
                }
                forEach(n) {
                    this.init(), Array.from(this.normalizedNames.keys()).forEach(t => n(this.normalizedNames.get(t), this.headers.get(t)))
                }
            }
            class EU {
                encodeKey(n) {
                    return DM(n)
                }
                encodeValue(n) {
                    return DM(n)
                }
                decodeKey(n) {
                    return decodeURIComponent(n)
                }
                decodeValue(n) {
                    return decodeURIComponent(n)
                }
            }
            const IU = /%(\d[a-f0-9])/gi,
                xU = {
                    40: "@",
                    "3A": ":",
                    24: "$",
                    "2C": ",",
                    "3B": ";",
                    "3D": "=",
                    "3F": "?",
                    "2F": "/"
                };

            function DM(e) {
                return encodeURIComponent(e).replace(IU, (n, t) => xU[t] ?? n)
            }

            function nu(e) {
                return `${e}`
            }
            class wr {
                constructor(n = {}) {
                    if (this.updates = null, this.cloneFrom = null, this.encoder = n.encoder || new EU, n.fromString) {
                        if (n.fromObject) throw new Error("Cannot specify both fromString and fromObject.");
                        this.map = function MU(e, n) {
                            const t = new Map;
                            return e.length > 0 && e.replace(/^\?/, "").split("&").forEach(o => {
                                const i = o.indexOf("="),
                                    [s, a] = -1 == i ? [n.decodeKey(o), ""] : [n.decodeKey(o.slice(0, i)), n.decodeValue(o.slice(i + 1))],
                                    l = t.get(s) || [];
                                l.push(a), t.set(s, l)
                            }), t
                        }(n.fromString, this.encoder)
                    } else n.fromObject ? (this.map = new Map, Object.keys(n.fromObject).forEach(t => {
                        const r = n.fromObject[t],
                            o = Array.isArray(r) ? r.map(nu) : [nu(r)];
                        this.map.set(t, o)
                    })) : this.map = null
                }
                has(n) {
                    return this.init(), this.map.has(n)
                }
                get(n) {
                    this.init();
                    const t = this.map.get(n);
                    return t ? t[0] : null
                }
                getAll(n) {
                    return this.init(), this.map.get(n) || null
                }
                keys() {
                    return this.init(), Array.from(this.map.keys())
                }
                append(n, t) {
                    return this.clone({
                        param: n,
                        value: t,
                        op: "a"
                    })
                }
                appendAll(n) {
                    const t = [];
                    return Object.keys(n).forEach(r => {
                        const o = n[r];
                        Array.isArray(o) ? o.forEach(i => {
                            t.push({
                                param: r,
                                value: i,
                                op: "a"
                            })
                        }) : t.push({
                            param: r,
                            value: o,
                            op: "a"
                        })
                    }), this.clone(t)
                }
                set(n, t) {
                    return this.clone({
                        param: n,
                        value: t,
                        op: "s"
                    })
                }
                delete(n, t) {
                    return this.clone({
                        param: n,
                        value: t,
                        op: "d"
                    })
                }
                toString() {
                    return this.init(), this.keys().map(n => {
                        const t = this.encoder.encodeKey(n);
                        return this.map.get(n).map(r => t + "=" + this.encoder.encodeValue(r)).join("&")
                    }).filter(n => "" !== n).join("&")
                }
                clone(n) {
                    const t = new wr({
                        encoder: this.encoder
                    });
                    return t.cloneFrom = this.cloneFrom || this, t.updates = (this.updates || []).concat(n), t
                }
                init() {
                    null === this.map && (this.map = new Map), null !== this.cloneFrom && (this.cloneFrom.init(), this.cloneFrom.keys().forEach(n => this.map.set(n, this.cloneFrom.map.get(n))), this.updates.forEach(n => {
                        switch (n.op) {
                            case "a":
                            case "s":
                                const t = ("a" === n.op ? this.map.get(n.param) : void 0) || [];
                                t.push(nu(n.value)), this.map.set(n.param, t);
                                break;
                            case "d":
                                if (void 0 === n.value) {
                                    this.map.delete(n.param);
                                    break
                                } {
                                    let r = this.map.get(n.param) || [];
                                    const o = r.indexOf(nu(n.value)); - 1 !== o && r.splice(o, 1), r.length > 0 ? this.map.set(n.param, r) : this.map.delete(n.param)
                                }
                        }
                    }), this.cloneFrom = this.updates = null)
                }
            }
            class SU {
                constructor() {
                    this.map = new Map
                }
                set(n, t) {
                    return this.map.set(n, t), this
                }
                get(n) {
                    return this.map.has(n) || this.map.set(n, n.defaultValue()), this.map.get(n)
                }
                delete(n) {
                    return this.map.delete(n), this
                }
                has(n) {
                    return this.map.has(n)
                }
                keys() {
                    return this.map.keys()
                }
            }

            function wM(e) {
                return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer
            }

            function bM(e) {
                return typeof Blob < "u" && e instanceof Blob
            }

            function EM(e) {
                return typeof FormData < "u" && e instanceof FormData
            }
            class la {
                constructor(n, t, r, o) {
                    let i;
                    if (this.url = t, this.body = null, this.reportProgress = !1, this.withCredentials = !1, this.responseType = "json", this.method = n.toUpperCase(), function TU(e) {
                            switch (e) {
                                case "DELETE":
                                case "GET":
                                case "HEAD":
                                case "OPTIONS":
                                case "JSONP":
                                    return !1;
                                default:
                                    return !0
                            }
                        }(this.method) || o ? (this.body = void 0 !== r ? r : null, i = o) : i = r, i && (this.reportProgress = !!i.reportProgress, this.withCredentials = !!i.withCredentials, i.responseType && (this.responseType = i.responseType), i.headers && (this.headers = i.headers), i.context && (this.context = i.context), i.params && (this.params = i.params), this.transferCache = i.transferCache), this.headers ??= new Qt, this.context ??= new SU, this.params) {
                        const s = this.params.toString();
                        if (0 === s.length) this.urlWithParams = t;
                        else {
                            const a = t.indexOf("?");
                            this.urlWithParams = t + (-1 === a ? "?" : a < t.length - 1 ? "&" : "") + s
                        }
                    } else this.params = new wr, this.urlWithParams = t
                }
                serializeBody() {
                    return null === this.body ? null : "string" == typeof this.body || wM(this.body) || bM(this.body) || EM(this.body) || function AU(e) {
                        return typeof URLSearchParams < "u" && e instanceof URLSearchParams
                    }(this.body) ? this.body : this.body instanceof wr ? this.body.toString() : "object" == typeof this.body || "boolean" == typeof this.body || Array.isArray(this.body) ? JSON.stringify(this.body) : this.body.toString()
                }
                detectContentTypeHeader() {
                    return null === this.body || EM(this.body) ? null : bM(this.body) ? this.body.type || null : wM(this.body) ? null : "string" == typeof this.body ? "text/plain" : this.body instanceof wr ? "application/x-www-form-urlencoded;charset=UTF-8" : "object" == typeof this.body || "number" == typeof this.body || "boolean" == typeof this.body ? "application/json" : null
                }
                clone(n = {}) {
                    const t = n.method || this.method,
                        r = n.url || this.url,
                        o = n.responseType || this.responseType,
                        i = n.transferCache ?? this.transferCache,
                        s = void 0 !== n.body ? n.body : this.body,
                        a = n.withCredentials ?? this.withCredentials,
                        l = n.reportProgress ?? this.reportProgress;
                    let c = n.headers || this.headers,
                        u = n.params || this.params;
                    const d = n.context ?? this.context;
                    return void 0 !== n.setHeaders && (c = Object.keys(n.setHeaders).reduce((f, h) => f.set(h, n.setHeaders[h]), c)), n.setParams && (u = Object.keys(n.setParams).reduce((f, h) => f.set(h, n.setParams[h]), u)), new la(t, r, s, {
                        params: u,
                        headers: c,
                        context: d,
                        reportProgress: l,
                        responseType: o,
                        withCredentials: a,
                        transferCache: i
                    })
                }
            }
            var br = function(e) {
                return e[e.Sent = 0] = "Sent", e[e.UploadProgress = 1] = "UploadProgress", e[e.ResponseHeader = 2] = "ResponseHeader", e[e.DownloadProgress = 3] = "DownloadProgress", e[e.Response = 4] = "Response", e[e.User = 5] = "User", e
            }(br || {});
            class og {
                constructor(n, t = ca.Ok, r = "OK") {
                    this.headers = n.headers || new Qt, this.status = void 0 !== n.status ? n.status : t, this.statusText = n.statusText || r, this.url = n.url || null, this.ok = this.status >= 200 && this.status < 300
                }
            }
            class ru extends og {
                constructor(n = {}) {
                    super(n), this.type = br.ResponseHeader
                }
                clone(n = {}) {
                    return new ru({
                        headers: n.headers || this.headers,
                        status: void 0 !== n.status ? n.status : this.status,
                        statusText: n.statusText || this.statusText,
                        url: n.url || this.url || void 0
                    })
                }
            }
            class eo extends og {
                constructor(n = {}) {
                    super(n), this.type = br.Response, this.body = void 0 !== n.body ? n.body : null
                }
                clone(n = {}) {
                    return new eo({
                        body: void 0 !== n.body ? n.body : this.body,
                        headers: n.headers || this.headers,
                        status: void 0 !== n.status ? n.status : this.status,
                        statusText: n.statusText || this.statusText,
                        url: n.url || this.url || void 0
                    })
                }
            }
            class fi extends og {
                constructor(n) {
                    super(n, 0, "Unknown Error"), this.name = "HttpErrorResponse", this.ok = !1, this.message = this.status >= 200 && this.status < 300 ? `Http failure during parsing for ${n.url||"(unknown url)"}` : `Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`, this.error = n.error || null
                }
            }
            var ca = function(e) {
                return e[e.Continue = 100] = "Continue", e[e.SwitchingProtocols = 101] = "SwitchingProtocols", e[e.Processing = 102] = "Processing", e[e.EarlyHints = 103] = "EarlyHints", e[e.Ok = 200] = "Ok", e[e.Created = 201] = "Created", e[e.Accepted = 202] = "Accepted", e[e.NonAuthoritativeInformation = 203] = "NonAuthoritativeInformation", e[e.NoContent = 204] = "NoContent", e[e.ResetContent = 205] = "ResetContent", e[e.PartialContent = 206] = "PartialContent", e[e.MultiStatus = 207] = "MultiStatus", e[e.AlreadyReported = 208] = "AlreadyReported", e[e.ImUsed = 226] = "ImUsed", e[e.MultipleChoices = 300] = "MultipleChoices", e[e.MovedPermanently = 301] = "MovedPermanently", e[e.Found = 302] = "Found", e[e.SeeOther = 303] = "SeeOther", e[e.NotModified = 304] = "NotModified", e[e.UseProxy = 305] = "UseProxy", e[e.Unused = 306] = "Unused", e[e.TemporaryRedirect = 307] = "TemporaryRedirect", e[e.PermanentRedirect = 308] = "PermanentRedirect", e[e.BadRequest = 400] = "BadRequest", e[e.Unauthorized = 401] = "Unauthorized", e[e.PaymentRequired = 402] = "PaymentRequired", e[e.Forbidden = 403] = "Forbidden", e[e.NotFound = 404] = "NotFound", e[e.MethodNotAllowed = 405] = "MethodNotAllowed", e[e.NotAcceptable = 406] = "NotAcceptable", e[e.ProxyAuthenticationRequired = 407] = "ProxyAuthenticationRequired", e[e.RequestTimeout = 408] = "RequestTimeout", e[e.Conflict = 409] = "Conflict", e[e.Gone = 410] = "Gone", e[e.LengthRequired = 411] = "LengthRequired", e[e.PreconditionFailed = 412] = "PreconditionFailed", e[e.PayloadTooLarge = 413] = "PayloadTooLarge", e[e.UriTooLong = 414] = "UriTooLong", e[e.UnsupportedMediaType = 415] = "UnsupportedMediaType", e[e.RangeNotSatisfiable = 416] = "RangeNotSatisfiable", e[e.ExpectationFailed = 417] = "ExpectationFailed", e[e.ImATeapot = 418] = "ImATeapot", e[e.MisdirectedRequest = 421] = "MisdirectedRequest", e[e.UnprocessableEntity = 422] = "UnprocessableEntity", e[e.Locked = 423] = "Locked", e[e.FailedDependency = 424] = "FailedDependency", e[e.TooEarly = 425] = "TooEarly", e[e.UpgradeRequired = 426] = "UpgradeRequired", e[e.PreconditionRequired = 428] = "PreconditionRequired", e[e.TooManyRequests = 429] = "TooManyRequests", e[e.RequestHeaderFieldsTooLarge = 431] = "RequestHeaderFieldsTooLarge", e[e.UnavailableForLegalReasons = 451] = "UnavailableForLegalReasons", e[e.InternalServerError = 500] = "InternalServerError", e[e.NotImplemented = 501] = "NotImplemented", e[e.BadGateway = 502] = "BadGateway", e[e.ServiceUnavailable = 503] = "ServiceUnavailable", e[e.GatewayTimeout = 504] = "GatewayTimeout", e[e.HttpVersionNotSupported = 505] = "HttpVersionNotSupported", e[e.VariantAlsoNegotiates = 506] = "VariantAlsoNegotiates", e[e.InsufficientStorage = 507] = "InsufficientStorage", e[e.LoopDetected = 508] = "LoopDetected", e[e.NotExtended = 510] = "NotExtended", e[e.NetworkAuthenticationRequired = 511] = "NetworkAuthenticationRequired", e
            }(ca || {});

            function ig(e, n) {
                return {
                    body: n,
                    headers: e.headers,
                    context: e.context,
                    observe: e.observe,
                    params: e.params,
                    reportProgress: e.reportProgress,
                    responseType: e.responseType,
                    withCredentials: e.withCredentials,
                    transferCache: e.transferCache
                }
            }
            let sg = (() => {
                class e {
                    constructor(t) {
                        this.handler = t
                    }
                    request(t, r, o = {}) {
                        let i;
                        if (t instanceof la) i = t;
                        else {
                            let l, c;
                            l = o.headers instanceof Qt ? o.headers : new Qt(o.headers), o.params && (c = o.params instanceof wr ? o.params : new wr({
                                fromObject: o.params
                            })), i = new la(t, r, void 0 !== o.body ? o.body : null, {
                                headers: l,
                                context: o.context,
                                params: c,
                                reportProgress: o.reportProgress,
                                responseType: o.responseType || "json",
                                withCredentials: o.withCredentials,
                                transferCache: o.transferCache
                            })
                        }
                        const s = R(i).pipe(di(l => this.handler.handle(l)));
                        if (t instanceof la || "events" === o.observe) return s;
                        const a = s.pipe(Kn(l => l instanceof eo));
                        switch (o.observe || "body") {
                            case "body":
                                switch (i.responseType) {
                                    case "arraybuffer":
                                        return a.pipe(Z(l => {
                                            if (null !== l.body && !(l.body instanceof ArrayBuffer)) throw new Error("Response is not an ArrayBuffer.");
                                            return l.body
                                        }));
                                    case "blob":
                                        return a.pipe(Z(l => {
                                            if (null !== l.body && !(l.body instanceof Blob)) throw new Error("Response is not a Blob.");
                                            return l.body
                                        }));
                                    case "text":
                                        return a.pipe(Z(l => {
                                            if (null !== l.body && "string" != typeof l.body) throw new Error("Response is not a string.");
                                            return l.body
                                        }));
                                    default:
                                        return a.pipe(Z(l => l.body))
                                }
                            case "response":
                                return a;
                            default:
                                throw new Error(`Unreachable: unhandled observe type ${o.observe}}`)
                        }
                    }
                    delete(t, r = {}) {
                        return this.request("DELETE", t, r)
                    }
                    get(t, r = {}) {
                        return this.request("GET", t, r)
                    }
                    head(t, r = {}) {
                        return this.request("HEAD", t, r)
                    }
                    jsonp(t, r) {
                        return this.request("JSONP", t, {
                            params: (new wr).append(r, "JSONP_CALLBACK"),
                            observe: "body",
                            responseType: "json"
                        })
                    }
                    options(t, r = {}) {
                        return this.request("OPTIONS", t, r)
                    }
                    patch(t, r, o = {}) {
                        return this.request("PATCH", t, ig(o, r))
                    }
                    post(t, r, o = {}) {
                        return this.request("POST", t, ig(o, r))
                    }
                    put(t, r, o = {}) {
                        return this.request("PUT", t, ig(o, r))
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(eu))
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();

            function IM(e, n) {
                return n(e)
            }

            function kU(e, n) {
                return (t, r) => n.intercept(t, {
                    handle: o => e(o, r)
                })
            }
            const LU = new M(""),
                ua = new M(""),
                xM = new M(""),
                SM = new M("");

            function VU() {
                let e = null;
                return (n, t) => {
                    null === e && (e = (w(LU, {
                        optional: !0
                    }) ?? []).reduceRight(kU, IM));
                    const r = w(dr),
                        o = r.add();
                    return e(n, t).pipe(aa(() => r.remove(o)))
                }
            }
            let TM = (() => {
                class e extends eu {
                    constructor(t, r) {
                        super(), this.backend = t, this.injector = r, this.chain = null, this.pendingTasks = w(dr);
                        const o = w(SM, {
                            optional: !0
                        });
                        this.backend = o ?? t
                    }
                    handle(t) {
                        if (null === this.chain) {
                            const o = Array.from(new Set([...this.injector.get(ua), ...this.injector.get(xM, [])]));
                            this.chain = o.reduceRight((i, s) => function FU(e, n, t) {
                                return (r, o) => dn(t, () => n(r, i => e(i, o)))
                            }(i, s, this.injector), IM)
                        }
                        const r = this.pendingTasks.add();
                        return this.chain(t, o => this.backend.handle(o)).pipe(aa(() => this.pendingTasks.remove(r)))
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(tu), x(vt))
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const HU = /^\)\]\}',?\n/;
            let NM = (() => {
                class e {
                    constructor(t) {
                        this.xhrFactory = t
                    }
                    handle(t) {
                        if ("JSONP" === t.method) throw new C(-2800, !1);
                        const r = this.xhrFactory;
                        return (r.\u0275loadImpl ? Fe(r.\u0275loadImpl()) : R(null)).pipe(Zt(() => new Ie(i => {
                            const s = r.build();
                            if (s.open(t.method, t.urlWithParams), t.withCredentials && (s.withCredentials = !0), t.headers.forEach((g, m) => s.setRequestHeader(g, m.join(","))), t.headers.has("Accept") || s.setRequestHeader("Accept", "application/json, text/plain, */*"), !t.headers.has("Content-Type")) {
                                const g = t.detectContentTypeHeader();
                                null !== g && s.setRequestHeader("Content-Type", g)
                            }
                            if (t.responseType) {
                                const g = t.responseType.toLowerCase();
                                s.responseType = "json" !== g ? g : "text"
                            }
                            const a = t.serializeBody();
                            let l = null;
                            const c = () => {
                                    if (null !== l) return l;
                                    const g = s.statusText || "OK",
                                        m = new Qt(s.getAllResponseHeaders()),
                                        y = function zU(e) {
                                            return "responseURL" in e && e.responseURL ? e.responseURL : /^X-Request-URL:/m.test(e.getAllResponseHeaders()) ? e.getResponseHeader("X-Request-URL") : null
                                        }(s) || t.url;
                                    return l = new ru({
                                        headers: m,
                                        status: s.status,
                                        statusText: g,
                                        url: y
                                    }), l
                                },
                                u = () => {
                                    let {
                                        headers: g,
                                        status: m,
                                        statusText: y,
                                        url: v
                                    } = c(), E = null;
                                    m !== ca.NoContent && (E = typeof s.response > "u" ? s.responseText : s.response), 0 === m && (m = E ? ca.Ok : 0);
                                    let T = m >= 200 && m < 300;
                                    if ("json" === t.responseType && "string" == typeof E) {
                                        const B = E;
                                        E = E.replace(HU, "");
                                        try {
                                            E = "" !== E ? JSON.parse(E) : null
                                        } catch (ne) {
                                            E = B, T && (T = !1, E = {
                                                error: ne,
                                                text: E
                                            })
                                        }
                                    }
                                    T ? (i.next(new eo({
                                        body: E,
                                        headers: g,
                                        status: m,
                                        statusText: y,
                                        url: v || void 0
                                    })), i.complete()) : i.error(new fi({
                                        error: E,
                                        headers: g,
                                        status: m,
                                        statusText: y,
                                        url: v || void 0
                                    }))
                                },
                                d = g => {
                                    const {
                                        url: m
                                    } = c(), y = new fi({
                                        error: g,
                                        status: s.status || 0,
                                        statusText: s.statusText || "Unknown Error",
                                        url: m || void 0
                                    });
                                    i.error(y)
                                };
                            let f = !1;
                            const h = g => {
                                    f || (i.next(c()), f = !0);
                                    let m = {
                                        type: br.DownloadProgress,
                                        loaded: g.loaded
                                    };
                                    g.lengthComputable && (m.total = g.total), "text" === t.responseType && s.responseText && (m.partialText = s.responseText), i.next(m)
                                },
                                p = g => {
                                    let m = {
                                        type: br.UploadProgress,
                                        loaded: g.loaded
                                    };
                                    g.lengthComputable && (m.total = g.total), i.next(m)
                                };
                            return s.addEventListener("load", u), s.addEventListener("error", d), s.addEventListener("timeout", d), s.addEventListener("abort", d), t.reportProgress && (s.addEventListener("progress", h), null !== a && s.upload && s.upload.addEventListener("progress", p)), s.send(a), i.next({
                                type: br.Sent
                            }), () => {
                                s.removeEventListener("error", d), s.removeEventListener("abort", d), s.removeEventListener("load", u), s.removeEventListener("timeout", d), t.reportProgress && (s.removeEventListener("progress", h), null !== a && s.upload && s.upload.removeEventListener("progress", p)), s.readyState !== s.DONE && s.abort()
                            }
                        })))
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(I0))
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();
            const cg = new M(""),
                OM = new M("", {
                    providedIn: "root",
                    factory: () => "XSRF-TOKEN"
                }),
                RM = new M("", {
                    providedIn: "root",
                    factory: () => "X-XSRF-TOKEN"
                });
            class PM {}
            let WU = (() => {
                class e {
                    constructor(t, r, o) {
                        this.doc = t, this.platform = r, this.cookieName = o, this.lastCookieString = "", this.lastToken = null, this.parseCount = 0
                    }
                    getToken() {
                        if ("server" === this.platform) return null;
                        const t = this.doc.cookie || "";
                        return t !== this.lastCookieString && (this.parseCount++, this.lastToken = h0(t, this.cookieName), this.lastCookieString = t), this.lastToken
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(Et), x(Hn), x(OM))
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();

            function ZU(e, n) {
                const t = e.url.toLowerCase();
                if (!w(cg) || "GET" === e.method || "HEAD" === e.method || t.startsWith("http://") || t.startsWith("https://")) return n(e);
                const r = w(PM).getToken(),
                    o = w(RM);
                return null != r && !e.headers.has(o) && (e = e.clone({
                    headers: e.headers.set(o, r)
                })), n(e)
            }
            var Er = function(e) {
                return e[e.Interceptors = 0] = "Interceptors", e[e.LegacyInterceptors = 1] = "LegacyInterceptors", e[e.CustomXsrfConfiguration = 2] = "CustomXsrfConfiguration", e[e.NoXsrfProtection = 3] = "NoXsrfProtection", e[e.JsonpSupport = 4] = "JsonpSupport", e[e.RequestsMadeViaParent = 5] = "RequestsMadeViaParent", e[e.Fetch = 6] = "Fetch", e
            }(Er || {});

            function QU(...e) {
                const n = [sg, NM, TM, {
                    provide: eu,
                    useExisting: TM
                }, {
                    provide: tu,
                    useExisting: NM
                }, {
                    provide: ua,
                    useValue: ZU,
                    multi: !0
                }, {
                    provide: cg,
                    useValue: !0
                }, {
                    provide: PM,
                    useClass: WU
                }];
                for (const t of e) n.push(...t.\u0275providers);
                return function ji(e) {
                    return {
                        \u0275providers: e
                    }
                }(n)
            }
            const kM = new M("");

            function YU() {
                return function to(e, n) {
                    return {
                        \u0275kind: e,
                        \u0275providers: n
                    }
                }(Er.LegacyInterceptors, [{
                    provide: kM,
                    useFactory: VU
                }, {
                    provide: ua,
                    useExisting: kM,
                    multi: !0
                }])
            }
            let XU = (() => {
                class e {
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275mod = zt({
                        type: e
                    });
                    static #n = this.\u0275inj = xt({
                        providers: [QU(YU())]
                    })
                }
                return e
            })();

            function ug(...e) {
                const n = ta(e),
                    t = mE(e),
                    {
                        args: r,
                        keys: o
                    } = pE(e);
                if (0 === r.length) return Fe([], n);
                const i = new Ie(function oB(e, n, t = tr) {
                    return r => {
                        HM(n, () => {
                            const {
                                length: o
                            } = e, i = new Array(o);
                            let s = o,
                                a = o;
                            for (let l = 0; l < o; l++) HM(n, () => {
                                const c = Fe(e[l], n);
                                let u = !1;
                                c.subscribe(Oe(r, d => {
                                    i[l] = d, u || (u = !0, a--), a || r.next(t(i.slice()))
                                }, () => {
                                    --s || r.complete()
                                }))
                            }, r)
                        }, r)
                    }
                }(r, n, o ? s => vE(o, s) : tr));
                return t ? i.pipe(yE(t)) : i
            }

            function HM(e, n, t) {
                e ? Xn(t, e, n) : n()
            }
            const iu = Ou(e => function() {
                e(this), this.name = "EmptyError", this.message = "no elements in sequence"
            });

            function hi(e = 1 / 0) {
                return it(tr, e)
            }

            function dg(...e) {
                return function iB() {
                    return hi(1)
                }()(Fe(e, ta(e)))
            }

            function zM(e) {
                return new Ie(n => {
                    $t(e()).subscribe(n)
                })
            }

            function su(e, n) {
                const t = ye(e) ? e : () => e,
                    r = o => o.error(t());
                return new Ie(n ? o => n.schedule(r, 0, o) : r)
            }
            const an = new Ie(e => e.complete());

            function fg() {
                return Le((e, n) => {
                    let t = null;
                    e._refCount++;
                    const r = Oe(n, void 0, void 0, void 0, () => {
                        if (!e || e._refCount <= 0 || 0 < --e._refCount) return void(t = null);
                        const o = e._connection,
                            i = t;
                        t = null, o && (!i || o === i) && o.unsubscribe(), n.unsubscribe()
                    });
                    e.subscribe(r), r.closed || (t = e.connect())
                })
            }
            class GM extends Ie {
                constructor(n, t) {
                    super(), this.source = n, this.subjectFactory = t, this._subject = null, this._refCount = 0, this._connection = null, vm(n) && (this.lift = n.lift)
                }
                _subscribe(n) {
                    return this.getSubject().subscribe(n)
                }
                getSubject() {
                    const n = this._subject;
                    return (!n || n.isStopped) && (this._subject = this.subjectFactory()), this._subject
                }
                _teardown() {
                    this._refCount = 0;
                    const {
                        _connection: n
                    } = this;
                    this._subject = this._connection = null, n?.unsubscribe()
                }
                connect() {
                    let n = this._connection;
                    if (!n) {
                        n = this._connection = new st;
                        const t = this.getSubject();
                        n.add(this.source.subscribe(Oe(t, void 0, () => {
                            this._teardown(), t.complete()
                        }, r => {
                            this._teardown(), t.error(r)
                        }, () => this._teardown()))), n.closed && (this._connection = null, n = st.EMPTY)
                    }
                    return n
                }
                refCount() {
                    return fg()(this)
                }
            }

            function pi(e) {
                return e <= 0 ? () => an : Le((n, t) => {
                    let r = 0;
                    n.subscribe(Oe(t, o => {
                        ++r <= e && (t.next(o), e <= r && t.complete())
                    }))
                })
            }

            function qM(...e) {
                const n = ta(e);
                return Le((t, r) => {
                    (n ? dg(e, t, n) : dg(e, t)).subscribe(r)
                })
            }

            function au(e) {
                return Le((n, t) => {
                    let r = !1;
                    n.subscribe(Oe(t, o => {
                        r = !0, t.next(o)
                    }, () => {
                        r || t.next(e), t.complete()
                    }))
                })
            }

            function WM(e = aB) {
                return Le((n, t) => {
                    let r = !1;
                    n.subscribe(Oe(t, o => {
                        r = !0, t.next(o)
                    }, () => r ? t.complete() : t.error(e())))
                })
            }

            function aB() {
                return new iu
            }

            function Mr(e, n) {
                const t = arguments.length >= 2;
                return r => r.pipe(e ? Kn((o, i) => e(o, i, r)) : tr, pi(1), t ? au(n) : WM(() => new iu))
            }

            function gt(e, n, t) {
                const r = ye(e) || n || t ? {
                    next: e,
                    error: n,
                    complete: t
                } : e;
                return r ? Le((o, i) => {
                    var s;
                    null === (s = r.subscribe) || void 0 === s || s.call(r);
                    let a = !0;
                    o.subscribe(Oe(i, l => {
                        var c;
                        null === (c = r.next) || void 0 === c || c.call(r, l), i.next(l)
                    }, () => {
                        var l;
                        a = !1, null === (l = r.complete) || void 0 === l || l.call(r), i.complete()
                    }, l => {
                        var c;
                        a = !1, null === (c = r.error) || void 0 === c || c.call(r, l), i.error(l)
                    }, () => {
                        var l, c;
                        a && (null === (l = r.unsubscribe) || void 0 === l || l.call(r)), null === (c = r.finalize) || void 0 === c || c.call(r)
                    }))
                }) : tr
            }

            function gi(e) {
                return Le((n, t) => {
                    let i, r = null,
                        o = !1;
                    r = n.subscribe(Oe(t, void 0, void 0, s => {
                        i = $t(e(s, gi(e)(n))), r ? (r.unsubscribe(), r = null, i.subscribe(t)) : o = !0
                    })), o && (r.unsubscribe(), r = null, i.subscribe(t))
                })
            }

            function hg(e) {
                return e <= 0 ? () => an : Le((n, t) => {
                    let r = [];
                    n.subscribe(Oe(t, o => {
                        r.push(o), e < r.length && r.shift()
                    }, () => {
                        for (const o of r) t.next(o);
                        t.complete()
                    }, void 0, () => {
                        r = null
                    }))
                })
            }

            function ZM(e) {
                return Z(() => e)
            }

            function QM(e) {
                return Le((n, t) => {
                    $t(e).subscribe(Oe(t, () => t.complete(), Pu)), !t.closed && n.subscribe(t)
                })
            }
            const H = "primary",
                da = Symbol("RouteTitle");
            class dB {
                constructor(n) {
                    this.params = n || {}
                }
                has(n) {
                    return Object.prototype.hasOwnProperty.call(this.params, n)
                }
                get(n) {
                    if (this.has(n)) {
                        const t = this.params[n];
                        return Array.isArray(t) ? t[0] : t
                    }
                    return null
                }
                getAll(n) {
                    if (this.has(n)) {
                        const t = this.params[n];
                        return Array.isArray(t) ? t : [t]
                    }
                    return []
                }
                get keys() {
                    return Object.keys(this.params)
                }
            }

            function mi(e) {
                return new dB(e)
            }

            function fB(e, n, t) {
                const r = t.path.split("/");
                if (r.length > e.length || "full" === t.pathMatch && (n.hasChildren() || r.length < e.length)) return null;
                const o = {};
                for (let i = 0; i < r.length; i++) {
                    const s = r[i],
                        a = e[i];
                    if (s.startsWith(":")) o[s.substring(1)] = a;
                    else if (s !== a.path) return null
                }
                return {
                    consumed: e.slice(0, r.length),
                    posParams: o
                }
            }

            function Tn(e, n) {
                const t = e ? pg(e) : void 0,
                    r = n ? pg(n) : void 0;
                if (!t || !r || t.length != r.length) return !1;
                let o;
                for (let i = 0; i < t.length; i++)
                    if (o = t[i], !YM(e[o], n[o])) return !1;
                return !0
            }

            function pg(e) {
                return [...Object.keys(e), ...Object.getOwnPropertySymbols(e)]
            }

            function YM(e, n) {
                if (Array.isArray(e) && Array.isArray(n)) {
                    if (e.length !== n.length) return !1;
                    const t = [...e].sort(),
                        r = [...n].sort();
                    return t.every((o, i) => r[i] === o)
                }
                return e === n
            }

            function XM(e) {
                return e.length > 0 ? e[e.length - 1] : null
            }

            function Ir(e) {
                return function rB(e) {
                    return !!e && (e instanceof Ie || ye(e.lift) && ye(e.subscribe))
                }(e) ? e : Gs(e) ? Fe(Promise.resolve(e)) : R(e)
            }
            const pB = {
                    exact: function eI(e, n, t) {
                        if (!no(e.segments, n.segments) || !lu(e.segments, n.segments, t) || e.numberOfChildren !== n.numberOfChildren) return !1;
                        for (const r in n.children)
                            if (!e.children[r] || !eI(e.children[r], n.children[r], t)) return !1;
                        return !0
                    },
                    subset: tI
                },
                KM = {
                    exact: function gB(e, n) {
                        return Tn(e, n)
                    },
                    subset: function mB(e, n) {
                        return Object.keys(n).length <= Object.keys(e).length && Object.keys(n).every(t => YM(e[t], n[t]))
                    },
                    ignored: () => !0
                };

            function JM(e, n, t) {
                return pB[t.paths](e.root, n.root, t.matrixParams) && KM[t.queryParams](e.queryParams, n.queryParams) && !("exact" === t.fragment && e.fragment !== n.fragment)
            }

            function tI(e, n, t) {
                return nI(e, n, n.segments, t)
            }

            function nI(e, n, t, r) {
                if (e.segments.length > t.length) {
                    const o = e.segments.slice(0, t.length);
                    return !(!no(o, t) || n.hasChildren() || !lu(o, t, r))
                }
                if (e.segments.length === t.length) {
                    if (!no(e.segments, t) || !lu(e.segments, t, r)) return !1;
                    for (const o in n.children)
                        if (!e.children[o] || !tI(e.children[o], n.children[o], r)) return !1;
                    return !0
                } {
                    const o = t.slice(0, e.segments.length),
                        i = t.slice(e.segments.length);
                    return !!(no(e.segments, o) && lu(e.segments, o, r) && e.children[H]) && nI(e.children[H], n, i, r)
                }
            }

            function lu(e, n, t) {
                return n.every((r, o) => KM[t](e[o].parameters, r.parameters))
            }
            class yi {
                constructor(n = new le([], {}), t = {}, r = null) {
                    this.root = n, this.queryParams = t, this.fragment = r
                }
                get queryParamMap() {
                    return this._queryParamMap ??= mi(this.queryParams), this._queryParamMap
                }
                toString() {
                    return _B.serialize(this)
                }
            }
            class le {
                constructor(n, t) {
                    this.segments = n, this.children = t, this.parent = null, Object.values(t).forEach(r => r.parent = this)
                }
                hasChildren() {
                    return this.numberOfChildren > 0
                }
                get numberOfChildren() {
                    return Object.keys(this.children).length
                }
                toString() {
                    return cu(this)
                }
            }
            class fa {
                constructor(n, t) {
                    this.path = n, this.parameters = t
                }
                get parameterMap() {
                    return this._parameterMap ??= mi(this.parameters), this._parameterMap
                }
                toString() {
                    return iI(this)
                }
            }

            function no(e, n) {
                return e.length === n.length && e.every((t, r) => t.path === n[r].path)
            }
            let vi = (() => {
                class e {
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: () => new gg,
                        providedIn: "root"
                    })
                }
                return e
            })();
            class gg {
                parse(n) {
                    const t = new AB(n);
                    return new yi(t.parseRootSegment(), t.parseQueryParams(), t.parseFragment())
                }
                serialize(n) {
                    const t = `/${ha(n.root,!0)}`,
                        r = function wB(e) {
                            const n = Object.entries(e).map(([t, r]) => Array.isArray(r) ? r.map(o => `${uu(t)}=${uu(o)}`).join("&") : `${uu(t)}=${uu(r)}`).filter(t => t);
                            return n.length ? `?${n.join("&")}` : ""
                        }(n.queryParams);
                    return `${t}${r}${"string"==typeof n.fragment?`#${function CB(e){return encodeURI(e)}(n.fragment)}`:""}`
                }
            }
            const _B = new gg;

            function cu(e) {
                return e.segments.map(n => iI(n)).join("/")
            }

            function ha(e, n) {
                if (!e.hasChildren()) return cu(e);
                if (n) {
                    const t = e.children[H] ? ha(e.children[H], !1) : "",
                        r = [];
                    return Object.entries(e.children).forEach(([o, i]) => {
                        o !== H && r.push(`${o}:${ha(i,!1)}`)
                    }), r.length > 0 ? `${t}(${r.join("//")})` : t
                } {
                    const t = function vB(e, n) {
                        let t = [];
                        return Object.entries(e.children).forEach(([r, o]) => {
                            r === H && (t = t.concat(n(o, r)))
                        }), Object.entries(e.children).forEach(([r, o]) => {
                            r !== H && (t = t.concat(n(o, r)))
                        }), t
                    }(e, (r, o) => o === H ? [ha(e.children[H], !1)] : [`${o}:${ha(r,!1)}`]);
                    return 1 === Object.keys(e.children).length && null != e.children[H] ? `${cu(e)}/${t[0]}` : `${cu(e)}/(${t.join("//")})`
                }
            }

            function rI(e) {
                return encodeURIComponent(e).replace(/%40/g, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",")
            }

            function uu(e) {
                return rI(e).replace(/%3B/gi, ";")
            }

            function mg(e) {
                return rI(e).replace(/\(/g, "%28").replace(/\)/g, "%29").replace(/%26/gi, "&")
            }

            function du(e) {
                return decodeURIComponent(e)
            }

            function oI(e) {
                return du(e.replace(/\+/g, "%20"))
            }

            function iI(e) {
                return `${mg(e.path)}${function DB(e){return Object.entries(e).map(([n,t])=>`;${mg(n)}=${mg(t)}`).join("")}(e.parameters)}`
            }
            const bB = /^[^\/()?;#]+/;

            function yg(e) {
                const n = e.match(bB);
                return n ? n[0] : ""
            }
            const EB = /^[^\/()?;=#]+/,
                IB = /^[^=?&#]+/,
                SB = /^[^&#]+/;
            class AB {
                constructor(n) {
                    this.url = n, this.remaining = n
                }
                parseRootSegment() {
                    return this.consumeOptional("/"), "" === this.remaining || this.peekStartsWith("?") || this.peekStartsWith("#") ? new le([], {}) : new le([], this.parseChildren())
                }
                parseQueryParams() {
                    const n = {};
                    if (this.consumeOptional("?"))
                        do {
                            this.parseQueryParam(n)
                        } while (this.consumeOptional("&"));
                    return n
                }
                parseFragment() {
                    return this.consumeOptional("#") ? decodeURIComponent(this.remaining) : null
                }
                parseChildren() {
                    if ("" === this.remaining) return {};
                    this.consumeOptional("/");
                    const n = [];
                    for (this.peekStartsWith("(") || n.push(this.parseSegment()); this.peekStartsWith("/") && !this.peekStartsWith("//") && !this.peekStartsWith("/(");) this.capture("/"), n.push(this.parseSegment());
                    let t = {};
                    this.peekStartsWith("/(") && (this.capture("/"), t = this.parseParens(!0));
                    let r = {};
                    return this.peekStartsWith("(") && (r = this.parseParens(!1)), (n.length > 0 || Object.keys(t).length > 0) && (r[H] = new le(n, t)), r
                }
                parseSegment() {
                    const n = yg(this.remaining);
                    if ("" === n && this.peekStartsWith(";")) throw new C(4009, !1);
                    return this.capture(n), new fa(du(n), this.parseMatrixParams())
                }
                parseMatrixParams() {
                    const n = {};
                    for (; this.consumeOptional(";");) this.parseParam(n);
                    return n
                }
                parseParam(n) {
                    const t = function MB(e) {
                        const n = e.match(EB);
                        return n ? n[0] : ""
                    }(this.remaining);
                    if (!t) return;
                    this.capture(t);
                    let r = "";
                    if (this.consumeOptional("=")) {
                        const o = yg(this.remaining);
                        o && (r = o, this.capture(r))
                    }
                    n[du(t)] = du(r)
                }
                parseQueryParam(n) {
                    const t = function xB(e) {
                        const n = e.match(IB);
                        return n ? n[0] : ""
                    }(this.remaining);
                    if (!t) return;
                    this.capture(t);
                    let r = "";
                    if (this.consumeOptional("=")) {
                        const s = function TB(e) {
                            const n = e.match(SB);
                            return n ? n[0] : ""
                        }(this.remaining);
                        s && (r = s, this.capture(r))
                    }
                    const o = oI(t),
                        i = oI(r);
                    if (n.hasOwnProperty(o)) {
                        let s = n[o];
                        Array.isArray(s) || (s = [s], n[o] = s), s.push(i)
                    } else n[o] = i
                }
                parseParens(n) {
                    const t = {};
                    for (this.capture("("); !this.consumeOptional(")") && this.remaining.length > 0;) {
                        const r = yg(this.remaining),
                            o = this.remaining[r.length];
                        if ("/" !== o && ")" !== o && ";" !== o) throw new C(4010, !1);
                        let i;
                        r.indexOf(":") > -1 ? (i = r.slice(0, r.indexOf(":")), this.capture(i), this.capture(":")) : n && (i = H);
                        const s = this.parseChildren();
                        t[i] = 1 === Object.keys(s).length ? s[H] : new le([], s), this.consumeOptional("//")
                    }
                    return t
                }
                peekStartsWith(n) {
                    return this.remaining.startsWith(n)
                }
                consumeOptional(n) {
                    return !!this.peekStartsWith(n) && (this.remaining = this.remaining.substring(n.length), !0)
                }
                capture(n) {
                    if (!this.consumeOptional(n)) throw new C(4011, !1)
                }
            }

            function sI(e) {
                return e.segments.length > 0 ? new le([], {
                    [H]: e
                }) : e
            }

            function aI(e) {
                const n = {};
                for (const [r, o] of Object.entries(e.children)) {
                    const i = aI(o);
                    if (r === H && 0 === i.segments.length && i.hasChildren())
                        for (const [s, a] of Object.entries(i.children)) n[s] = a;
                    else(i.segments.length > 0 || i.hasChildren()) && (n[r] = i)
                }
                return function NB(e) {
                    if (1 === e.numberOfChildren && e.children[H]) {
                        const n = e.children[H];
                        return new le(e.segments.concat(n.segments), n.children)
                    }
                    return e
                }(new le(e.segments, n))
            }

            function _i(e) {
                return e instanceof yi
            }

            function lI(e) {
                let n;
                const o = sI(function t(i) {
                    const s = {};
                    for (const l of i.children) {
                        const c = t(l);
                        s[l.outlet] = c
                    }
                    const a = new le(i.url, s);
                    return i === e && (n = a), a
                }(e.root));
                return n ?? o
            }

            function cI(e, n, t, r) {
                let o = e;
                for (; o.parent;) o = o.parent;
                if (0 === n.length) return vg(o, o, o, t, r);
                const i = function RB(e) {
                    if ("string" == typeof e[0] && 1 === e.length && "/" === e[0]) return new dI(!0, 0, e);
                    let n = 0,
                        t = !1;
                    const r = e.reduce((o, i, s) => {
                        if ("object" == typeof i && null != i) {
                            if (i.outlets) {
                                const a = {};
                                return Object.entries(i.outlets).forEach(([l, c]) => {
                                    a[l] = "string" == typeof c ? c.split("/") : c
                                }), [...o, {
                                    outlets: a
                                }]
                            }
                            if (i.segmentPath) return [...o, i.segmentPath]
                        }
                        return "string" != typeof i ? [...o, i] : 0 === s ? (i.split("/").forEach((a, l) => {
                            0 == l && "." === a || (0 == l && "" === a ? t = !0 : ".." === a ? n++ : "" != a && o.push(a))
                        }), o) : [...o, i]
                    }, []);
                    return new dI(t, n, r)
                }(n);
                if (i.toRoot()) return vg(o, o, new le([], {}), t, r);
                const s = function PB(e, n, t) {
                        if (e.isAbsolute) return new hu(n, !0, 0);
                        if (!t) return new hu(n, !1, NaN);
                        if (null === t.parent) return new hu(t, !0, 0);
                        const r = fu(e.commands[0]) ? 0 : 1;
                        return function kB(e, n, t) {
                            let r = e,
                                o = n,
                                i = t;
                            for (; i > o;) {
                                if (i -= o, r = r.parent, !r) throw new C(4005, !1);
                                o = r.segments.length
                            }
                            return new hu(r, !1, o - i)
                        }(t, t.segments.length - 1 + r, e.numberOfDoubleDots)
                    }(i, o, e),
                    a = s.processChildren ? ga(s.segmentGroup, s.index, i.commands) : fI(s.segmentGroup, s.index, i.commands);
                return vg(o, s.segmentGroup, a, t, r)
            }

            function fu(e) {
                return "object" == typeof e && null != e && !e.outlets && !e.segmentPath
            }

            function pa(e) {
                return "object" == typeof e && null != e && e.outlets
            }

            function vg(e, n, t, r, o) {
                let s, i = {};
                r && Object.entries(r).forEach(([l, c]) => {
                    i[l] = Array.isArray(c) ? c.map(u => `${u}`) : `${c}`
                }), s = e === n ? t : uI(e, n, t);
                const a = sI(aI(s));
                return new yi(a, i, o)
            }

            function uI(e, n, t) {
                const r = {};
                return Object.entries(e.children).forEach(([o, i]) => {
                    r[o] = i === n ? t : uI(i, n, t)
                }), new le(e.segments, r)
            }
            class dI {
                constructor(n, t, r) {
                    if (this.isAbsolute = n, this.numberOfDoubleDots = t, this.commands = r, n && r.length > 0 && fu(r[0])) throw new C(4003, !1);
                    const o = r.find(pa);
                    if (o && o !== XM(r)) throw new C(4004, !1)
                }
                toRoot() {
                    return this.isAbsolute && 1 === this.commands.length && "/" == this.commands[0]
                }
            }
            class hu {
                constructor(n, t, r) {
                    this.segmentGroup = n, this.processChildren = t, this.index = r
                }
            }

            function fI(e, n, t) {
                if (e ??= new le([], {}), 0 === e.segments.length && e.hasChildren()) return ga(e, n, t);
                const r = function LB(e, n, t) {
                        let r = 0,
                            o = n;
                        const i = {
                            match: !1,
                            pathIndex: 0,
                            commandIndex: 0
                        };
                        for (; o < e.segments.length;) {
                            if (r >= t.length) return i;
                            const s = e.segments[o],
                                a = t[r];
                            if (pa(a)) break;
                            const l = `${a}`,
                                c = r < t.length - 1 ? t[r + 1] : null;
                            if (o > 0 && void 0 === l) break;
                            if (l && c && "object" == typeof c && void 0 === c.outlets) {
                                if (!pI(l, c, s)) return i;
                                r += 2
                            } else {
                                if (!pI(l, {}, s)) return i;
                                r++
                            }
                            o++
                        }
                        return {
                            match: !0,
                            pathIndex: o,
                            commandIndex: r
                        }
                    }(e, n, t),
                    o = t.slice(r.commandIndex);
                if (r.match && r.pathIndex < e.segments.length) {
                    const i = new le(e.segments.slice(0, r.pathIndex), {});
                    return i.children[H] = new le(e.segments.slice(r.pathIndex), e.children), ga(i, 0, o)
                }
                return r.match && 0 === o.length ? new le(e.segments, {}) : r.match && !e.hasChildren() ? _g(e, n, t) : r.match ? ga(e, 0, o) : _g(e, n, t)
            }

            function ga(e, n, t) {
                if (0 === t.length) return new le(e.segments, {});
                {
                    const r = function FB(e) {
                            return pa(e[0]) ? e[0].outlets : {
                                [H]: e
                            }
                        }(t),
                        o = {};
                    if (Object.keys(r).some(i => i !== H) && e.children[H] && 1 === e.numberOfChildren && 0 === e.children[H].segments.length) {
                        const i = ga(e.children[H], n, t);
                        return new le(e.segments, i.children)
                    }
                    return Object.entries(r).forEach(([i, s]) => {
                        "string" == typeof s && (s = [s]), null !== s && (o[i] = fI(e.children[i], n, s))
                    }), Object.entries(e.children).forEach(([i, s]) => {
                        void 0 === r[i] && (o[i] = s)
                    }), new le(e.segments, o)
                }
            }

            function _g(e, n, t) {
                const r = e.segments.slice(0, n);
                let o = 0;
                for (; o < t.length;) {
                    const i = t[o];
                    if (pa(i)) {
                        const l = VB(i.outlets);
                        return new le(r, l)
                    }
                    if (0 === o && fu(t[0])) {
                        r.push(new fa(e.segments[n].path, hI(t[0]))), o++;
                        continue
                    }
                    const s = pa(i) ? i.outlets[H] : `${i}`,
                        a = o < t.length - 1 ? t[o + 1] : null;
                    s && a && fu(a) ? (r.push(new fa(s, hI(a))), o += 2) : (r.push(new fa(s, {})), o++)
                }
                return new le(r, {})
            }

            function VB(e) {
                const n = {};
                return Object.entries(e).forEach(([t, r]) => {
                    "string" == typeof r && (r = [r]), null !== r && (n[t] = _g(new le([], {}), 0, r))
                }), n
            }

            function hI(e) {
                const n = {};
                return Object.entries(e).forEach(([t, r]) => n[t] = `${r}`), n
            }

            function pI(e, n, t) {
                return e == t.path && Tn(n, t.parameters)
            }
            const ma = "imperative";
            var Q = function(e) {
                return e[e.NavigationStart = 0] = "NavigationStart", e[e.NavigationEnd = 1] = "NavigationEnd", e[e.NavigationCancel = 2] = "NavigationCancel", e[e.NavigationError = 3] = "NavigationError", e[e.RoutesRecognized = 4] = "RoutesRecognized", e[e.ResolveStart = 5] = "ResolveStart", e[e.ResolveEnd = 6] = "ResolveEnd", e[e.GuardsCheckStart = 7] = "GuardsCheckStart", e[e.GuardsCheckEnd = 8] = "GuardsCheckEnd", e[e.RouteConfigLoadStart = 9] = "RouteConfigLoadStart", e[e.RouteConfigLoadEnd = 10] = "RouteConfigLoadEnd", e[e.ChildActivationStart = 11] = "ChildActivationStart", e[e.ChildActivationEnd = 12] = "ChildActivationEnd", e[e.ActivationStart = 13] = "ActivationStart", e[e.ActivationEnd = 14] = "ActivationEnd", e[e.Scroll = 15] = "Scroll", e[e.NavigationSkipped = 16] = "NavigationSkipped", e
            }(Q || {});
            class An {
                constructor(n, t) {
                    this.id = n, this.url = t
                }
            }
            class pu extends An {
                constructor(n, t, r = "imperative", o = null) {
                    super(n, t), this.type = Q.NavigationStart, this.navigationTrigger = r, this.restoredState = o
                }
                toString() {
                    return `NavigationStart(id: ${this.id}, url: '${this.url}')`
                }
            }
            class Jn extends An {
                constructor(n, t, r) {
                    super(n, t), this.urlAfterRedirects = r, this.type = Q.NavigationEnd
                }
                toString() {
                    return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`
                }
            }
            var Ut = function(e) {
                    return e[e.Redirect = 0] = "Redirect", e[e.SupersededByNewNavigation = 1] = "SupersededByNewNavigation", e[e.NoDataFromResolver = 2] = "NoDataFromResolver", e[e.GuardRejected = 3] = "GuardRejected", e
                }(Ut || {}),
                gu = function(e) {
                    return e[e.IgnoredSameUrlNavigation = 0] = "IgnoredSameUrlNavigation", e[e.IgnoredByUrlHandlingStrategy = 1] = "IgnoredByUrlHandlingStrategy", e
                }(gu || {});
            class Ci extends An {
                constructor(n, t, r, o) {
                    super(n, t), this.reason = r, this.code = o, this.type = Q.NavigationCancel
                }
                toString() {
                    return `NavigationCancel(id: ${this.id}, url: '${this.url}')`
                }
            }
            class Di extends An {
                constructor(n, t, r, o) {
                    super(n, t), this.reason = r, this.code = o, this.type = Q.NavigationSkipped
                }
            }
            class mu extends An {
                constructor(n, t, r, o) {
                    super(n, t), this.error = r, this.target = o, this.type = Q.NavigationError
                }
                toString() {
                    return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`
                }
            }
            class gI extends An {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = Q.RoutesRecognized
                }
                toString() {
                    return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class jB extends An {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = Q.GuardsCheckStart
                }
                toString() {
                    return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class $B extends An {
                constructor(n, t, r, o, i) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.shouldActivate = i, this.type = Q.GuardsCheckEnd
                }
                toString() {
                    return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`
                }
            }
            class UB extends An {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = Q.ResolveStart
                }
                toString() {
                    return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class BB extends An {
                constructor(n, t, r, o) {
                    super(n, t), this.urlAfterRedirects = r, this.state = o, this.type = Q.ResolveEnd
                }
                toString() {
                    return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`
                }
            }
            class HB {
                constructor(n) {
                    this.route = n, this.type = Q.RouteConfigLoadStart
                }
                toString() {
                    return `RouteConfigLoadStart(path: ${this.route.path})`
                }
            }
            class zB {
                constructor(n) {
                    this.route = n, this.type = Q.RouteConfigLoadEnd
                }
                toString() {
                    return `RouteConfigLoadEnd(path: ${this.route.path})`
                }
            }
            class GB {
                constructor(n) {
                    this.snapshot = n, this.type = Q.ChildActivationStart
                }
                toString() {
                    return `ChildActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class qB {
                constructor(n) {
                    this.snapshot = n, this.type = Q.ChildActivationEnd
                }
                toString() {
                    return `ChildActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class WB {
                constructor(n) {
                    this.snapshot = n, this.type = Q.ActivationStart
                }
                toString() {
                    return `ActivationStart(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class ZB {
                constructor(n) {
                    this.snapshot = n, this.type = Q.ActivationEnd
                }
                toString() {
                    return `ActivationEnd(path: '${this.snapshot.routeConfig&&this.snapshot.routeConfig.path||""}')`
                }
            }
            class mI {
                constructor(n, t, r) {
                    this.routerEvent = n, this.position = t, this.anchor = r, this.type = Q.Scroll
                }
                toString() {
                    return `Scroll(anchor: '${this.anchor}', position: '${this.position?`${this.position[0]}, ${this.position[1]}`:null}')`
                }
            }
            class Cg {}
            class Dg {
                constructor(n) {
                    this.url = n
                }
            }
            class QB {
                constructor() {
                    this.outlet = null, this.route = null, this.injector = null, this.children = new ya, this.attachRef = null
                }
            }
            let ya = (() => {
                class e {
                    constructor() {
                        this.contexts = new Map
                    }
                    onChildOutletCreated(t, r) {
                        const o = this.getOrCreateContext(t);
                        o.outlet = r, this.contexts.set(t, o)
                    }
                    onChildOutletDestroyed(t) {
                        const r = this.getContext(t);
                        r && (r.outlet = null, r.attachRef = null)
                    }
                    onOutletDeactivated() {
                        const t = this.contexts;
                        return this.contexts = new Map, t
                    }
                    onOutletReAttached(t) {
                        this.contexts = t
                    }
                    getOrCreateContext(t) {
                        let r = this.getContext(t);
                        return r || (r = new QB, this.contexts.set(t, r)), r
                    }
                    getContext(t) {
                        return this.contexts.get(t) || null
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            class yI {
                constructor(n) {
                    this._root = n
                }
                get root() {
                    return this._root.value
                }
                parent(n) {
                    const t = this.pathFromRoot(n);
                    return t.length > 1 ? t[t.length - 2] : null
                }
                children(n) {
                    const t = wg(n, this._root);
                    return t ? t.children.map(r => r.value) : []
                }
                firstChild(n) {
                    const t = wg(n, this._root);
                    return t && t.children.length > 0 ? t.children[0].value : null
                }
                siblings(n) {
                    const t = bg(n, this._root);
                    return t.length < 2 ? [] : t[t.length - 2].children.map(o => o.value).filter(o => o !== n)
                }
                pathFromRoot(n) {
                    return bg(n, this._root).map(t => t.value)
                }
            }

            function wg(e, n) {
                if (e === n.value) return n;
                for (const t of n.children) {
                    const r = wg(e, t);
                    if (r) return r
                }
                return null
            }

            function bg(e, n) {
                if (e === n.value) return [n];
                for (const t of n.children) {
                    const r = bg(e, t);
                    if (r.length) return r.unshift(n), r
                }
                return []
            }
            class ln {
                constructor(n, t) {
                    this.value = n, this.children = t
                }
                toString() {
                    return `TreeNode(${this.value})`
                }
            }

            function wi(e) {
                const n = {};
                return e && e.children.forEach(t => n[t.value.outlet] = t), n
            }
            class vI extends yI {
                constructor(n, t) {
                    super(n), this.snapshot = t, Ig(this, n)
                }
                toString() {
                    return this.snapshot.toString()
                }
            }

            function _I(e) {
                const n = function YB(e) {
                        const i = new Mg([], {}, {}, "", {}, H, e, null, {});
                        return new CI("", new ln(i, []))
                    }(e),
                    t = new Ht([new fa("", {})]),
                    r = new Ht({}),
                    o = new Ht({}),
                    i = new Ht({}),
                    s = new Ht(""),
                    a = new bi(t, r, i, s, o, H, e, n.root);
                return a.snapshot = n.root, new vI(new ln(a, []), n)
            }
            class bi {
                constructor(n, t, r, o, i, s, a, l) {
                    this.urlSubject = n, this.paramsSubject = t, this.queryParamsSubject = r, this.fragmentSubject = o, this.dataSubject = i, this.outlet = s, this.component = a, this._futureSnapshot = l, this.title = this.dataSubject?.pipe(Z(c => c[da])) ?? R(void 0), this.url = n, this.params = t, this.queryParams = r, this.fragment = o, this.data = i
                }
                get routeConfig() {
                    return this._futureSnapshot.routeConfig
                }
                get root() {
                    return this._routerState.root
                }
                get parent() {
                    return this._routerState.parent(this)
                }
                get firstChild() {
                    return this._routerState.firstChild(this)
                }
                get children() {
                    return this._routerState.children(this)
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                    return this._paramMap ??= this.params.pipe(Z(n => mi(n))), this._paramMap
                }
                get queryParamMap() {
                    return this._queryParamMap ??= this.queryParams.pipe(Z(n => mi(n))), this._queryParamMap
                }
                toString() {
                    return this.snapshot ? this.snapshot.toString() : `Future(${this._futureSnapshot})`
                }
            }

            function Eg(e, n, t = "emptyOnly") {
                let r;
                const {
                    routeConfig: o
                } = e;
                return r = null === n || "always" !== t && "" !== o?.path && (n.component || n.routeConfig?.loadComponent) ? {
                    params: {
                        ...e.params
                    },
                    data: {
                        ...e.data
                    },
                    resolve: {
                        ...e.data,
                        ...e._resolvedData ?? {}
                    }
                } : {
                    params: {
                        ...n.params,
                        ...e.params
                    },
                    data: {
                        ...n.data,
                        ...e.data
                    },
                    resolve: {
                        ...e.data,
                        ...n.data,
                        ...o?.data,
                        ...e._resolvedData
                    }
                }, o && wI(o) && (r.resolve[da] = o.title), r
            }
            class Mg {
                get title() {
                    return this.data?.[da]
                }
                constructor(n, t, r, o, i, s, a, l, c) {
                    this.url = n, this.params = t, this.queryParams = r, this.fragment = o, this.data = i, this.outlet = s, this.component = a, this.routeConfig = l, this._resolve = c
                }
                get root() {
                    return this._routerState.root
                }
                get parent() {
                    return this._routerState.parent(this)
                }
                get firstChild() {
                    return this._routerState.firstChild(this)
                }
                get children() {
                    return this._routerState.children(this)
                }
                get pathFromRoot() {
                    return this._routerState.pathFromRoot(this)
                }
                get paramMap() {
                    return this._paramMap ??= mi(this.params), this._paramMap
                }
                get queryParamMap() {
                    return this._queryParamMap ??= mi(this.queryParams), this._queryParamMap
                }
                toString() {
                    return `Route(url:'${this.url.map(r=>r.toString()).join("/")}', path:'${this.routeConfig?this.routeConfig.path:""}')`
                }
            }
            class CI extends yI {
                constructor(n, t) {
                    super(t), this.url = n, Ig(this, t)
                }
                toString() {
                    return DI(this._root)
                }
            }

            function Ig(e, n) {
                n.value._routerState = e, n.children.forEach(t => Ig(e, t))
            }

            function DI(e) {
                const n = e.children.length > 0 ? ` { ${e.children.map(DI).join(", ")} } ` : "";
                return `${e.value}${n}`
            }

            function xg(e) {
                if (e.snapshot) {
                    const n = e.snapshot,
                        t = e._futureSnapshot;
                    e.snapshot = t, Tn(n.queryParams, t.queryParams) || e.queryParamsSubject.next(t.queryParams), n.fragment !== t.fragment && e.fragmentSubject.next(t.fragment), Tn(n.params, t.params) || e.paramsSubject.next(t.params),
                        function hB(e, n) {
                            if (e.length !== n.length) return !1;
                            for (let t = 0; t < e.length; ++t)
                                if (!Tn(e[t], n[t])) return !1;
                            return !0
                        }(n.url, t.url) || e.urlSubject.next(t.url), Tn(n.data, t.data) || e.dataSubject.next(t.data)
                } else e.snapshot = e._futureSnapshot, e.dataSubject.next(e._futureSnapshot.data)
            }

            function Sg(e, n) {
                const t = Tn(e.params, n.params) && function yB(e, n) {
                    return no(e, n) && e.every((t, r) => Tn(t.parameters, n[r].parameters))
                }(e.url, n.url);
                return t && !(!e.parent != !n.parent) && (!e.parent || Sg(e.parent, n.parent))
            }

            function wI(e) {
                return "string" == typeof e.title || null === e.title
            }
            let Tg = (() => {
                class e {
                    constructor() {
                        this.activated = null, this._activatedRoute = null, this.name = H, this.activateEvents = new _e, this.deactivateEvents = new _e, this.attachEvents = new _e, this.detachEvents = new _e, this.parentContexts = w(ya), this.location = w(kt), this.changeDetector = w(qs), this.environmentInjector = w(vt), this.inputBinder = w(yu, {
                            optional: !0
                        }), this.supportsBindingToComponentInputs = !0
                    }
                    get activatedComponentRef() {
                        return this.activated
                    }
                    ngOnChanges(t) {
                        if (t.name) {
                            const {
                                firstChange: r,
                                previousValue: o
                            } = t.name;
                            if (r) return;
                            this.isTrackedInParentContexts(o) && (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)), this.initializeOutletWithName()
                        }
                    }
                    ngOnDestroy() {
                        this.isTrackedInParentContexts(this.name) && this.parentContexts.onChildOutletDestroyed(this.name), this.inputBinder?.unsubscribeFromRouteData(this)
                    }
                    isTrackedInParentContexts(t) {
                        return this.parentContexts.getContext(t)?.outlet === this
                    }
                    ngOnInit() {
                        this.initializeOutletWithName()
                    }
                    initializeOutletWithName() {
                        if (this.parentContexts.onChildOutletCreated(this.name, this), this.activated) return;
                        const t = this.parentContexts.getContext(this.name);
                        t?.route && (t.attachRef ? this.attach(t.attachRef, t.route) : this.activateWith(t.route, t.injector))
                    }
                    get isActivated() {
                        return !!this.activated
                    }
                    get component() {
                        if (!this.activated) throw new C(4012, !1);
                        return this.activated.instance
                    }
                    get activatedRoute() {
                        if (!this.activated) throw new C(4012, !1);
                        return this._activatedRoute
                    }
                    get activatedRouteData() {
                        return this._activatedRoute ? this._activatedRoute.snapshot.data : {}
                    }
                    detach() {
                        if (!this.activated) throw new C(4012, !1);
                        this.location.detach();
                        const t = this.activated;
                        return this.activated = null, this._activatedRoute = null, this.detachEvents.emit(t.instance), t
                    }
                    attach(t, r) {
                        this.activated = t, this._activatedRoute = r, this.location.insert(t.hostView), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.attachEvents.emit(t.instance)
                    }
                    deactivate() {
                        if (this.activated) {
                            const t = this.component;
                            this.activated.destroy(), this.activated = null, this._activatedRoute = null, this.deactivateEvents.emit(t)
                        }
                    }
                    activateWith(t, r) {
                        if (this.isActivated) throw new C(4013, !1);
                        this._activatedRoute = t;
                        const o = this.location,
                            s = t.snapshot.component,
                            a = this.parentContexts.getOrCreateContext(this.name).children,
                            l = new XB(t, a, o.injector);
                        this.activated = o.createComponent(s, {
                            index: o.length,
                            injector: l,
                            environmentInjector: r ?? this.environmentInjector
                        }), this.changeDetector.markForCheck(), this.inputBinder?.bindActivatedRouteToOutletComponent(this), this.activateEvents.emit(this.activated.instance)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275dir = L({
                        type: e,
                        selectors: [
                            ["router-outlet"]
                        ],
                        inputs: {
                            name: "name"
                        },
                        outputs: {
                            activateEvents: "activate",
                            deactivateEvents: "deactivate",
                            attachEvents: "attach",
                            detachEvents: "detach"
                        },
                        exportAs: ["outlet"],
                        standalone: !0,
                        features: [At]
                    })
                }
                return e
            })();
            class XB {
                constructor(n, t, r) {
                    this.route = n, this.childContexts = t, this.parent = r, this.__ngOutletInjector = !0
                }
                get(n, t) {
                    return n === bi ? this.route : n === ya ? this.childContexts : this.parent.get(n, t)
                }
            }
            const yu = new M("");
            let bI = (() => {
                class e {
                    constructor() {
                        this.outletDataSubscriptions = new Map
                    }
                    bindActivatedRouteToOutletComponent(t) {
                        this.unsubscribeFromRouteData(t), this.subscribeToRouteData(t)
                    }
                    unsubscribeFromRouteData(t) {
                        this.outletDataSubscriptions.get(t)?.unsubscribe(), this.outletDataSubscriptions.delete(t)
                    }
                    subscribeToRouteData(t) {
                        const {
                            activatedRoute: r
                        } = t, o = ug([r.queryParams, r.params, r.data]).pipe(Zt(([i, s, a], l) => (a = {
                            ...i,
                            ...s,
                            ...a
                        }, 0 === l ? R(a) : Promise.resolve(a)))).subscribe(i => {
                            if (!t.isActivated || !t.activatedComponentRef || t.activatedRoute !== r || null === r.component) return void this.unsubscribeFromRouteData(t);
                            const s = function s2(e) {
                                const n = G(e);
                                if (!n) return null;
                                const t = new Es(n);
                                return {
                                    get selector() {
                                        return t.selector
                                    },
                                    get type() {
                                        return t.componentType
                                    },
                                    get inputs() {
                                        return t.inputs
                                    },
                                    get outputs() {
                                        return t.outputs
                                    },
                                    get ngContentSelectors() {
                                        return t.ngContentSelectors
                                    },
                                    get isStandalone() {
                                        return n.standalone
                                    },
                                    get isSignal() {
                                        return n.signals
                                    }
                                }
                            }(r.component);
                            if (s)
                                for (const {
                                        templateName: a
                                    }
                                    of s.inputs) t.activatedComponentRef.setInput(a, i[a]);
                            else this.unsubscribeFromRouteData(t)
                        });
                        this.outletDataSubscriptions.set(t, o)
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();

            function va(e, n, t) {
                if (t && e.shouldReuseRoute(n.value, t.value.snapshot)) {
                    const r = t.value;
                    r._futureSnapshot = n.value;
                    const o = function JB(e, n, t) {
                        return n.children.map(r => {
                            for (const o of t.children)
                                if (e.shouldReuseRoute(r.value, o.value.snapshot)) return va(e, r, o);
                            return va(e, r)
                        })
                    }(e, n, t);
                    return new ln(r, o)
                } {
                    if (e.shouldAttach(n.value)) {
                        const i = e.retrieve(n.value);
                        if (null !== i) {
                            const s = i.route;
                            return s.value._futureSnapshot = n.value, s.children = n.children.map(a => va(e, a)), s
                        }
                    }
                    const r = function e3(e) {
                            return new bi(new Ht(e.url), new Ht(e.params), new Ht(e.queryParams), new Ht(e.fragment), new Ht(e.data), e.outlet, e.component, e)
                        }(n.value),
                        o = n.children.map(i => va(e, i));
                    return new ln(r, o)
                }
            }
            const EI = "ngNavigationCancelingError";

            function MI(e, n) {
                const {
                    redirectTo: t,
                    navigationBehaviorOptions: r
                } = _i(n) ? {
                    redirectTo: n,
                    navigationBehaviorOptions: void 0
                } : n, o = II(!1, Ut.Redirect);
                return o.url = t, o.navigationBehaviorOptions = r, o
            }

            function II(e, n) {
                const t = new Error(`NavigationCancelingError: ${e||""}`);
                return t[EI] = !0, t.cancellationCode = n, t
            }

            function xI(e) {
                return !!e && e[EI]
            }
            let SI = (() => {
                class e {
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275cmp = Ln({
                        type: e,
                        selectors: [
                            ["ng-component"]
                        ],
                        standalone: !0,
                        features: [gc],
                        decls: 1,
                        vars: 0,
                        template: function(r, o) {
                            1 & r && Ce(0, "router-outlet")
                        },
                        dependencies: [Tg],
                        encapsulation: 2
                    })
                }
                return e
            })();

            function Ag(e) {
                const n = e.children && e.children.map(Ag),
                    t = n ? {
                        ...e,
                        children: n
                    } : {
                        ...e
                    };
                return !t.component && !t.loadComponent && (n || t.loadChildren) && t.outlet && t.outlet !== H && (t.component = SI), t
            }

            function Nn(e) {
                return e.outlet || H
            }

            function _a(e) {
                if (!e) return null;
                if (e.routeConfig?._injector) return e.routeConfig._injector;
                for (let n = e.parent; n; n = n.parent) {
                    const t = n.routeConfig;
                    if (t?._loadedInjector) return t._loadedInjector;
                    if (t?._injector) return t._injector
                }
                return null
            }
            class l3 {
                constructor(n, t, r, o, i) {
                    this.routeReuseStrategy = n, this.futureState = t, this.currState = r, this.forwardEvent = o, this.inputBindingEnabled = i
                }
                activate(n) {
                    const t = this.futureState._root,
                        r = this.currState ? this.currState._root : null;
                    this.deactivateChildRoutes(t, r, n), xg(this.futureState.root), this.activateChildRoutes(t, r, n)
                }
                deactivateChildRoutes(n, t, r) {
                    const o = wi(t);
                    n.children.forEach(i => {
                        const s = i.value.outlet;
                        this.deactivateRoutes(i, o[s], r), delete o[s]
                    }), Object.values(o).forEach(i => {
                        this.deactivateRouteAndItsChildren(i, r)
                    })
                }
                deactivateRoutes(n, t, r) {
                    const o = n.value,
                        i = t ? t.value : null;
                    if (o === i)
                        if (o.component) {
                            const s = r.getContext(o.outlet);
                            s && this.deactivateChildRoutes(n, t, s.children)
                        } else this.deactivateChildRoutes(n, t, r);
                    else i && this.deactivateRouteAndItsChildren(t, r)
                }
                deactivateRouteAndItsChildren(n, t) {
                    n.value.component && this.routeReuseStrategy.shouldDetach(n.value.snapshot) ? this.detachAndStoreRouteSubtree(n, t) : this.deactivateRouteAndOutlet(n, t)
                }
                detachAndStoreRouteSubtree(n, t) {
                    const r = t.getContext(n.value.outlet),
                        o = r && n.value.component ? r.children : t,
                        i = wi(n);
                    for (const s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
                    if (r && r.outlet) {
                        const s = r.outlet.detach(),
                            a = r.children.onOutletDeactivated();
                        this.routeReuseStrategy.store(n.value.snapshot, {
                            componentRef: s,
                            route: n,
                            contexts: a
                        })
                    }
                }
                deactivateRouteAndOutlet(n, t) {
                    const r = t.getContext(n.value.outlet),
                        o = r && n.value.component ? r.children : t,
                        i = wi(n);
                    for (const s of Object.values(i)) this.deactivateRouteAndItsChildren(s, o);
                    r && (r.outlet && (r.outlet.deactivate(), r.children.onOutletDeactivated()), r.attachRef = null, r.route = null)
                }
                activateChildRoutes(n, t, r) {
                    const o = wi(t);
                    n.children.forEach(i => {
                        this.activateRoutes(i, o[i.value.outlet], r), this.forwardEvent(new ZB(i.value.snapshot))
                    }), n.children.length && this.forwardEvent(new qB(n.value.snapshot))
                }
                activateRoutes(n, t, r) {
                    const o = n.value,
                        i = t ? t.value : null;
                    if (xg(o), o === i)
                        if (o.component) {
                            const s = r.getOrCreateContext(o.outlet);
                            this.activateChildRoutes(n, t, s.children)
                        } else this.activateChildRoutes(n, t, r);
                    else if (o.component) {
                        const s = r.getOrCreateContext(o.outlet);
                        if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
                            const a = this.routeReuseStrategy.retrieve(o.snapshot);
                            this.routeReuseStrategy.store(o.snapshot, null), s.children.onOutletReAttached(a.contexts), s.attachRef = a.componentRef, s.route = a.route.value, s.outlet && s.outlet.attach(a.componentRef, a.route.value), xg(a.route.value), this.activateChildRoutes(n, null, s.children)
                        } else {
                            const a = _a(o.snapshot);
                            s.attachRef = null, s.route = o, s.injector = a, s.outlet && s.outlet.activateWith(o, s.injector), this.activateChildRoutes(n, null, s.children)
                        }
                    } else this.activateChildRoutes(n, null, r)
                }
            }
            class TI {
                constructor(n) {
                    this.path = n, this.route = this.path[this.path.length - 1]
                }
            }
            class vu {
                constructor(n, t) {
                    this.component = n, this.route = t
                }
            }

            function c3(e, n, t) {
                const r = e._root;
                return Ca(r, n ? n._root : null, t, [r.value])
            }

            function Ei(e, n) {
                const t = Symbol(),
                    r = n.get(e, t);
                return r === t ? "function" != typeof e || function Wx(e) {
                    return null !== La(e)
                }(e) ? n.get(e) : e : r
            }

            function Ca(e, n, t, r, o = {
                canDeactivateChecks: [],
                canActivateChecks: []
            }) {
                const i = wi(n);
                return e.children.forEach(s => {
                    (function d3(e, n, t, r, o = {
                        canDeactivateChecks: [],
                        canActivateChecks: []
                    }) {
                        const i = e.value,
                            s = n ? n.value : null,
                            a = t ? t.getContext(e.value.outlet) : null;
                        if (s && i.routeConfig === s.routeConfig) {
                            const l = function f3(e, n, t) {
                                if ("function" == typeof t) return t(e, n);
                                switch (t) {
                                    case "pathParamsChange":
                                        return !no(e.url, n.url);
                                    case "pathParamsOrQueryParamsChange":
                                        return !no(e.url, n.url) || !Tn(e.queryParams, n.queryParams);
                                    case "always":
                                        return !0;
                                    case "paramsOrQueryParamsChange":
                                        return !Sg(e, n) || !Tn(e.queryParams, n.queryParams);
                                    default:
                                        return !Sg(e, n)
                                }
                            }(s, i, i.routeConfig.runGuardsAndResolvers);
                            l ? o.canActivateChecks.push(new TI(r)) : (i.data = s.data, i._resolvedData = s._resolvedData), Ca(e, n, i.component ? a ? a.children : null : t, r, o), l && a && a.outlet && a.outlet.isActivated && o.canDeactivateChecks.push(new vu(a.outlet.component, s))
                        } else s && Da(n, a, o), o.canActivateChecks.push(new TI(r)), Ca(e, null, i.component ? a ? a.children : null : t, r, o)
                    })(s, i[s.value.outlet], t, r.concat([s.value]), o), delete i[s.value.outlet]
                }), Object.entries(i).forEach(([s, a]) => Da(a, t.getContext(s), o)), o
            }

            function Da(e, n, t) {
                const r = wi(e),
                    o = e.value;
                Object.entries(r).forEach(([i, s]) => {
                    Da(s, o.component ? n ? n.children.getContext(i) : null : n, t)
                }), t.canDeactivateChecks.push(new vu(o.component && n && n.outlet && n.outlet.isActivated ? n.outlet.component : null, o))
            }

            function wa(e) {
                return "function" == typeof e
            }

            function AI(e) {
                return e instanceof iu || "EmptyError" === e?.name
            }
            const _u = Symbol("INITIAL_VALUE");

            function Mi() {
                return Zt(e => ug(e.map(n => n.pipe(pi(1), qM(_u)))).pipe(Z(n => {
                    for (const t of n)
                        if (!0 !== t) {
                            if (t === _u) return _u;
                            if (!1 === t || t instanceof yi) return t
                        } return !0
                }), Kn(n => n !== _u), pi(1)))
            }

            function NI(e) {
                return function Lx(...e) {
                    return gm(e)
                }(gt(n => {
                    if (_i(n)) throw MI(0, n)
                }), Z(n => !0 === n))
            }
            class Ng {
                constructor(n) {
                    this.segmentGroup = n || null
                }
            }
            class Og extends Error {
                constructor(n) {
                    super(), this.urlTree = n
                }
            }

            function Ii(e) {
                return su(new Ng(e))
            }
            class N3 {
                constructor(n, t) {
                    this.urlSerializer = n, this.urlTree = t
                }
                lineralizeSegments(n, t) {
                    let r = [],
                        o = t.root;
                    for (;;) {
                        if (r = r.concat(o.segments), 0 === o.numberOfChildren) return R(r);
                        if (o.numberOfChildren > 1 || !o.children[H]) return su(new C(4e3, !1));
                        o = o.children[H]
                    }
                }
                applyRedirectCommands(n, t, r) {
                    const o = this.applyRedirectCreateUrlTree(t, this.urlSerializer.parse(t), n, r);
                    if (t.startsWith("/")) throw new Og(o);
                    return o
                }
                applyRedirectCreateUrlTree(n, t, r, o) {
                    const i = this.createSegmentGroup(n, t.root, r, o);
                    return new yi(i, this.createQueryParams(t.queryParams, this.urlTree.queryParams), t.fragment)
                }
                createQueryParams(n, t) {
                    const r = {};
                    return Object.entries(n).forEach(([o, i]) => {
                        if ("string" == typeof i && i.startsWith(":")) {
                            const a = i.substring(1);
                            r[o] = t[a]
                        } else r[o] = i
                    }), r
                }
                createSegmentGroup(n, t, r, o) {
                    const i = this.createSegments(n, t.segments, r, o);
                    let s = {};
                    return Object.entries(t.children).forEach(([a, l]) => {
                        s[a] = this.createSegmentGroup(n, l, r, o)
                    }), new le(i, s)
                }
                createSegments(n, t, r, o) {
                    return t.map(i => i.path.startsWith(":") ? this.findPosParam(n, i, o) : this.findOrReturn(i, r))
                }
                findPosParam(n, t, r) {
                    const o = r[t.path.substring(1)];
                    if (!o) throw new C(4001, !1);
                    return o
                }
                findOrReturn(n, t) {
                    let r = 0;
                    for (const o of t) {
                        if (o.path === n.path) return t.splice(r), o;
                        r++
                    }
                    return n
                }
            }
            const Rg = {
                matched: !1,
                consumedSegments: [],
                remainingSegments: [],
                parameters: {},
                positionalParamSegments: {}
            };

            function O3(e, n, t, r, o) {
                const i = Pg(e, n, t);
                return i.matched ? (r = function n3(e, n) {
                    return e.providers && !e._injector && (e._injector = Yl(e.providers, n, `Route: ${e.path}`)), e._injector ?? n
                }(n, r), function S3(e, n, t, r) {
                    const o = n.canMatch;
                    return o && 0 !== o.length ? R(o.map(s => {
                        const a = Ei(s, e);
                        return Ir(function v3(e) {
                            return e && wa(e.canMatch)
                        }(a) ? a.canMatch(n, t) : dn(e, () => a(n, t)))
                    })).pipe(Mi(), NI()) : R(!0)
                }(r, n, t).pipe(Z(s => !0 === s ? i : {
                    ...Rg
                }))) : R(i)
            }

            function Pg(e, n, t) {
                if ("**" === n.path) return function R3(e) {
                    return {
                        matched: !0,
                        parameters: e.length > 0 ? XM(e).parameters : {},
                        consumedSegments: e,
                        remainingSegments: [],
                        positionalParamSegments: {}
                    }
                }(t);
                if ("" === n.path) return "full" === n.pathMatch && (e.hasChildren() || t.length > 0) ? {
                    ...Rg
                } : {
                    matched: !0,
                    consumedSegments: [],
                    remainingSegments: t,
                    parameters: {},
                    positionalParamSegments: {}
                };
                const o = (n.matcher || fB)(t, e, n);
                if (!o) return {
                    ...Rg
                };
                const i = {};
                Object.entries(o.posParams ?? {}).forEach(([a, l]) => {
                    i[a] = l.path
                });
                const s = o.consumed.length > 0 ? {
                    ...i,
                    ...o.consumed[o.consumed.length - 1].parameters
                } : i;
                return {
                    matched: !0,
                    consumedSegments: o.consumed,
                    remainingSegments: t.slice(o.consumed.length),
                    parameters: s,
                    positionalParamSegments: o.posParams ?? {}
                }
            }

            function OI(e, n, t, r) {
                return t.length > 0 && function F3(e, n, t) {
                    return t.some(r => Cu(e, n, r) && Nn(r) !== H)
                }(e, t, r) ? {
                    segmentGroup: new le(n, k3(r, new le(t, e.children))),
                    slicedSegments: []
                } : 0 === t.length && function L3(e, n, t) {
                    return t.some(r => Cu(e, n, r))
                }(e, t, r) ? {
                    segmentGroup: new le(e.segments, P3(e, t, r, e.children)),
                    slicedSegments: t
                } : {
                    segmentGroup: new le(e.segments, e.children),
                    slicedSegments: t
                }
            }

            function P3(e, n, t, r) {
                const o = {};
                for (const i of t)
                    if (Cu(e, n, i) && !r[Nn(i)]) {
                        const s = new le([], {});
                        o[Nn(i)] = s
                    } return {
                    ...r,
                    ...o
                }
            }

            function k3(e, n) {
                const t = {};
                t[H] = n;
                for (const r of e)
                    if ("" === r.path && Nn(r) !== H) {
                        const o = new le([], {});
                        t[Nn(r)] = o
                    } return t
            }

            function Cu(e, n, t) {
                return (!(e.hasChildren() || n.length > 0) || "full" !== t.pathMatch) && "" === t.path
            }
            class $3 {}
            class H3 {
                constructor(n, t, r, o, i, s, a) {
                    this.injector = n, this.configLoader = t, this.rootComponentType = r, this.config = o, this.urlTree = i, this.paramsInheritanceStrategy = s, this.urlSerializer = a, this.applyRedirects = new N3(this.urlSerializer, this.urlTree), this.absoluteRedirectCount = 0, this.allowRedirects = !0
                }
                noMatchError(n) {
                    return new C(4002, `'${n.segmentGroup}'`)
                }
                recognize() {
                    const n = OI(this.urlTree.root, [], [], this.config).segmentGroup;
                    return this.match(n).pipe(Z(t => {
                        const r = new Mg([], Object.freeze({}), Object.freeze({
                                ...this.urlTree.queryParams
                            }), this.urlTree.fragment, {}, H, this.rootComponentType, null, {}),
                            o = new ln(r, t),
                            i = new CI("", o),
                            s = function OB(e, n, t = null, r = null) {
                                return cI(lI(e), n, t, r)
                            }(r, [], this.urlTree.queryParams, this.urlTree.fragment);
                        return s.queryParams = this.urlTree.queryParams, i.url = this.urlSerializer.serialize(s), this.inheritParamsAndData(i._root, null), {
                            state: i,
                            tree: s
                        }
                    }))
                }
                match(n) {
                    return this.processSegmentGroup(this.injector, this.config, n, H).pipe(gi(r => {
                        if (r instanceof Og) return this.urlTree = r.urlTree, this.match(r.urlTree.root);
                        throw r instanceof Ng ? this.noMatchError(r) : r
                    }))
                }
                inheritParamsAndData(n, t) {
                    const r = n.value,
                        o = Eg(r, t, this.paramsInheritanceStrategy);
                    r.params = Object.freeze(o.params), r.data = Object.freeze(o.data), n.children.forEach(i => this.inheritParamsAndData(i, r))
                }
                processSegmentGroup(n, t, r, o) {
                    return 0 === r.segments.length && r.hasChildren() ? this.processChildren(n, t, r) : this.processSegment(n, t, r, r.segments, o, !0).pipe(Z(i => i instanceof ln ? [i] : []))
                }
                processChildren(n, t, r) {
                    const o = [];
                    for (const i of Object.keys(r.children)) "primary" === i ? o.unshift(i) : o.push(i);
                    return Fe(o).pipe(di(i => {
                        const s = r.children[i],
                            a = function s3(e, n) {
                                const t = e.filter(r => Nn(r) === n);
                                return t.push(...e.filter(r => Nn(r) !== n)), t
                            }(t, i);
                        return this.processSegmentGroup(n, a, s, i)
                    }), function cB(e, n) {
                        return Le(function lB(e, n, t, r, o) {
                            return (i, s) => {
                                let a = t,
                                    l = n,
                                    c = 0;
                                i.subscribe(Oe(s, u => {
                                    const d = c++;
                                    l = a ? e(l, u, d) : (a = !0, u), r && s.next(l)
                                }, o && (() => {
                                    a && s.next(l), s.complete()
                                })))
                            }
                        }(e, n, arguments.length >= 2, !0))
                    }((i, s) => (i.push(...s), i)), au(null), function uB(e, n) {
                        const t = arguments.length >= 2;
                        return r => r.pipe(e ? Kn((o, i) => e(o, i, r)) : tr, hg(1), t ? au(n) : WM(() => new iu))
                    }(), it(i => {
                        if (null === i) return Ii(r);
                        const s = RI(i);
                        return function z3(e) {
                            e.sort((n, t) => n.value.outlet === H ? -1 : t.value.outlet === H ? 1 : n.value.outlet.localeCompare(t.value.outlet))
                        }(s), R(s)
                    }))
                }
                processSegment(n, t, r, o, i, s) {
                    return Fe(t).pipe(di(a => this.processSegmentAgainstRoute(a._injector ?? n, t, a, r, o, i, s).pipe(gi(l => {
                        if (l instanceof Ng) return R(null);
                        throw l
                    }))), Mr(a => !!a), gi(a => {
                        if (AI(a)) return function j3(e, n, t) {
                            return 0 === n.length && !e.children[t]
                        }(r, o, i) ? R(new $3) : Ii(r);
                        throw a
                    }))
                }
                processSegmentAgainstRoute(n, t, r, o, i, s, a) {
                    return function V3(e, n, t, r) {
                        return !!(Nn(e) === r || r !== H && Cu(n, t, e)) && Pg(n, e, t).matched
                    }(r, o, i, s) ? void 0 === r.redirectTo ? this.matchSegmentAgainstRoute(n, o, r, i, s) : this.allowRedirects && a ? this.expandSegmentAgainstRouteUsingRedirect(n, o, t, r, i, s) : Ii(o) : Ii(o)
                }
                expandSegmentAgainstRouteUsingRedirect(n, t, r, o, i, s) {
                    const {
                        matched: a,
                        consumedSegments: l,
                        positionalParamSegments: c,
                        remainingSegments: u
                    } = Pg(t, o, i);
                    if (!a) return Ii(t);
                    o.redirectTo.startsWith("/") && (this.absoluteRedirectCount++, this.absoluteRedirectCount > 31 && (this.allowRedirects = !1));
                    const d = this.applyRedirects.applyRedirectCommands(l, o.redirectTo, c);
                    return this.applyRedirects.lineralizeSegments(o, d).pipe(it(f => this.processSegment(n, r, t, f.concat(u), s, !1)))
                }
                matchSegmentAgainstRoute(n, t, r, o, i) {
                    const s = O3(t, r, o, n);
                    return "**" === r.path && (t.children = {}), s.pipe(Zt(a => a.matched ? this.getChildConfig(n = r._injector ?? n, r, o).pipe(Zt(({
                        routes: l
                    }) => {
                        const c = r._loadedInjector ?? n,
                            {
                                consumedSegments: u,
                                remainingSegments: d,
                                parameters: f
                            } = a,
                            h = new Mg(u, f, Object.freeze({
                                ...this.urlTree.queryParams
                            }), this.urlTree.fragment, function q3(e) {
                                return e.data || {}
                            }(r), Nn(r), r.component ?? r._loadedComponent ?? null, r, function W3(e) {
                                return e.resolve || {}
                            }(r)),
                            {
                                segmentGroup: p,
                                slicedSegments: g
                            } = OI(t, u, d, l);
                        if (0 === g.length && p.hasChildren()) return this.processChildren(c, l, p).pipe(Z(y => null === y ? null : new ln(h, y)));
                        if (0 === l.length && 0 === g.length) return R(new ln(h, []));
                        const m = Nn(r) === i;
                        return this.processSegment(c, l, p, g, m ? H : i, !0).pipe(Z(y => new ln(h, y instanceof ln ? [y] : [])))
                    })) : Ii(t)))
                }
                getChildConfig(n, t, r) {
                    return t.children ? R({
                        routes: t.children,
                        injector: n
                    }) : t.loadChildren ? void 0 !== t._loadedRoutes ? R({
                        routes: t._loadedRoutes,
                        injector: t._loadedInjector
                    }) : function x3(e, n, t, r) {
                        const o = n.canLoad;
                        return void 0 === o || 0 === o.length ? R(!0) : R(o.map(s => {
                            const a = Ei(s, e);
                            return Ir(function p3(e) {
                                return e && wa(e.canLoad)
                            }(a) ? a.canLoad(n, t) : dn(e, () => a(n, t)))
                        })).pipe(Mi(), NI())
                    }(n, t, r).pipe(it(o => o ? this.configLoader.loadChildren(n, t).pipe(gt(i => {
                        t._loadedRoutes = i.routes, t._loadedInjector = i.injector
                    })) : function A3(e) {
                        return su(II(!1, Ut.GuardRejected))
                    }())) : R({
                        routes: [],
                        injector: n
                    })
                }
            }

            function G3(e) {
                const n = e.value.routeConfig;
                return n && "" === n.path
            }

            function RI(e) {
                const n = [],
                    t = new Set;
                for (const r of e) {
                    if (!G3(r)) {
                        n.push(r);
                        continue
                    }
                    const o = n.find(i => r.value.routeConfig === i.value.routeConfig);
                    void 0 !== o ? (o.children.push(...r.children), t.add(o)) : n.push(r)
                }
                for (const r of t) {
                    const o = RI(r.children);
                    n.push(new ln(r.value, o))
                }
                return n.filter(r => !t.has(r))
            }

            function PI(e) {
                const n = e.children.map(t => PI(t)).flat();
                return [e, ...n]
            }

            function kg(e) {
                return Zt(n => {
                    const t = e(n);
                    return t ? Fe(t).pipe(Z(() => n)) : R(n)
                })
            }
            let kI = (() => {
                    class e {
                        buildTitle(t) {
                            let r, o = t.root;
                            for (; void 0 !== o;) r = this.getResolvedTitleForRoute(o) ?? r, o = o.children.find(i => i.outlet === H);
                            return r
                        }
                        getResolvedTitleForRoute(t) {
                            return t.data[da]
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: () => w(J3),
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                J3 = (() => {
                    class e extends kI {
                        constructor(t) {
                            super(), this.title = t
                        }
                        updateTitle(t) {
                            const r = this.buildTitle(t);
                            void 0 !== r && this.title.setTitle(r)
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(x(Nj))
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            const xi = new M("", {
                    providedIn: "root",
                    factory: () => ({})
                }),
                Si = new M("");
            let Fg = (() => {
                class e {
                    constructor() {
                        this.componentLoaders = new WeakMap, this.childrenLoaders = new WeakMap, this.compiler = w(fb)
                    }
                    loadComponent(t) {
                        if (this.componentLoaders.get(t)) return this.componentLoaders.get(t);
                        if (t._loadedComponent) return R(t._loadedComponent);
                        this.onLoadStartListener && this.onLoadStartListener(t);
                        const r = Ir(t.loadComponent()).pipe(Z(FI), gt(i => {
                                this.onLoadEndListener && this.onLoadEndListener(t), t._loadedComponent = i
                            }), aa(() => {
                                this.componentLoaders.delete(t)
                            })),
                            o = new GM(r, () => new ze).pipe(fg());
                        return this.componentLoaders.set(t, o), o
                    }
                    loadChildren(t, r) {
                        if (this.childrenLoaders.get(r)) return this.childrenLoaders.get(r);
                        if (r._loadedRoutes) return R({
                            routes: r._loadedRoutes,
                            injector: r._loadedInjector
                        });
                        this.onLoadStartListener && this.onLoadStartListener(r);
                        const i = function eH(e, n, t, r) {
                                return Ir(e.loadChildren()).pipe(Z(FI), it(o => o instanceof bC || Array.isArray(o) ? R(o) : Fe(n.compileModuleAsync(o))), Z(o => {
                                    r && r(e);
                                    let i, s, a = !1;
                                    return Array.isArray(o) ? (s = o, !0) : (i = o.create(t).injector, s = i.get(Si, [], {
                                        optional: !0,
                                        self: !0
                                    }).flat()), {
                                        routes: s.map(Ag),
                                        injector: i
                                    }
                                }))
                            }(r, this.compiler, t, this.onLoadEndListener).pipe(aa(() => {
                                this.childrenLoaders.delete(r)
                            })),
                            s = new GM(i, () => new ze).pipe(fg());
                        return this.childrenLoaders.set(r, s), s
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function FI(e) {
                return function tH(e) {
                    return e && "object" == typeof e && "default" in e
                }(e) ? e.default : e
            }
            let Lg = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: () => w(nH),
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                nH = (() => {
                    class e {
                        shouldProcessUrl(t) {
                            return !0
                        }
                        extract(t) {
                            return t
                        }
                        merge(t, r) {
                            return t
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            const LI = new M(""),
                VI = new M("");

            function rH(e, n, t) {
                const r = e.get(VI),
                    o = e.get(Et);
                return e.get(J).runOutsideAngular(() => {
                    if (!o.startViewTransition || r.skipNextTransition) return r.skipNextTransition = !1, Promise.resolve();
                    let i;
                    const s = new Promise(c => {
                            i = c
                        }),
                        a = o.startViewTransition(() => (i(), function oH(e) {
                            return new Promise(n => {
                                j_(n, {
                                    injector: e
                                })
                            })
                        }(e))),
                        {
                            onViewTransitionCreated: l
                        } = r;
                    return l && dn(e, () => l({
                        transition: a,
                        from: n,
                        to: t
                    })), s
                })
            }
            let Du = (() => {
                class e {
                    get hasRequestedNavigation() {
                        return 0 !== this.navigationId
                    }
                    constructor() {
                        this.currentNavigation = null, this.currentTransition = null, this.lastSuccessfulNavigation = null, this.events = new ze, this.transitionAbortSubject = new ze, this.configLoader = w(Fg), this.environmentInjector = w(vt), this.urlSerializer = w(vi), this.rootContexts = w(ya), this.location = w(Qs), this.inputBindingEnabled = null !== w(yu, {
                            optional: !0
                        }), this.titleStrategy = w(kI), this.options = w(xi, {
                            optional: !0
                        }) || {}, this.paramsInheritanceStrategy = this.options.paramsInheritanceStrategy || "emptyOnly", this.urlHandlingStrategy = w(Lg), this.createViewTransition = w(LI, {
                            optional: !0
                        }), this.navigationId = 0, this.afterPreactivation = () => R(void 0), this.rootComponentType = null, this.configLoader.onLoadEndListener = o => this.events.next(new zB(o)), this.configLoader.onLoadStartListener = o => this.events.next(new HB(o))
                    }
                    complete() {
                        this.transitions?.complete()
                    }
                    handleNavigationRequest(t) {
                        const r = ++this.navigationId;
                        this.transitions?.next({
                            ...this.transitions.value,
                            ...t,
                            id: r
                        })
                    }
                    setupNavigations(t, r, o) {
                        return this.transitions = new Ht({
                            id: 0,
                            currentUrlTree: r,
                            currentRawUrl: r,
                            extractedUrl: this.urlHandlingStrategy.extract(r),
                            urlAfterRedirects: this.urlHandlingStrategy.extract(r),
                            rawUrl: r,
                            extras: {},
                            resolve: null,
                            reject: null,
                            promise: Promise.resolve(!0),
                            source: ma,
                            restoredState: null,
                            currentSnapshot: o.snapshot,
                            targetSnapshot: null,
                            currentRouterState: o,
                            targetRouterState: null,
                            guards: {
                                canActivateChecks: [],
                                canDeactivateChecks: []
                            },
                            guardsResult: null
                        }), this.transitions.pipe(Kn(i => 0 !== i.id), Z(i => ({
                            ...i,
                            extractedUrl: this.urlHandlingStrategy.extract(i.rawUrl)
                        })), Zt(i => {
                            let s = !1,
                                a = !1;
                            return R(i).pipe(Zt(l => {
                                if (this.navigationId > i.id) return this.cancelNavigationTransition(i, "", Ut.SupersededByNewNavigation), an;
                                this.currentTransition = i, this.currentNavigation = {
                                    id: l.id,
                                    initialUrl: l.rawUrl,
                                    extractedUrl: l.extractedUrl,
                                    trigger: l.source,
                                    extras: l.extras,
                                    previousNavigation: this.lastSuccessfulNavigation ? {
                                        ...this.lastSuccessfulNavigation,
                                        previousNavigation: null
                                    } : null
                                };
                                const c = !t.navigated || this.isUpdatingInternalState() || this.isUpdatedBrowserUrl();
                                if (!c && "reload" !== (l.extras.onSameUrlNavigation ?? t.onSameUrlNavigation)) {
                                    const d = "";
                                    return this.events.next(new Di(l.id, this.urlSerializer.serialize(l.rawUrl), d, gu.IgnoredSameUrlNavigation)), l.resolve(null), an
                                }
                                if (this.urlHandlingStrategy.shouldProcessUrl(l.rawUrl)) return R(l).pipe(Zt(d => {
                                    const f = this.transitions?.getValue();
                                    return this.events.next(new pu(d.id, this.urlSerializer.serialize(d.extractedUrl), d.source, d.restoredState)), f !== this.transitions?.getValue() ? an : Promise.resolve(d)
                                }), function Z3(e, n, t, r, o, i) {
                                    return it(s => function U3(e, n, t, r, o, i, s = "emptyOnly") {
                                        return new H3(e, n, t, r, o, s, i).recognize()
                                    }(e, n, t, r, s.extractedUrl, o, i).pipe(Z(({
                                        state: a,
                                        tree: l
                                    }) => ({
                                        ...s,
                                        targetSnapshot: a,
                                        urlAfterRedirects: l
                                    }))))
                                }(this.environmentInjector, this.configLoader, this.rootComponentType, t.config, this.urlSerializer, this.paramsInheritanceStrategy), gt(d => {
                                    i.targetSnapshot = d.targetSnapshot, i.urlAfterRedirects = d.urlAfterRedirects, this.currentNavigation = {
                                        ...this.currentNavigation,
                                        finalUrl: d.urlAfterRedirects
                                    };
                                    const f = new gI(d.id, this.urlSerializer.serialize(d.extractedUrl), this.urlSerializer.serialize(d.urlAfterRedirects), d.targetSnapshot);
                                    this.events.next(f)
                                }));
                                if (c && this.urlHandlingStrategy.shouldProcessUrl(l.currentRawUrl)) {
                                    const {
                                        id: d,
                                        extractedUrl: f,
                                        source: h,
                                        restoredState: p,
                                        extras: g
                                    } = l, m = new pu(d, this.urlSerializer.serialize(f), h, p);
                                    this.events.next(m);
                                    const y = _I(this.rootComponentType).snapshot;
                                    return this.currentTransition = i = {
                                        ...l,
                                        targetSnapshot: y,
                                        urlAfterRedirects: f,
                                        extras: {
                                            ...g,
                                            skipLocationChange: !1,
                                            replaceUrl: !1
                                        }
                                    }, this.currentNavigation.finalUrl = f, R(i)
                                } {
                                    const d = "";
                                    return this.events.next(new Di(l.id, this.urlSerializer.serialize(l.extractedUrl), d, gu.IgnoredByUrlHandlingStrategy)), l.resolve(null), an
                                }
                            }), gt(l => {
                                const c = new jB(l.id, this.urlSerializer.serialize(l.extractedUrl), this.urlSerializer.serialize(l.urlAfterRedirects), l.targetSnapshot);
                                this.events.next(c)
                            }), Z(l => (this.currentTransition = i = {
                                ...l,
                                guards: c3(l.targetSnapshot, l.currentSnapshot, this.rootContexts)
                            }, i)), function _3(e, n) {
                                return it(t => {
                                    const {
                                        targetSnapshot: r,
                                        currentSnapshot: o,
                                        guards: {
                                            canActivateChecks: i,
                                            canDeactivateChecks: s
                                        }
                                    } = t;
                                    return 0 === s.length && 0 === i.length ? R({
                                        ...t,
                                        guardsResult: !0
                                    }) : function C3(e, n, t, r) {
                                        return Fe(e).pipe(it(o => function I3(e, n, t, r, o) {
                                            const i = n && n.routeConfig ? n.routeConfig.canDeactivate : null;
                                            return i && 0 !== i.length ? R(i.map(a => {
                                                const l = _a(n) ?? o,
                                                    c = Ei(a, l);
                                                return Ir(function y3(e) {
                                                    return e && wa(e.canDeactivate)
                                                }(c) ? c.canDeactivate(e, n, t, r) : dn(l, () => c(e, n, t, r))).pipe(Mr())
                                            })).pipe(Mi()) : R(!0)
                                        }(o.component, o.route, t, n, r)), Mr(o => !0 !== o, !0))
                                    }(s, r, o, e).pipe(it(a => a && function h3(e) {
                                        return "boolean" == typeof e
                                    }(a) ? function D3(e, n, t, r) {
                                        return Fe(n).pipe(di(o => dg(function b3(e, n) {
                                            return null !== e && n && n(new GB(e)), R(!0)
                                        }(o.route.parent, r), function w3(e, n) {
                                            return null !== e && n && n(new WB(e)), R(!0)
                                        }(o.route, r), function M3(e, n, t) {
                                            const r = n[n.length - 1],
                                                i = n.slice(0, n.length - 1).reverse().map(s => function u3(e) {
                                                    const n = e.routeConfig ? e.routeConfig.canActivateChild : null;
                                                    return n && 0 !== n.length ? {
                                                        node: e,
                                                        guards: n
                                                    } : null
                                                }(s)).filter(s => null !== s).map(s => zM(() => R(s.guards.map(l => {
                                                    const c = _a(s.node) ?? t,
                                                        u = Ei(l, c);
                                                    return Ir(function m3(e) {
                                                        return e && wa(e.canActivateChild)
                                                    }(u) ? u.canActivateChild(r, e) : dn(c, () => u(r, e))).pipe(Mr())
                                                })).pipe(Mi())));
                                            return R(i).pipe(Mi())
                                        }(e, o.path, t), function E3(e, n, t) {
                                            const r = n.routeConfig ? n.routeConfig.canActivate : null;
                                            if (!r || 0 === r.length) return R(!0);
                                            const o = r.map(i => zM(() => {
                                                const s = _a(n) ?? t,
                                                    a = Ei(i, s);
                                                return Ir(function g3(e) {
                                                    return e && wa(e.canActivate)
                                                }(a) ? a.canActivate(n, e) : dn(s, () => a(n, e))).pipe(Mr())
                                            }));
                                            return R(o).pipe(Mi())
                                        }(e, o.route, t))), Mr(o => !0 !== o, !0))
                                    }(r, i, e, n) : R(a)), Z(a => ({
                                        ...t,
                                        guardsResult: a
                                    })))
                                })
                            }(this.environmentInjector, l => this.events.next(l)), gt(l => {
                                if (i.guardsResult = l.guardsResult, _i(l.guardsResult)) throw MI(0, l.guardsResult);
                                const c = new $B(l.id, this.urlSerializer.serialize(l.extractedUrl), this.urlSerializer.serialize(l.urlAfterRedirects), l.targetSnapshot, !!l.guardsResult);
                                this.events.next(c)
                            }), Kn(l => !!l.guardsResult || (this.cancelNavigationTransition(l, "", Ut.GuardRejected), !1)), kg(l => {
                                if (l.guards.canActivateChecks.length) return R(l).pipe(gt(c => {
                                    const u = new UB(c.id, this.urlSerializer.serialize(c.extractedUrl), this.urlSerializer.serialize(c.urlAfterRedirects), c.targetSnapshot);
                                    this.events.next(u)
                                }), Zt(c => {
                                    let u = !1;
                                    return R(c).pipe(function Q3(e, n) {
                                        return it(t => {
                                            const {
                                                targetSnapshot: r,
                                                guards: {
                                                    canActivateChecks: o
                                                }
                                            } = t;
                                            if (!o.length) return R(t);
                                            const i = new Set(o.map(l => l.route)),
                                                s = new Set;
                                            for (const l of i)
                                                if (!s.has(l))
                                                    for (const c of PI(l)) s.add(c);
                                            let a = 0;
                                            return Fe(s).pipe(di(l => i.has(l) ? function Y3(e, n, t, r) {
                                                const o = e.routeConfig,
                                                    i = e._resolve;
                                                return void 0 !== o?.title && !wI(o) && (i[da] = o.title),
                                                    function X3(e, n, t, r) {
                                                        const o = pg(e);
                                                        if (0 === o.length) return R({});
                                                        const i = {};
                                                        return Fe(o).pipe(it(s => function K3(e, n, t, r) {
                                                            const o = _a(n) ?? r,
                                                                i = Ei(e, o);
                                                            return Ir(i.resolve ? i.resolve(n, t) : dn(o, () => i(n, t)))
                                                        }(e[s], n, t, r).pipe(Mr(), gt(a => {
                                                            i[s] = a
                                                        }))), hg(1), ZM(i), gi(s => AI(s) ? an : su(s)))
                                                    }(i, e, n, r).pipe(Z(s => (e._resolvedData = s, e.data = Eg(e, e.parent, t).resolve, null)))
                                            }(l, r, e, n) : (l.data = Eg(l, l.parent, e).resolve, R(void 0))), gt(() => a++), hg(1), it(l => a === s.size ? R(t) : an))
                                        })
                                    }(this.paramsInheritanceStrategy, this.environmentInjector), gt({
                                        next: () => u = !0,
                                        complete: () => {
                                            u || this.cancelNavigationTransition(c, "", Ut.NoDataFromResolver)
                                        }
                                    }))
                                }), gt(c => {
                                    const u = new BB(c.id, this.urlSerializer.serialize(c.extractedUrl), this.urlSerializer.serialize(c.urlAfterRedirects), c.targetSnapshot);
                                    this.events.next(u)
                                }))
                            }), kg(l => {
                                const c = u => {
                                    const d = [];
                                    u.routeConfig?.loadComponent && !u.routeConfig._loadedComponent && d.push(this.configLoader.loadComponent(u.routeConfig).pipe(gt(f => {
                                        u.component = f
                                    }), Z(() => {})));
                                    for (const f of u.children) d.push(...c(f));
                                    return d
                                };
                                return ug(c(l.targetSnapshot.root)).pipe(au(null), pi(1))
                            }), kg(() => this.afterPreactivation()), Zt(() => {
                                const {
                                    currentSnapshot: l,
                                    targetSnapshot: c
                                } = i, u = this.createViewTransition?.(this.environmentInjector, l.root, c.root);
                                return u ? Fe(u).pipe(Z(() => i)) : R(i)
                            }), Z(l => {
                                const c = function KB(e, n, t) {
                                    const r = va(e, n._root, t ? t._root : void 0);
                                    return new vI(r, n)
                                }(t.routeReuseStrategy, l.targetSnapshot, l.currentRouterState);
                                return this.currentTransition = i = {
                                    ...l,
                                    targetRouterState: c
                                }, this.currentNavigation.targetRouterState = c, i
                            }), gt(() => {
                                this.events.next(new Cg)
                            }), ((e, n, t, r) => Z(o => (new l3(n, o.targetRouterState, o.currentRouterState, t, r).activate(e), o)))(this.rootContexts, t.routeReuseStrategy, l => this.events.next(l), this.inputBindingEnabled), pi(1), gt({
                                next: l => {
                                    s = !0, this.lastSuccessfulNavigation = this.currentNavigation, this.events.next(new Jn(l.id, this.urlSerializer.serialize(l.extractedUrl), this.urlSerializer.serialize(l.urlAfterRedirects))), this.titleStrategy?.updateTitle(l.targetRouterState.snapshot), l.resolve(!0)
                                },
                                complete: () => {
                                    s = !0
                                }
                            }), QM(this.transitionAbortSubject.pipe(gt(l => {
                                throw l
                            }))), aa(() => {
                                !s && !a && this.cancelNavigationTransition(i, "", Ut.SupersededByNewNavigation), this.currentTransition?.id === i.id && (this.currentNavigation = null, this.currentTransition = null)
                            }), gi(l => {
                                if (a = !0, xI(l)) this.events.next(new Ci(i.id, this.urlSerializer.serialize(i.extractedUrl), l.message, l.cancellationCode)),
                                    function t3(e) {
                                        return xI(e) && _i(e.url)
                                    }(l) ? this.events.next(new Dg(l.url)) : i.resolve(!1);
                                else {
                                    this.events.next(new mu(i.id, this.urlSerializer.serialize(i.extractedUrl), l, i.targetSnapshot ?? void 0));
                                    try {
                                        i.resolve(t.errorHandler(l))
                                    } catch (c) {
                                        this.options.resolveNavigationPromiseOnError ? i.resolve(!1) : i.reject(c)
                                    }
                                }
                                return an
                            }))
                        }))
                    }
                    cancelNavigationTransition(t, r, o) {
                        const i = new Ci(t.id, this.urlSerializer.serialize(t.extractedUrl), r, o);
                        this.events.next(i), t.resolve(!1)
                    }
                    isUpdatingInternalState() {
                        return this.currentTransition?.extractedUrl.toString() !== this.currentTransition?.currentUrlTree.toString()
                    }
                    isUpdatedBrowserUrl() {
                        return this.urlHandlingStrategy.extract(this.urlSerializer.parse(this.location.path(!0))).toString() !== this.currentTransition?.extractedUrl.toString() && !this.currentTransition?.extras.skipLocationChange
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();

            function iH(e) {
                return e !== ma
            }
            let sH = (() => {
                class e {
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: () => w(lH),
                        providedIn: "root"
                    })
                }
                return e
            })();
            class aH {
                shouldDetach(n) {
                    return !1
                }
                store(n, t) {}
                shouldAttach(n) {
                    return !1
                }
                retrieve(n) {
                    return null
                }
                shouldReuseRoute(n, t) {
                    return n.routeConfig === t.routeConfig
                }
            }
            let lH = (() => {
                    class e extends aH {
                        static #e = this.\u0275fac = (() => {
                            let t;
                            return function(o) {
                                return (t || (t = Ge(e)))(o || e)
                            }
                        })();
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                jI = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: () => w(cH),
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                cH = (() => {
                    class e extends jI {
                        constructor() {
                            super(...arguments), this.location = w(Qs), this.urlSerializer = w(vi), this.options = w(xi, {
                                optional: !0
                            }) || {}, this.canceledNavigationResolution = this.options.canceledNavigationResolution || "replace", this.urlHandlingStrategy = w(Lg), this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.currentUrlTree = new yi, this.rawUrlTree = this.currentUrlTree, this.currentPageId = 0, this.lastSuccessfulId = -1, this.routerState = _I(null), this.stateMemento = this.createStateMemento()
                        }
                        getCurrentUrlTree() {
                            return this.currentUrlTree
                        }
                        getRawUrlTree() {
                            return this.rawUrlTree
                        }
                        restoredState() {
                            return this.location.getState()
                        }
                        get browserPageId() {
                            return "computed" !== this.canceledNavigationResolution ? this.currentPageId : this.restoredState()?.\u0275routerPageId ?? this.currentPageId
                        }
                        getRouterState() {
                            return this.routerState
                        }
                        createStateMemento() {
                            return {
                                rawUrlTree: this.rawUrlTree,
                                currentUrlTree: this.currentUrlTree,
                                routerState: this.routerState
                            }
                        }
                        registerNonRouterCurrentEntryChangeListener(t) {
                            return this.location.subscribe(r => {
                                "popstate" === r.type && t(r.url, r.state)
                            })
                        }
                        handleRouterEvent(t, r) {
                            if (t instanceof pu) this.stateMemento = this.createStateMemento();
                            else if (t instanceof Di) this.rawUrlTree = r.initialUrl;
                            else if (t instanceof gI) {
                                if ("eager" === this.urlUpdateStrategy && !r.extras.skipLocationChange) {
                                    const o = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl);
                                    this.setBrowserUrl(o, r)
                                }
                            } else t instanceof Cg ? (this.currentUrlTree = r.finalUrl, this.rawUrlTree = this.urlHandlingStrategy.merge(r.finalUrl, r.initialUrl), this.routerState = r.targetRouterState, "deferred" === this.urlUpdateStrategy && (r.extras.skipLocationChange || this.setBrowserUrl(this.rawUrlTree, r))) : t instanceof Ci && (t.code === Ut.GuardRejected || t.code === Ut.NoDataFromResolver) ? this.restoreHistory(r) : t instanceof mu ? this.restoreHistory(r, !0) : t instanceof Jn && (this.lastSuccessfulId = t.id, this.currentPageId = this.browserPageId)
                        }
                        setBrowserUrl(t, r) {
                            const o = this.urlSerializer.serialize(t);
                            if (this.location.isCurrentPathEqualTo(o) || r.extras.replaceUrl) {
                                const s = {
                                    ...r.extras.state,
                                    ...this.generateNgRouterState(r.id, this.browserPageId)
                                };
                                this.location.replaceState(o, "", s)
                            } else {
                                const i = {
                                    ...r.extras.state,
                                    ...this.generateNgRouterState(r.id, this.browserPageId + 1)
                                };
                                this.location.go(o, "", i)
                            }
                        }
                        restoreHistory(t, r = !1) {
                            if ("computed" === this.canceledNavigationResolution) {
                                const i = this.currentPageId - this.browserPageId;
                                0 !== i ? this.location.historyGo(i) : this.currentUrlTree === t.finalUrl && 0 === i && (this.resetState(t), this.resetUrlToCurrentUrlTree())
                            } else "replace" === this.canceledNavigationResolution && (r && this.resetState(t), this.resetUrlToCurrentUrlTree())
                        }
                        resetState(t) {
                            this.routerState = this.stateMemento.routerState, this.currentUrlTree = this.stateMemento.currentUrlTree, this.rawUrlTree = this.urlHandlingStrategy.merge(this.currentUrlTree, t.finalUrl ?? this.rawUrlTree)
                        }
                        resetUrlToCurrentUrlTree() {
                            this.location.replaceState(this.urlSerializer.serialize(this.rawUrlTree), "", this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId))
                        }
                        generateNgRouterState(t, r) {
                            return "computed" === this.canceledNavigationResolution ? {
                                navigationId: t,
                                \u0275routerPageId: r
                            } : {
                                navigationId: t
                            }
                        }
                        static #e = this.\u0275fac = (() => {
                            let t;
                            return function(o) {
                                return (t || (t = Ge(e)))(o || e)
                            }
                        })();
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            var ba = function(e) {
                return e[e.COMPLETE = 0] = "COMPLETE", e[e.FAILED = 1] = "FAILED", e[e.REDIRECTING = 2] = "REDIRECTING", e
            }(ba || {});

            function $I(e, n) {
                e.events.pipe(Kn(t => t instanceof Jn || t instanceof Ci || t instanceof mu || t instanceof Di), Z(t => t instanceof Jn || t instanceof Di ? ba.COMPLETE : t instanceof Ci && (t.code === Ut.Redirect || t.code === Ut.SupersededByNewNavigation) ? ba.REDIRECTING : ba.FAILED), Kn(t => t !== ba.REDIRECTING), pi(1)).subscribe(() => {
                    n()
                })
            }

            function uH(e) {
                throw e
            }
            const dH = {
                    paths: "exact",
                    fragment: "ignored",
                    matrixParams: "ignored",
                    queryParams: "exact"
                },
                fH = {
                    paths: "subset",
                    fragment: "ignored",
                    matrixParams: "ignored",
                    queryParams: "subset"
                };
            let cn = (() => {
                class e {
                    get currentUrlTree() {
                        return this.stateManager.getCurrentUrlTree()
                    }
                    get rawUrlTree() {
                        return this.stateManager.getRawUrlTree()
                    }
                    get events() {
                        return this._events
                    }
                    get routerState() {
                        return this.stateManager.getRouterState()
                    }
                    constructor() {
                        this.disposed = !1, this.isNgZoneEnabled = !1, this.console = w(nb), this.stateManager = w(jI), this.options = w(xi, {
                            optional: !0
                        }) || {}, this.pendingTasks = w(dr), this.urlUpdateStrategy = this.options.urlUpdateStrategy || "deferred", this.navigationTransitions = w(Du), this.urlSerializer = w(vi), this.location = w(Qs), this.urlHandlingStrategy = w(Lg), this._events = new ze, this.errorHandler = this.options.errorHandler || uH, this.navigated = !1, this.routeReuseStrategy = w(sH), this.onSameUrlNavigation = this.options.onSameUrlNavigation || "ignore", this.config = w(Si, {
                            optional: !0
                        })?.flat() ?? [], this.componentInputBindingEnabled = !!w(yu, {
                            optional: !0
                        }), this.eventsSubscription = new st, this.isNgZoneEnabled = w(J) instanceof J && J.isInAngularZone(), this.resetConfig(this.config), this.navigationTransitions.setupNavigations(this, this.currentUrlTree, this.routerState).subscribe({
                            error: t => {
                                this.console.warn(t)
                            }
                        }), this.subscribeToNavigationEvents()
                    }
                    subscribeToNavigationEvents() {
                        const t = this.navigationTransitions.events.subscribe(r => {
                            try {
                                const o = this.navigationTransitions.currentTransition,
                                    i = this.navigationTransitions.currentNavigation;
                                if (null !== o && null !== i)
                                    if (this.stateManager.handleRouterEvent(r, i), r instanceof Ci && r.code !== Ut.Redirect && r.code !== Ut.SupersededByNewNavigation) this.navigated = !0;
                                    else if (r instanceof Jn) this.navigated = !0;
                                else if (r instanceof Dg) {
                                    const s = this.urlHandlingStrategy.merge(r.url, o.currentRawUrl),
                                        a = {
                                            info: o.extras.info,
                                            skipLocationChange: o.extras.skipLocationChange,
                                            replaceUrl: "eager" === this.urlUpdateStrategy || iH(o.source)
                                        };
                                    this.scheduleNavigation(s, ma, null, a, {
                                        resolve: o.resolve,
                                        reject: o.reject,
                                        promise: o.promise
                                    })
                                }(function pH(e) {
                                    return !(e instanceof Cg || e instanceof Dg)
                                })(r) && this._events.next(r)
                            } catch (o) {
                                this.navigationTransitions.transitionAbortSubject.next(o)
                            }
                        });
                        this.eventsSubscription.add(t)
                    }
                    resetRootComponentType(t) {
                        this.routerState.root.component = t, this.navigationTransitions.rootComponentType = t
                    }
                    initialNavigation() {
                        this.setUpLocationChangeListener(), this.navigationTransitions.hasRequestedNavigation || this.navigateToSyncWithBrowser(this.location.path(!0), ma, this.stateManager.restoredState())
                    }
                    setUpLocationChangeListener() {
                        this.nonRouterCurrentEntryChangeSubscription ??= this.stateManager.registerNonRouterCurrentEntryChangeListener((t, r) => {
                            setTimeout(() => {
                                this.navigateToSyncWithBrowser(t, "popstate", r)
                            }, 0)
                        })
                    }
                    navigateToSyncWithBrowser(t, r, o) {
                        const i = {
                                replaceUrl: !0
                            },
                            s = o?.navigationId ? o : null;
                        if (o) {
                            const l = {
                                ...o
                            };
                            delete l.navigationId, delete l.\u0275routerPageId, 0 !== Object.keys(l).length && (i.state = l)
                        }
                        const a = this.parseUrl(t);
                        this.scheduleNavigation(a, r, s, i)
                    }
                    get url() {
                        return this.serializeUrl(this.currentUrlTree)
                    }
                    getCurrentNavigation() {
                        return this.navigationTransitions.currentNavigation
                    }
                    get lastSuccessfulNavigation() {
                        return this.navigationTransitions.lastSuccessfulNavigation
                    }
                    resetConfig(t) {
                        this.config = t.map(Ag), this.navigated = !1
                    }
                    ngOnDestroy() {
                        this.dispose()
                    }
                    dispose() {
                        this.navigationTransitions.complete(), this.nonRouterCurrentEntryChangeSubscription && (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(), this.nonRouterCurrentEntryChangeSubscription = void 0), this.disposed = !0, this.eventsSubscription.unsubscribe()
                    }
                    createUrlTree(t, r = {}) {
                        const {
                            relativeTo: o,
                            queryParams: i,
                            fragment: s,
                            queryParamsHandling: a,
                            preserveFragment: l
                        } = r, c = l ? this.currentUrlTree.fragment : s;
                        let d, u = null;
                        switch (a) {
                            case "merge":
                                u = {
                                    ...this.currentUrlTree.queryParams,
                                    ...i
                                };
                                break;
                            case "preserve":
                                u = this.currentUrlTree.queryParams;
                                break;
                            default:
                                u = i || null
                        }
                        null !== u && (u = this.removeEmptyProps(u));
                        try {
                            d = lI(o ? o.snapshot : this.routerState.snapshot.root)
                        } catch {
                            ("string" != typeof t[0] || !t[0].startsWith("/")) && (t = []), d = this.currentUrlTree.root
                        }
                        return cI(d, t, u, c ?? null)
                    }
                    navigateByUrl(t, r = {
                        skipLocationChange: !1
                    }) {
                        const o = _i(t) ? t : this.parseUrl(t),
                            i = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
                        return this.scheduleNavigation(i, ma, null, r)
                    }
                    navigate(t, r = {
                        skipLocationChange: !1
                    }) {
                        return function hH(e) {
                            for (let n = 0; n < e.length; n++)
                                if (null == e[n]) throw new C(4008, !1)
                        }(t), this.navigateByUrl(this.createUrlTree(t, r), r)
                    }
                    serializeUrl(t) {
                        return this.urlSerializer.serialize(t)
                    }
                    parseUrl(t) {
                        try {
                            return this.urlSerializer.parse(t)
                        } catch {
                            return this.urlSerializer.parse("/")
                        }
                    }
                    isActive(t, r) {
                        let o;
                        if (o = !0 === r ? {
                                ...dH
                            } : !1 === r ? {
                                ...fH
                            } : r, _i(t)) return JM(this.currentUrlTree, t, o);
                        const i = this.parseUrl(t);
                        return JM(this.currentUrlTree, i, o)
                    }
                    removeEmptyProps(t) {
                        return Object.entries(t).reduce((r, [o, i]) => (null != i && (r[o] = i), r), {})
                    }
                    scheduleNavigation(t, r, o, i, s) {
                        if (this.disposed) return Promise.resolve(!1);
                        let a, l, c;
                        s ? (a = s.resolve, l = s.reject, c = s.promise) : c = new Promise((d, f) => {
                            a = d, l = f
                        });
                        const u = this.pendingTasks.add();
                        return $I(this, () => {
                            queueMicrotask(() => this.pendingTasks.remove(u))
                        }), this.navigationTransitions.handleNavigationRequest({
                            source: r,
                            restoredState: o,
                            currentUrlTree: this.currentUrlTree,
                            currentRawUrl: this.currentUrlTree,
                            rawUrl: t,
                            extras: i,
                            resolve: a,
                            reject: l,
                            promise: c,
                            currentSnapshot: this.routerState.snapshot,
                            currentRouterState: this.routerState
                        }), c.catch(d => Promise.reject(d))
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            class UI {}
            let yH = (() => {
                class e {
                    constructor(t, r, o, i, s) {
                        this.router = t, this.injector = o, this.preloadingStrategy = i, this.loader = s
                    }
                    setUpPreloading() {
                        this.subscription = this.router.events.pipe(Kn(t => t instanceof Jn), di(() => this.preload())).subscribe(() => {})
                    }
                    preload() {
                        return this.processRoutes(this.injector, this.router.config)
                    }
                    ngOnDestroy() {
                        this.subscription && this.subscription.unsubscribe()
                    }
                    processRoutes(t, r) {
                        const o = [];
                        for (const i of r) {
                            i.providers && !i._injector && (i._injector = Yl(i.providers, t, `Route: ${i.path}`));
                            const s = i._injector ?? t,
                                a = i._loadedInjector ?? s;
                            (i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad || i.loadComponent && !i._loadedComponent) && o.push(this.preloadConfig(s, i)), (i.children || i._loadedRoutes) && o.push(this.processRoutes(a, i.children ?? i._loadedRoutes))
                        }
                        return Fe(o).pipe(hi())
                    }
                    preloadConfig(t, r) {
                        return this.preloadingStrategy.preload(r, () => {
                            let o;
                            o = r.loadChildren && void 0 === r.canLoad ? this.loader.loadChildren(t, r) : R(null);
                            const i = o.pipe(it(s => null === s ? R(void 0) : (r._loadedRoutes = s.routes, r._loadedInjector = s.injector, this.processRoutes(s.injector ?? t, s.routes))));
                            return r.loadComponent && !r._loadedComponent ? Fe([i, this.loader.loadComponent(r)]).pipe(hi()) : i
                        })
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(cn), x(fb), x(vt), x(UI), x(Fg))
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac,
                        providedIn: "root"
                    })
                }
                return e
            })();
            const jg = new M("");
            let BI = (() => {
                class e {
                    constructor(t, r, o, i, s = {}) {
                        this.urlSerializer = t, this.transitions = r, this.viewportScroller = o, this.zone = i, this.options = s, this.lastId = 0, this.lastSource = "imperative", this.restoredId = 0, this.store = {}, s.scrollPositionRestoration ||= "disabled", s.anchorScrolling ||= "disabled"
                    }
                    init() {
                        "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.setHistoryScrollRestoration("manual"), this.routerEventsSubscription = this.createScrollEvents(), this.scrollEventsSubscription = this.consumeScrollEvents()
                    }
                    createScrollEvents() {
                        return this.transitions.events.subscribe(t => {
                            t instanceof pu ? (this.store[this.lastId] = this.viewportScroller.getScrollPosition(), this.lastSource = t.navigationTrigger, this.restoredId = t.restoredState ? t.restoredState.navigationId : 0) : t instanceof Jn ? (this.lastId = t.id, this.scheduleScrollEvent(t, this.urlSerializer.parse(t.urlAfterRedirects).fragment)) : t instanceof Di && t.code === gu.IgnoredSameUrlNavigation && (this.lastSource = void 0, this.restoredId = 0, this.scheduleScrollEvent(t, this.urlSerializer.parse(t.url).fragment))
                        })
                    }
                    consumeScrollEvents() {
                        return this.transitions.events.subscribe(t => {
                            t instanceof mI && (t.position ? "top" === this.options.scrollPositionRestoration ? this.viewportScroller.scrollToPosition([0, 0]) : "enabled" === this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition(t.position) : t.anchor && "enabled" === this.options.anchorScrolling ? this.viewportScroller.scrollToAnchor(t.anchor) : "disabled" !== this.options.scrollPositionRestoration && this.viewportScroller.scrollToPosition([0, 0]))
                        })
                    }
                    scheduleScrollEvent(t, r) {
                        this.zone.runOutsideAngular(() => {
                            setTimeout(() => {
                                this.zone.run(() => {
                                    this.transitions.events.next(new mI(t, "popstate" === this.lastSource ? this.store[this.restoredId] : null, r))
                                })
                            }, 0)
                        })
                    }
                    ngOnDestroy() {
                        this.routerEventsSubscription?.unsubscribe(), this.scrollEventsSubscription?.unsubscribe()
                    }
                    static #e = this.\u0275fac = function(r) {
                        ! function r_() {
                            throw new Error("invalid")
                        }()
                    };
                    static #t = this.\u0275prov = I({
                        token: e,
                        factory: e.\u0275fac
                    })
                }
                return e
            })();

            function On(e, n) {
                return {
                    \u0275kind: e,
                    \u0275providers: n
                }
            }

            function zI() {
                const e = w(ct);
                return n => {
                    const t = e.get(gr);
                    if (n !== t.components[0]) return;
                    const r = e.get(cn),
                        o = e.get(GI);
                    1 === e.get($g) && r.initialNavigation(), e.get(qI, null, q.Optional)?.setUpPreloading(), e.get(jg, null, q.Optional)?.init(), r.resetRootComponentType(t.componentTypes[0]), o.closed || (o.next(), o.complete(), o.unsubscribe())
                }
            }
            const GI = new M("", {
                    factory: () => new ze
                }),
                $g = new M("", {
                    providedIn: "root",
                    factory: () => 1
                }),
                qI = new M("");

            function DH(e) {
                return On(0, [{
                    provide: qI,
                    useExisting: yH
                }, {
                    provide: UI,
                    useExisting: e
                }])
            }

            function bH(e) {
                return On(9, [{
                    provide: LI,
                    useValue: rH
                }, {
                    provide: VI,
                    useValue: {
                        skipNextTransition: !!e?.skipInitialTransition,
                        ...e
                    }
                }])
            }
            const WI = new M("ROUTER_FORROOT_GUARD"),
                EH = [Qs, {
                    provide: vi,
                    useClass: gg
                }, cn, ya, {
                    provide: bi,
                    useFactory: function HI(e) {
                        return e.routerState.root
                    },
                    deps: [cn]
                }, Fg, []];
            let ZI = (() => {
                class e {
                    constructor(t) {}
                    static forRoot(t, r) {
                        return {
                            ngModule: e,
                            providers: [EH, [], {
                                    provide: Si,
                                    multi: !0,
                                    useValue: t
                                }, {
                                    provide: WI,
                                    useFactory: SH,
                                    deps: [
                                        [cn, new Ba, new Ha]
                                    ]
                                }, {
                                    provide: xi,
                                    useValue: r || {}
                                }, r?.useHash ? {
                                    provide: Qr,
                                    useClass: d2
                                } : {
                                    provide: Qr,
                                    useClass: n0
                                }, {
                                    provide: jg,
                                    useFactory: () => {
                                        const e = w(NV),
                                            n = w(J),
                                            t = w(xi),
                                            r = w(Du),
                                            o = w(vi);
                                        return t.scrollOffset && e.setOffset(t.scrollOffset), new BI(o, r, e, n, t)
                                    }
                                }, r?.preloadingStrategy ? DH(r.preloadingStrategy).\u0275providers : [], r?.initialNavigation ? TH(r) : [], r?.bindToComponentInputs ? On(8, [bI, {
                                    provide: yu,
                                    useExisting: bI
                                }]).\u0275providers : [], r?.enableViewTransitions ? bH().\u0275providers : [],
                                [{
                                    provide: QI,
                                    useFactory: zI
                                }, {
                                    provide: Qh,
                                    multi: !0,
                                    useExisting: QI
                                }]
                            ]
                        }
                    }
                    static forChild(t) {
                        return {
                            ngModule: e,
                            providers: [{
                                provide: Si,
                                multi: !0,
                                useValue: t
                            }]
                        }
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(x(WI, 8))
                    };
                    static #t = this.\u0275mod = zt({
                        type: e
                    });
                    static #n = this.\u0275inj = xt({})
                }
                return e
            })();

            function SH(e) {
                return "guarded"
            }

            function TH(e) {
                return ["disabled" === e.initialNavigation ? On(3, [{
                    provide: Wh,
                    multi: !0,
                    useFactory: () => {
                        const n = w(cn);
                        return () => {
                            n.setUpLocationChangeListener()
                        }
                    }
                }, {
                    provide: $g,
                    useValue: 2
                }]).\u0275providers : [], "enabledBlocking" === e.initialNavigation ? On(2, [{
                    provide: $g,
                    useValue: 0
                }, {
                    provide: Wh,
                    multi: !0,
                    deps: [ct],
                    useFactory: n => {
                        const t = n.get(c2, Promise.resolve());
                        return () => t.then(() => new Promise(r => {
                            const o = n.get(cn),
                                i = n.get(GI);
                            $I(o, () => {
                                r(!0)
                            }), n.get(Du).afterPreactivation = () => (r(!0), i.closed ? R(void 0) : i), o.initialNavigation()
                        }))
                    }
                }]).\u0275providers : []]
            }
            const QI = new M(""),
                NH = ["ring"];
            let OH = (() => {
                    class e {
                        constructor() {}
                        ngOnInit() {
                            document.addEventListener("mousemove", t => {
                                this.ring.nativeElement.style.transform = `translate(calc(${t.clientX}px - 1rem), calc(${t.clientY}px - 1rem))`
                            })
                        }
                        ngAfterViewInit() {
                            this.ring.nativeElement.style.display = "none", document.addEventListener("mouseout", t => {
                                t.relatedTarget || (this.ring.nativeElement.style.display = "none")
                            }), document.addEventListener("mouseover", () => {
                                this.ring.nativeElement.style.display = "block"
                            }), document.querySelectorAll(".hovered").forEach(t => {
                                t.addEventListener("mouseover", () => {
                                    this.ring.nativeElement.classList.add("hover")
                                }), t.addEventListener("mouseout", () => {
                                    this.ring.nativeElement.classList.remove("hover")
                                })
                            })
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275cmp = Ln({
                            type: e,
                            selectors: [
                                ["app-custom-cursor"]
                            ],
                            viewQuery: function(r, o) {
                                if (1 & r && js(NH, 5), 2 & r) {
                                    let i;
                                    ri(i = oi()) && (o.ring = i.first)
                                }
                            },
                            decls: 4,
                            vars: 0,
                            consts: [
                                ["ring", ""],
                                ["id", "cursor", 1, "cursor"],
                                ["id", "ring", 1, "ring-cursor"]
                            ],
                            template: function(r, o) {
                                1 & r && (O(0, "div", 1)(1, "div", 2, 0), Ce(3, "div"), F()())
                            },
                            styles: ['@charset "UTF-8";.cursor[_ngcontent-%COMP%]{position:fixed;top:0;left:0;width:2rem;height:2rem;z-index:2;pointer-events:none;display:block}.cursor[_ngcontent-%COMP%]   .ring-cursor[_ngcontent-%COMP%]{position:absolute;display:grid;place-items:center}.cursor[_ngcontent-%COMP%]   .ring-cursor[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{border:1px solid #fff;border-radius:50%;box-shadow:0 0 50px 5px #ffffff6e}.cursor[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{width:100%;height:100%;transition:transform .2s ease-out}.hover[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{transform:scale(1.5)}']
                        })
                    }
                    return e
                })(),
                RH = (() => {
                    class e {
                        constructor() {
                            this.strTime = ""
                        }
                        ngOnInit() {
                            this.updateTime(), setInterval(() => this.updateTime(), 1e3)
                        }
                        updateTime() {
                            const t = new Date;
                            let r = t.getHours();
                            t.getMinutes(), t.getSeconds(), r %= 12, r = r || 12
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275cmp = Ln({
                            type: e,
                            selectors: [
                                ["app-clock"]
                            ],
                            decls: 4,
                            vars: 1,
                            consts: [
                                [1, "glitch"],
                                [1, "clock", "is-off"],
                                [1, "time"]
                            ],
                            template: function(r, o) {
                                1 & r && (O(0, "div", 0)(1, "div", 1)(2, "span", 2), qe(3, 'samsun police department'), F()()()), 2 & r && (U(2), wt("data-time", o.strTime))
                            },
                            styles: ['.clock[_ngcontent-%COMP%]{display:block;width:720px;text-align:center;inset:0 0 25px;margin:auto;cursor:url(pointer.42b17b9a8b5ff79f.png),default}.clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:block;position:relative;font-size:30px;font-weight:700;line-height:1;bottom:6px;margin-bottom:6px}.clock.is-off[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_is-off 2s linear infinite!important}.glitch[_ngcontent-%COMP%]:before{content:"";inset:0;animation:_ngcontent-%COMP%_bg-move 2s linear infinite;background-size:100% 8px;background-image:linear-gradient(0,rgba(255,255,255,.05) 10%,transparent 10%,transparent 50%,rgba(255,255,255,.05) 50%,rgba(255,255,255,.05) 60%,transparent 60%,transparent)}.glitch[_ngcontent-%COMP%]   .figure[_ngcontent-%COMP%], .glitch[_ngcontent-%COMP%]   .figure-mask[_ngcontent-%COMP%]{transform:skew(0) scaleY(1);animation:_ngcontent-%COMP%_tr-bag 4s linear infinite}.glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]{transform:skew(0) scaleY(1);animation:_ngcontent-%COMP%_clock-bag 4s linear infinite}.glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before, .glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after{display:block;content:attr(data-time);position:absolute;top:0;color:#fff;overflow:hidden;width:720px;clip:rect(0,900px,0,0)}.glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before{left:-2px;text-shadow:2px 0 #00f;animation:_ngcontent-%COMP%_c2 1s infinite linear alternate-reverse}.glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after{left:3px;text-shadow:-2px 0 #f00;animation:_ngcontent-%COMP%_c1 2s infinite linear alternate-reverse}@media screen and (max-width: 768px){.clock[_ngcontent-%COMP%]{width:100%;height:100%}.clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:30px}.glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:before, .glitch[_ngcontent-%COMP%]   .clock[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:after{display:block;content:attr(data-time);position:absolute;top:0;color:#fff;overflow:hidden;width:100%;clip:rect(0,900px,0,0)}}@keyframes _ngcontent-%COMP%_is-off{0%{opacity:1}50%{opacity:1}56%{opacity:0}57%{opacity:0}58%{opacity:1}71%{transform:scaleY(1) skew(0)}72%{transform:scaleY(3) skew(-60deg)}73%{transform:scaleY(1) skew(0)}80%{opacity:1}81%{opacity:0}84%{opacity:0}85%{opacity:1}91%{transform:scaleX(1) scaleY(1) skew(0);color:#fff}92%{transform:scaleX(1.5) scaleY(.2) skew(80deg);color:green}93%{transform:scaleX(1) scaleY(1) skew(0);color:#fff}}@keyframes _ngcontent-%COMP%_c1{0%{clip:rect(45px,9999px,38px,0)}5%{clip:rect(39px,9999px,78px,0)}10%{clip:rect(13px,9999px,55px,0)}15.000000000000002%{clip:rect(20px,9999px,17px,0)}20%{clip:rect(58px,9999px,75px,0)}25%{clip:rect(98px,9999px,62px,0)}30.000000000000004%{clip:rect(43px,9999px,15px,0)}35.00000000000001%{clip:rect(10px,9999px,97px,0)}40%{clip:rect(28px,9999px,48px,0)}45%{clip:rect(92px,9999px,53px,0)}50%{clip:rect(21px,9999px,95px,0)}55%{clip:rect(88px,9999px,74px,0)}60.00000000000001%{clip:rect(84px,9999px,34px,0)}65%{clip:rect(85px,9999px,71px,0)}70.00000000000001%{clip:rect(45px,9999px,71px,0)}75%{clip:rect(73px,9999px,16px,0)}80%{clip:rect(48px,9999px,90px,0)}85%{clip:rect(13px,9999px,89px,0)}90%{clip:rect(37px,9999px,37px,0)}95%{clip:rect(3px,9999px,16px,0)}to{clip:rect(35px,9999px,44px,0)}}@keyframes _ngcontent-%COMP%_c2{0%{clip:rect(78px,9999px,41px,0)}5%{clip:rect(72px,9999px,71px,0)}10%{clip:rect(73px,9999px,58px,0)}15.000000000000002%{clip:rect(55px,9999px,14px,0)}20%{clip:rect(8px,9999px,12px,0)}25%{clip:rect(55px,9999px,53px,0)}30.000000000000004%{clip:rect(85px,9999px,11px,0)}35.00000000000001%{clip:rect(87px,9999px,75px,0)}40%{clip:rect(41px,9999px,18px,0)}45%{clip:rect(52px,9999px,70px,0)}50%{clip:rect(41px,9999px,8px,0)}55%{clip:rect(69px,9999px,98px,0)}60.00000000000001%{clip:rect(8px,9999px,92px,0)}65%{clip:rect(88px,9999px,16px,0)}70.00000000000001%{clip:rect(42px,9999px,96px,0)}75%{clip:rect(7px,9999px,29px,0)}80%{clip:rect(38px,9999px,4px,0)}85%{clip:rect(22px,9999px,82px,0)}90%{clip:rect(31px,9999px,97px,0)}95%{clip:rect(71px,9999px,99px,0)}to{clip:rect(42px,9999px,95px,0)}23%{transform:scaleX(.8)}}@keyframes _ngcontent-%COMP%_clock-bag{0%{transform:translate(5px,3px)}2%{transform:translate(4px,4px)}4%{transform:translate(2px,4px)}6%{transform:translate(1px,5px)}8%{transform:translate(1px,5px)}10%{transform:translate(2px,1px)}12%{transform:translate(4px,2px)}14.000000000000002%{transform:translate(3px,5px)}16%{transform:translate(4px,1px)}18%{transform:translate(1px,3px)}20%{transform:translate(4px,1px)}22%{transform:translate(3px,4px)}24%{transform:translate(5px,2px)}26%{transform:translate(1px,4px)}28.000000000000004%{transform:translate(5px,1px)}30%{transform:translate(2px,5px)}32%{transform:translate(2px,4px)}34%{transform:translate(2px,4px)}36%{transform:translate(2px,5px)}38%{transform:translate(5px,4px)}40%{transform:translate(2px,1px)}42%{transform:translate(3px,4px)}44%{transform:translate(4px,5px)}46.00000000000001%{transform:translate(4px,4px)}48%{transform:translate(1px,3px)}50%{transform:translate(4px,3px)}52%{transform:translate(3px,2px)}54%{transform:translate(5px,3px)}56.00000000000001%{transform:translate(2px,3px)}58%{transform:translate(4px,3px)}60%{transform:translate(1px,4px)}62%{transform:translate(4px,3px)}64%{transform:translate(2px,4px)}66%{transform:translate(3px,4px)}68%{transform:translate(4px,2px)}70.00000000000001%{transform:translate(4px,1px)}72%{transform:translate(4px,1px)}74%{transform:translate(3px,4px)}76%{transform:translate(1px,5px)}78%{transform:translate(2px,5px)}80%{transform:translate(5px,5px)}82.00000000000001%{transform:translate(1px,5px)}84%{transform:translate(5px,2px)}86%{transform:translate(2px,5px)}88%{transform:translate(4px,3px)}90%{transform:translate(5px,3px)}92.00000000000001%{transform:translate(2px,5px)}94%{transform:translate(1px,5px)}96%{transform:translate(3px,4px)}98%{transform:translate(5px,4px)}to{transform:translate(4px,3px)}1%{transform:scaleY(1) skew(0)}1.5%{transform:scaleY(3) skew(-60deg)}2%{transform:scaleY(1) skew(0)}51%{transform:scaleX(1) scaleY(1) skew(0)}52%{transform:scaleX(1.5) scaleY(.2) skew(80deg)}53%{transform:scaleX(1) scaleY(1) skew(0)}}@keyframes _ngcontent-%COMP%_tr-bag{0%{transform:translate(3px,1px)}2%{transform:translate(5px,4px)}4%{transform:translate(4px,5px)}6%{transform:translate(3px,5px)}8%{transform:translate(1px,3px)}10%{transform:translate(1px,5px)}12%{transform:translate(2px,4px)}14.000000000000002%{transform:translate(4px,4px)}16%{transform:translate(3px,5px)}18%{transform:translate(5px,5px)}20%{transform:translate(2px,3px)}22%{transform:translate(4px,5px)}24%{transform:translate(3px,3px)}26%{transform:translate(1px,3px)}28.000000000000004%{transform:translate(5px,5px)}30%{transform:translate(1px,4px)}32%{transform:translate(1px,3px)}34%{transform:translate(5px,3px)}36%{transform:translate(2px,3px)}38%{transform:translate(1px,2px)}40%{transform:translate(1px,3px)}42%{transform:translate(4px,1px)}44%{transform:translate(3px,2px)}46.00000000000001%{transform:translate(5px,1px)}48%{transform:translate(1px,2px)}50%{transform:translate(2px,1px)}52%{transform:translate(3px,5px)}54%{transform:translate(2px,1px)}56.00000000000001%{transform:translate(5px,2px)}58%{transform:translate(5px,4px)}60%{transform:translate(2px,5px)}62%{transform:translate(1px,5px)}64%{transform:translate(2px,3px)}66%{transform:translate(2px,5px)}68%{transform:translate(5px,3px)}70.00000000000001%{transform:translate(1px,1px)}72%{transform:translate(5px,1px)}74%{transform:translate(3px,3px)}76%{transform:translate(1px,1px)}78%{transform:translate(4px,2px)}80%{transform:translate(4px,2px)}82.00000000000001%{transform:translate(4px,4px)}84%{transform:translate(3px,3px)}86%{transform:translate(5px,4px)}88%{transform:translate(3px,3px)}90%{transform:translate(4px,4px)}92.00000000000001%{transform:translate(3px,4px)}94%{transform:translate(4px,2px)}96%{transform:translate(1px,1px)}98%{transform:translate(1px,5px)}to{transform:translate(4px,2px)}1%{transform:scaleY(1) skew(0)}1.5%{transform:scaleY(3) skew(-60deg)}2%{transform:scaleY(1) skew(0)}51%{transform:scaleX(1) scaleY(1) skew(0)}52%{transform:scaleX(1.5) scaleY(.2) skew(80deg)}53%{transform:scaleX(1) scaleY(1) skew(0)}}@keyframes _ngcontent-%COMP%_bg-move{0%{background-position:0 0}to{background-position:0 -32px}}']
                        })
                    }
                    return e
                })();
            const Ti_apiUrl = "https://raw.githubusercontent.com/krezuran/test1/refs/heads/main/";
            let PH = (() => {
                    class e {
                        constructor(t) {
                            this.http = t, this.urlDiscordApi = Ti_apiUrl
                        }
                        getDiscordUser(t) {
                            return this.http.get(`${this.urlDiscordApi}user/${t}`)
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(x(sg))
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })(),
                kH = (() => {
                    class e {
                        constructor() {
                            this.webSocketUrl = "wss://api.lanyard.rest/socket", this.dataInitial = {
                                op: 2,
                                d: {
                                    subscribe_to_id: "998545961548783656"
                                }
                            }, this.heartbeat_interval = 3e4, this.lanyardData = new ze
                        }
                        setInitialData(t) {
                            this.dataInitial.d.subscribe_to_id = t
                        }
                        setupWebSocket() {
                            this.socket = new WebSocket(this.webSocketUrl), this.socket.onopen = () => {
                                this.socket?.send(JSON.stringify(this.dataInitial)), this.heartbeat = setInterval(() => {
                                    this.socket?.send(JSON.stringify({
                                        op: 3
                                    }))
                                }, this.heartbeat_interval)
                            }, this.socket.onmessage = t => {
                                const r = JSON.parse(t.data);
                                this.heartbeat_interval = r.d.heartbeat_interval, "INIT_STATE" === r.t && this.setLanyardData(r), "PRESENCE_UPDATE" === r.t && this.setLanyardData(r)
                            }, this.socket.onclose = () => {
                                clearInterval(this.heartbeat), setTimeout(() => {
                                    this.setupWebSocket()
                                }, 5e3)
                            }
                        }
                        setLanyardData(t) {
                            this.lanyardData.next(t)
                        }
                        getLanyardData() {
                            return this.lanyardData.asObservable()
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac,
                            providedIn: "root"
                        })
                    }
                    return e
                })();
            class LH extends st {
                constructor(n, t) {
                    super()
                }
                schedule(n, t = 0) {
                    return this
                }
            }
            const wu = {
                    setInterval(e, n, ...t) {
                        const {
                            delegate: r
                        } = wu;
                        return r?.setInterval ? r.setInterval(e, n, ...t) : setInterval(e, n, ...t)
                    },
                    clearInterval(e) {
                        const {
                            delegate: n
                        } = wu;
                        return (n?.clearInterval || clearInterval)(e)
                    },
                    delegate: void 0
                },
                Ug = {
                    now: () => (Ug.delegate || Date).now(),
                    delegate: void 0
                };
            class Ea {
                constructor(n, t = Ea.now) {
                    this.schedulerActionCtor = n, this.now = t
                }
                schedule(n, t = 0, r) {
                    return new this.schedulerActionCtor(this, n).schedule(r, t)
                }
            }
            Ea.now = Ug.now;
            const $H = new class jH extends Ea {
                constructor(n, t = Ea.now) {
                    super(n, t), this.actions = [], this._active = !1
                }
                flush(n) {
                    const {
                        actions: t
                    } = this;
                    if (this._active) return void t.push(n);
                    let r;
                    this._active = !0;
                    do {
                        if (r = n.execute(n.state, n.delay)) break
                    } while (n = t.shift());
                    if (this._active = !1, r) {
                        for (; n = t.shift();) n.unsubscribe();
                        throw r
                    }
                }
            }(class VH extends LH {
                constructor(n, t) {
                    super(n, t), this.scheduler = n, this.work = t, this.pending = !1
                }
                schedule(n, t = 0) {
                    var r;
                    if (this.closed) return this;
                    this.state = n;
                    const o = this.id,
                        i = this.scheduler;
                    return null != o && (this.id = this.recycleAsyncId(i, o, t)), this.pending = !0, this.delay = t, this.id = null !== (r = this.id) && void 0 !== r ? r : this.requestAsyncId(i, this.id, t), this
                }
                requestAsyncId(n, t, r = 0) {
                    return wu.setInterval(n.flush.bind(n, this), r)
                }
                recycleAsyncId(n, t, r = 0) {
                    if (null != r && this.delay === r && !1 === this.pending) return t;
                    null != t && wu.clearInterval(t)
                }
                execute(n, t) {
                    if (this.closed) return new Error("executing a cancelled action");
                    this.pending = !1;
                    const r = this._execute(n, t);
                    if (r) return r;
                    !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null))
                }
                _execute(n, t) {
                    let o, r = !1;
                    try {
                        this.work(n)
                    } catch (i) {
                        r = !0, o = i || new Error("Scheduled action threw falsy error")
                    }
                    if (r) return this.unsubscribe(), o
                }
                unsubscribe() {
                    if (!this.closed) {
                        const {
                            id: n,
                            scheduler: t
                        } = this, {
                            actions: r
                        } = t;
                        this.work = this.state = this.scheduler = null, this.pending = !1, Na(r, this), null != n && (this.id = this.recycleAsyncId(t, n, null)), this.delay = null, super.unsubscribe()
                    }
                }
            });

            function zH(e, n) {
                return e === n
            }
            class GH extends ze {
                constructor(n = 1 / 0, t = 1 / 0, r = Ug) {
                    super(), this._bufferSize = n, this._windowTime = t, this._timestampProvider = r, this._buffer = [], this._infiniteTimeWindow = !0, this._infiniteTimeWindow = t === 1 / 0, this._bufferSize = Math.max(1, n), this._windowTime = Math.max(1, t)
                }
                next(n) {
                    const {
                        isStopped: t,
                        _buffer: r,
                        _infiniteTimeWindow: o,
                        _timestampProvider: i,
                        _windowTime: s
                    } = this;
                    t || (r.push(n), !o && r.push(i.now() + s)), this._trimBuffer(), super.next(n)
                }
                _subscribe(n) {
                    this._throwIfClosed(), this._trimBuffer();
                    const t = this._innerSubscribe(n),
                        {
                            _infiniteTimeWindow: r,
                            _buffer: o
                        } = this,
                        i = o.slice();
                    for (let s = 0; s < i.length && !n.closed; s += r ? 1 : 2) n.next(i[s]);
                    return this._checkFinalizedStatuses(n), t
                }
                _trimBuffer() {
                    const {
                        _bufferSize: n,
                        _timestampProvider: t,
                        _buffer: r,
                        _infiniteTimeWindow: o
                    } = this, i = (o ? 1 : 2) * n;
                    if (n < 1 / 0 && i < r.length && r.splice(0, r.length - i), !o) {
                        const s = t.now();
                        let a = 0;
                        for (let l = 1; l < r.length && r[l] <= s; l += 2) a = l;
                        a && r.splice(0, a + 1)
                    }
                }
            }

            function Bg(e, n, ...t) {
                if (!0 === n) return void e();
                if (!1 === n) return;
                const r = new Ri({
                    next: () => {
                        r.unsubscribe(), e()
                    }
                });
                return $t(n(...t)).subscribe(r)
            }
            let ro = {
                async: !1,
                breaks: !1,
                extensions: null,
                gfm: !0,
                hooks: null,
                pedantic: !1,
                renderer: null,
                silent: !1,
                tokenizer: null,
                walkTokens: null
            };

            function YI(e) {
                ro = e
            }
            const XI = /[&<>"']/,
                ZH = new RegExp(XI.source, "g"),
                KI = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
                QH = new RegExp(KI.source, "g"),
                YH = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    '"': "&quot;",
                    "'": "&#39;"
                },
                JI = e => YH[e];

            function Bt(e, n) {
                if (n) {
                    if (XI.test(e)) return e.replace(ZH, JI)
                } else if (KI.test(e)) return e.replace(QH, JI);
                return e
            }
            const XH = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
                JH = /(^|[^\[])\^/g;

            function ce(e, n) {
                let t = "string" == typeof e ? e : e.source;
                n = n || "";
                const r = {
                    replace: (o, i) => {
                        let s = "string" == typeof i ? i : i.source;
                        return s = s.replace(JH, "$1"), t = t.replace(o, s), r
                    },
                    getRegex: () => new RegExp(t, n)
                };
                return r
            }

            function ex(e) {
                try {
                    e = encodeURI(e).replace(/%25/g, "%")
                } catch {
                    return null
                }
                return e
            }
            const Ma = {
                exec: () => null
            };

            function tx(e, n) {
                const r = e.replace(/\|/g, (i, s, a) => {
                    let l = !1,
                        c = s;
                    for (; --c >= 0 && "\\" === a[c];) l = !l;
                    return l ? "|" : " |"
                }).split(/ \|/);
                let o = 0;
                if (r[0].trim() || r.shift(), r.length > 0 && !r[r.length - 1].trim() && r.pop(), n)
                    if (r.length > n) r.splice(n);
                    else
                        for (; r.length < n;) r.push("");
                for (; o < r.length; o++) r[o] = r[o].trim().replace(/\\\|/g, "|");
                return r
            }

            function bu(e, n, t) {
                const r = e.length;
                if (0 === r) return "";
                let o = 0;
                for (; o < r;) {
                    const i = e.charAt(r - o - 1);
                    if (i !== n || t) {
                        if (i === n || !t) break;
                        o++
                    } else o++
                }
                return e.slice(0, r - o)
            }

            function nx(e, n, t, r) {
                const o = n.href,
                    i = n.title ? Bt(n.title) : null,
                    s = e[1].replace(/\\([\[\]])/g, "$1");
                if ("!" !== e[0].charAt(0)) {
                    r.state.inLink = !0;
                    const a = {
                        type: "link",
                        raw: t,
                        href: o,
                        title: i,
                        text: s,
                        tokens: r.inlineTokens(s)
                    };
                    return r.state.inLink = !1, a
                }
                return {
                    type: "image",
                    raw: t,
                    href: o,
                    title: i,
                    text: Bt(s)
                }
            }
            class Eu {
                options;
                rules;
                lexer;
                constructor(n) {
                    this.options = n || ro
                }
                space(n) {
                    const t = this.rules.block.newline.exec(n);
                    if (t && t[0].length > 0) return {
                        type: "space",
                        raw: t[0]
                    }
                }
                code(n) {
                    const t = this.rules.block.code.exec(n);
                    if (t) {
                        const r = t[0].replace(/^ {1,4}/gm, "");
                        return {
                            type: "code",
                            raw: t[0],
                            codeBlockStyle: "indented",
                            text: this.options.pedantic ? r : bu(r, "\n")
                        }
                    }
                }
                fences(n) {
                    const t = this.rules.block.fences.exec(n);
                    if (t) {
                        const r = t[0],
                            o = function t4(e, n) {
                                const t = e.match(/^(\s+)(?:```)/);
                                if (null === t) return n;
                                const r = t[1];
                                return n.split("\n").map(o => {
                                    const i = o.match(/^\s+/);
                                    if (null === i) return o;
                                    const [s] = i;
                                    return s.length >= r.length ? o.slice(r.length) : o
                                }).join("\n")
                            }(r, t[3] || "");
                        return {
                            type: "code",
                            raw: r,
                            lang: t[2] ? t[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : t[2],
                            text: o
                        }
                    }
                }
                heading(n) {
                    const t = this.rules.block.heading.exec(n);
                    if (t) {
                        let r = t[2].trim();
                        if (/#$/.test(r)) {
                            const o = bu(r, "#");
                            (this.options.pedantic || !o || / $/.test(o)) && (r = o.trim())
                        }
                        return {
                            type: "heading",
                            raw: t[0],
                            depth: t[1].length,
                            text: r,
                            tokens: this.lexer.inline(r)
                        }
                    }
                }
                hr(n) {
                    const t = this.rules.block.hr.exec(n);
                    if (t) return {
                        type: "hr",
                        raw: t[0]
                    }
                }
                blockquote(n) {
                    const t = this.rules.block.blockquote.exec(n);
                    if (t) {
                        const r = bu(t[0].replace(/^ *>[ \t]?/gm, ""), "\n"),
                            o = this.lexer.state.top;
                        this.lexer.state.top = !0;
                        const i = this.lexer.blockTokens(r);
                        return this.lexer.state.top = o, {
                            type: "blockquote",
                            raw: t[0],
                            tokens: i,
                            text: r
                        }
                    }
                }
                list(n) {
                    let t = this.rules.block.list.exec(n);
                    if (t) {
                        let r = t[1].trim();
                        const o = r.length > 1,
                            i = {
                                type: "list",
                                raw: "",
                                ordered: o,
                                start: o ? +r.slice(0, -1) : "",
                                loose: !1,
                                items: []
                            };
                        r = o ? `\\d{1,9}\\${r.slice(-1)}` : `\\${r}`, this.options.pedantic && (r = o ? r : "[*+-]");
                        const s = new RegExp(`^( {0,3}${r})((?:[\t ][^\\n]*)?(?:\\n|$))`);
                        let a = "",
                            l = "",
                            c = !1;
                        for (; n;) {
                            let u = !1;
                            if (!(t = s.exec(n)) || this.rules.block.hr.test(n)) break;
                            a = t[0], n = n.substring(a.length);
                            let d = t[2].split("\n", 1)[0].replace(/^\t+/, y => " ".repeat(3 * y.length)),
                                f = n.split("\n", 1)[0],
                                h = 0;
                            this.options.pedantic ? (h = 2, l = d.trimStart()) : (h = t[2].search(/[^ ]/), h = h > 4 ? 1 : h, l = d.slice(h), h += t[1].length);
                            let p = !1;
                            if (!d && /^ *$/.test(f) && (a += f + "\n", n = n.substring(f.length + 1), u = !0), !u) {
                                const y = new RegExp(`^ {0,${Math.min(3,h-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))`),
                                    v = new RegExp(`^ {0,${Math.min(3,h-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
                                    E = new RegExp(`^ {0,${Math.min(3,h-1)}}(?:\`\`\`|~~~)`),
                                    T = new RegExp(`^ {0,${Math.min(3,h-1)}}#`);
                                for (; n;) {
                                    const B = n.split("\n", 1)[0];
                                    if (f = B, this.options.pedantic && (f = f.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")), E.test(f) || T.test(f) || y.test(f) || v.test(n)) break;
                                    if (f.search(/[^ ]/) >= h || !f.trim()) l += "\n" + f.slice(h);
                                    else {
                                        if (p || d.search(/[^ ]/) >= 4 || E.test(d) || T.test(d) || v.test(d)) break;
                                        l += "\n" + f
                                    }!p && !f.trim() && (p = !0), a += B + "\n", n = n.substring(B.length + 1), d = f.slice(h)
                                }
                            }
                            i.loose || (c ? i.loose = !0 : /\n *\n *$/.test(a) && (c = !0));
                            let m, g = null;
                            this.options.gfm && (g = /^\[[ xX]\] /.exec(l), g && (m = "[ ] " !== g[0], l = l.replace(/^\[[ xX]\] +/, ""))), i.items.push({
                                type: "list_item",
                                raw: a,
                                task: !!g,
                                checked: m,
                                loose: !1,
                                text: l,
                                tokens: []
                            }), i.raw += a
                        }
                        i.items[i.items.length - 1].raw = a.trimEnd(), i.items[i.items.length - 1].text = l.trimEnd(), i.raw = i.raw.trimEnd();
                        for (let u = 0; u < i.items.length; u++)
                            if (this.lexer.state.top = !1, i.items[u].tokens = this.lexer.blockTokens(i.items[u].text, []), !i.loose) {
                                const d = i.items[u].tokens.filter(h => "space" === h.type),
                                    f = d.length > 0 && d.some(h => /\n.*\n/.test(h.raw));
                                i.loose = f
                            } if (i.loose)
                            for (let u = 0; u < i.items.length; u++) i.items[u].loose = !0;
                        return i
                    }
                }
                html(n) {
                    const t = this.rules.block.html.exec(n);
                    if (t) return {
                        type: "html",
                        block: !0,
                        raw: t[0],
                        pre: "pre" === t[1] || "script" === t[1] || "style" === t[1],
                        text: t[0]
                    }
                }
                def(n) {
                    const t = this.rules.block.def.exec(n);
                    if (t) {
                        const r = t[1].toLowerCase().replace(/\s+/g, " "),
                            o = t[2] ? t[2].replace(/^<(.*)>$/, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "",
                            i = t[3] ? t[3].substring(1, t[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : t[3];
                        return {
                            type: "def",
                            tag: r,
                            raw: t[0],
                            href: o,
                            title: i
                        }
                    }
                }
                table(n) {
                    const t = this.rules.block.table.exec(n);
                    if (!t || !/[:|]/.test(t[2])) return;
                    const r = tx(t[1]),
                        o = t[2].replace(/^\||\| *$/g, "").split("|"),
                        i = t[3] && t[3].trim() ? t[3].replace(/\n[ \t]*$/, "").split("\n") : [],
                        s = {
                            type: "table",
                            raw: t[0],
                            header: [],
                            align: [],
                            rows: []
                        };
                    if (r.length === o.length) {
                        for (const a of o) /^ *-+: *$/.test(a) ? s.align.push("right") : /^ *:-+: *$/.test(a) ? s.align.push("center") : /^ *:-+ *$/.test(a) ? s.align.push("left") : s.align.push(null);
                        for (const a of r) s.header.push({
                            text: a,
                            tokens: this.lexer.inline(a)
                        });
                        for (const a of i) s.rows.push(tx(a, s.header.length).map(l => ({
                            text: l,
                            tokens: this.lexer.inline(l)
                        })));
                        return s
                    }
                }
                lheading(n) {
                    const t = this.rules.block.lheading.exec(n);
                    if (t) return {
                        type: "heading",
                        raw: t[0],
                        depth: "=" === t[2].charAt(0) ? 1 : 2,
                        text: t[1],
                        tokens: this.lexer.inline(t[1])
                    }
                }
                paragraph(n) {
                    const t = this.rules.block.paragraph.exec(n);
                    if (t) {
                        const r = "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1];
                        return {
                            type: "paragraph",
                            raw: t[0],
                            text: r,
                            tokens: this.lexer.inline(r)
                        }
                    }
                }
                text(n) {
                    const t = this.rules.block.text.exec(n);
                    if (t) return {
                        type: "text",
                        raw: t[0],
                        text: t[0],
                        tokens: this.lexer.inline(t[0])
                    }
                }
                escape(n) {
                    const t = this.rules.inline.escape.exec(n);
                    if (t) return {
                        type: "escape",
                        raw: t[0],
                        text: Bt(t[1])
                    }
                }
                tag(n) {
                    const t = this.rules.inline.tag.exec(n);
                    if (t) return !this.lexer.state.inLink && /^<a /i.test(t[0]) ? this.lexer.state.inLink = !0 : this.lexer.state.inLink && /^<\/a>/i.test(t[0]) && (this.lexer.state.inLink = !1), !this.lexer.state.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(t[0]) ? this.lexer.state.inRawBlock = !0 : this.lexer.state.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) && (this.lexer.state.inRawBlock = !1), {
                        type: "html",
                        raw: t[0],
                        inLink: this.lexer.state.inLink,
                        inRawBlock: this.lexer.state.inRawBlock,
                        block: !1,
                        text: t[0]
                    }
                }
                link(n) {
                    const t = this.rules.inline.link.exec(n);
                    if (t) {
                        const r = t[2].trim();
                        if (!this.options.pedantic && /^</.test(r)) {
                            if (!/>$/.test(r)) return;
                            const s = bu(r.slice(0, -1), "\\");
                            if ((r.length - s.length) % 2 == 0) return
                        } else {
                            const s = function e4(e, n) {
                                if (-1 === e.indexOf(n[1])) return -1;
                                let t = 0;
                                for (let r = 0; r < e.length; r++)
                                    if ("\\" === e[r]) r++;
                                    else if (e[r] === n[0]) t++;
                                else if (e[r] === n[1] && (t--, t < 0)) return r;
                                return -1
                            }(t[2], "()");
                            if (s > -1) {
                                const l = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + s;
                                t[2] = t[2].substring(0, s), t[0] = t[0].substring(0, l).trim(), t[3] = ""
                            }
                        }
                        let o = t[2],
                            i = "";
                        if (this.options.pedantic) {
                            const s = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o);
                            s && (o = s[1], i = s[3])
                        } else i = t[3] ? t[3].slice(1, -1) : "";
                        return o = o.trim(), /^</.test(o) && (o = this.options.pedantic && !/>$/.test(r) ? o.slice(1) : o.slice(1, -1)), nx(t, {
                            href: o && o.replace(this.rules.inline.anyPunctuation, "$1"),
                            title: i && i.replace(this.rules.inline.anyPunctuation, "$1")
                        }, t[0], this.lexer)
                    }
                }
                reflink(n, t) {
                    let r;
                    if ((r = this.rules.inline.reflink.exec(n)) || (r = this.rules.inline.nolink.exec(n))) {
                        const i = t[(r[2] || r[1]).replace(/\s+/g, " ").toLowerCase()];
                        if (!i) {
                            const s = r[0].charAt(0);
                            return {
                                type: "text",
                                raw: s,
                                text: s
                            }
                        }
                        return nx(r, i, r[0], this.lexer)
                    }
                }
                emStrong(n, t, r = "") {
                    let o = this.rules.inline.emStrongLDelim.exec(n);
                    if (!(!o || o[3] && r.match(/[\p{L}\p{N}]/u)) && (!o[1] && !o[2] || !r || this.rules.inline.punctuation.exec(r))) {
                        const s = [...o[0]].length - 1;
                        let a, l, c = s,
                            u = 0;
                        const d = "*" === o[0][0] ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
                        for (d.lastIndex = 0, t = t.slice(-1 * n.length + s); null != (o = d.exec(t));) {
                            if (a = o[1] || o[2] || o[3] || o[4] || o[5] || o[6], !a) continue;
                            if (l = [...a].length, o[3] || o[4]) {
                                c += l;
                                continue
                            }
                            if ((o[5] || o[6]) && s % 3 && !((s + l) % 3)) {
                                u += l;
                                continue
                            }
                            if (c -= l, c > 0) continue;
                            l = Math.min(l, l + c + u);
                            const f = [...o[0]][0].length,
                                h = n.slice(0, s + o.index + f + l);
                            if (Math.min(s, l) % 2) {
                                const g = h.slice(1, -1);
                                return {
                                    type: "em",
                                    raw: h,
                                    text: g,
                                    tokens: this.lexer.inlineTokens(g)
                                }
                            }
                            const p = h.slice(2, -2);
                            return {
                                type: "strong",
                                raw: h,
                                text: p,
                                tokens: this.lexer.inlineTokens(p)
                            }
                        }
                    }
                }
                codespan(n) {
                    const t = this.rules.inline.code.exec(n);
                    if (t) {
                        let r = t[2].replace(/\n/g, " ");
                        const o = /[^ ]/.test(r),
                            i = /^ /.test(r) && / $/.test(r);
                        return o && i && (r = r.substring(1, r.length - 1)), r = Bt(r, !0), {
                            type: "codespan",
                            raw: t[0],
                            text: r
                        }
                    }
                }
                br(n) {
                    const t = this.rules.inline.br.exec(n);
                    if (t) return {
                        type: "br",
                        raw: t[0]
                    }
                }
                del(n) {
                    const t = this.rules.inline.del.exec(n);
                    if (t) return {
                        type: "del",
                        raw: t[0],
                        text: t[2],
                        tokens: this.lexer.inlineTokens(t[2])
                    }
                }
                autolink(n) {
                    const t = this.rules.inline.autolink.exec(n);
                    if (t) {
                        let r, o;
                        return "@" === t[2] ? (r = Bt(t[1]), o = "mailto:" + r) : (r = Bt(t[1]), o = r), {
                            type: "link",
                            raw: t[0],
                            text: r,
                            href: o,
                            tokens: [{
                                type: "text",
                                raw: r,
                                text: r
                            }]
                        }
                    }
                }
                url(n) {
                    let t;
                    if (t = this.rules.inline.url.exec(n)) {
                        let r, o;
                        if ("@" === t[2]) r = Bt(t[0]), o = "mailto:" + r;
                        else {
                            let i;
                            do {
                                i = t[0], t[0] = this.rules.inline._backpedal.exec(t[0])?.[0] ?? ""
                            } while (i !== t[0]);
                            r = Bt(t[0]), o = "www." === t[1] ? "http://" + t[0] : t[0]
                        }
                        return {
                            type: "link",
                            raw: t[0],
                            text: r,
                            href: o,
                            tokens: [{
                                type: "text",
                                raw: r,
                                text: r
                            }]
                        }
                    }
                }
                inlineText(n) {
                    const t = this.rules.inline.text.exec(n);
                    if (t) {
                        let r;
                        return r = this.lexer.state.inRawBlock ? t[0] : Bt(t[0]), {
                            type: "text",
                            raw: t[0],
                            text: r
                        }
                    }
                }
            }
            const Ia = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
                rx = /(?:[*+-]|\d{1,9}[.)])/,
                ox = ce(/^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/).replace(/bull/g, rx).replace(/blockCode/g, / {4}/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).getRegex(),
                zg = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
                Gg = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
                a4 = ce(/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/).replace("label", Gg).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),
                l4 = ce(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, rx).getRegex(),
                Mu = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
                qg = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
                c4 = ce("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))", "i").replace("comment", qg).replace("tag", Mu).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),
                ix = ce(zg).replace("hr", Ia).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Mu).getRegex(),
                Wg = {
                    blockquote: ce(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", ix).getRegex(),
                    code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
                    def: a4,
                    fences: /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
                    heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
                    hr: Ia,
                    html: c4,
                    lheading: ox,
                    list: l4,
                    newline: /^(?: *(?:\n|$))+/,
                    paragraph: ix,
                    table: Ma,
                    text: /^[^\n]+/
                },
                sx = ce("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr", Ia).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", " {4}[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Mu).getRegex(),
                u4 = {
                    ...Wg,
                    table: sx,
                    paragraph: ce(zg).replace("hr", Ia).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", sx).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", Mu).getRegex()
                },
                d4 = {
                    ...Wg,
                    html: ce("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment", qg).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
                    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
                    heading: /^(#{1,6})(.*)(?:\n+|$)/,
                    fences: Ma,
                    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
                    paragraph: ce(zg).replace("hr", Ia).replace("heading", " *#{1,6} *[^\n]").replace("lheading", ox).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
                },
                ax = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
                lx = /^( {2,}|\\)\n(?!\s*$)/,
                xa = "\\p{P}\\p{S}",
                p4 = ce(/^((?![*_])[\spunctuation])/, "u").replace(/punctuation/g, xa).getRegex(),
                m4 = ce(/^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/, "u").replace(/punct/g, xa).getRegex(),
                y4 = ce("^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])", "gu").replace(/punct/g, xa).getRegex(),
                v4 = ce("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])", "gu").replace(/punct/g, xa).getRegex(),
                _4 = ce(/\\([punct])/, "gu").replace(/punct/g, xa).getRegex(),
                C4 = ce(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),
                D4 = ce(qg).replace("(?:--\x3e|$)", "--\x3e").getRegex(),
                w4 = ce("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment", D4).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),
                Iu = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
                b4 = ce(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/).replace("label", Iu).replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),
                cx = ce(/^!?\[(label)\]\[(ref)\]/).replace("label", Iu).replace("ref", Gg).getRegex(),
                ux = ce(/^!?\[(ref)\](?:\[\])?/).replace("ref", Gg).getRegex(),
                Zg = {
                    _backpedal: Ma,
                    anyPunctuation: _4,
                    autolink: C4,
                    blockSkip: /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
                    br: lx,
                    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
                    del: Ma,
                    emStrongLDelim: m4,
                    emStrongRDelimAst: y4,
                    emStrongRDelimUnd: v4,
                    escape: ax,
                    link: b4,
                    nolink: ux,
                    punctuation: p4,
                    reflink: cx,
                    reflinkSearch: ce("reflink|nolink(?!\\()", "g").replace("reflink", cx).replace("nolink", ux).getRegex(),
                    tag: w4,
                    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
                    url: Ma
                },
                M4 = {
                    ...Zg,
                    link: ce(/^!?\[(label)\]\((.*?)\)/).replace("label", Iu).getRegex(),
                    reflink: ce(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", Iu).getRegex()
                },
                Qg = {
                    ...Zg,
                    escape: ce(ax).replace("])", "~|])").getRegex(),
                    url: ce(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
                    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
                    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
                    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
                },
                I4 = {
                    ...Qg,
                    br: ce(lx).replace("{2,}", "*").getRegex(),
                    text: ce(Qg.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
                },
                xu = {
                    normal: Wg,
                    gfm: u4,
                    pedantic: d4
                },
                Sa = {
                    normal: Zg,
                    gfm: Qg,
                    breaks: I4,
                    pedantic: M4
                };
            class Rn {
                tokens;
                options;
                state;
                tokenizer;
                inlineQueue;
                constructor(n) {
                    this.tokens = [], this.tokens.links = Object.create(null), this.options = n || ro, this.options.tokenizer = this.options.tokenizer || new Eu, this.tokenizer = this.options.tokenizer, this.tokenizer.options = this.options, this.tokenizer.lexer = this, this.inlineQueue = [], this.state = {
                        inLink: !1,
                        inRawBlock: !1,
                        top: !0
                    };
                    const t = {
                        block: xu.normal,
                        inline: Sa.normal
                    };
                    this.options.pedantic ? (t.block = xu.pedantic, t.inline = Sa.pedantic) : this.options.gfm && (t.block = xu.gfm, t.inline = this.options.breaks ? Sa.breaks : Sa.gfm), this.tokenizer.rules = t
                }
                static get rules() {
                    return {
                        block: xu,
                        inline: Sa
                    }
                }
                static lex(n, t) {
                    return new Rn(t).lex(n)
                }
                static lexInline(n, t) {
                    return new Rn(t).inlineTokens(n)
                }
                lex(n) {
                    n = n.replace(/\r\n|\r/g, "\n"), this.blockTokens(n, this.tokens);
                    for (let t = 0; t < this.inlineQueue.length; t++) {
                        const r = this.inlineQueue[t];
                        this.inlineTokens(r.src, r.tokens)
                    }
                    return this.inlineQueue = [], this.tokens
                }
                blockTokens(n, t = []) {
                    let r, o, i, s;
                    for (n = this.options.pedantic ? n.replace(/\t/g, "    ").replace(/^ +$/gm, "") : n.replace(/^( *)(\t+)/gm, (a, l, c) => l + "    ".repeat(c.length)); n;)
                        if (!(this.options.extensions && this.options.extensions.block && this.options.extensions.block.some(a => !!(r = a.call({
                                lexer: this
                            }, n, t)) && (n = n.substring(r.raw.length), t.push(r), !0)))) {
                            if (r = this.tokenizer.space(n)) {
                                n = n.substring(r.raw.length), 1 === r.raw.length && t.length > 0 ? t[t.length - 1].raw += "\n" : t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.code(n)) {
                                n = n.substring(r.raw.length), o = t[t.length - 1], !o || "paragraph" !== o.type && "text" !== o.type ? t.push(r) : (o.raw += "\n" + r.raw, o.text += "\n" + r.text, this.inlineQueue[this.inlineQueue.length - 1].src = o.text);
                                continue
                            }
                            if (r = this.tokenizer.fences(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.heading(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.hr(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.blockquote(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.list(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.html(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.def(n)) {
                                n = n.substring(r.raw.length), o = t[t.length - 1], !o || "paragraph" !== o.type && "text" !== o.type ? this.tokens.links[r.tag] || (this.tokens.links[r.tag] = {
                                    href: r.href,
                                    title: r.title
                                }) : (o.raw += "\n" + r.raw, o.text += "\n" + r.raw, this.inlineQueue[this.inlineQueue.length - 1].src = o.text);
                                continue
                            }
                            if (r = this.tokenizer.table(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.lheading(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (i = n, this.options.extensions && this.options.extensions.startBlock) {
                                let a = 1 / 0;
                                const l = n.slice(1);
                                let c;
                                this.options.extensions.startBlock.forEach(u => {
                                    c = u.call({
                                        lexer: this
                                    }, l), "number" == typeof c && c >= 0 && (a = Math.min(a, c))
                                }), a < 1 / 0 && a >= 0 && (i = n.substring(0, a + 1))
                            }
                            if (this.state.top && (r = this.tokenizer.paragraph(i))) {
                                o = t[t.length - 1], s && "paragraph" === o.type ? (o.raw += "\n" + r.raw, o.text += "\n" + r.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = o.text) : t.push(r), s = i.length !== n.length, n = n.substring(r.raw.length);
                                continue
                            }
                            if (r = this.tokenizer.text(n)) {
                                n = n.substring(r.raw.length), o = t[t.length - 1], o && "text" === o.type ? (o.raw += "\n" + r.raw, o.text += "\n" + r.text, this.inlineQueue.pop(), this.inlineQueue[this.inlineQueue.length - 1].src = o.text) : t.push(r);
                                continue
                            }
                            if (n) {
                                const a = "Infinite loop on byte: " + n.charCodeAt(0);
                                if (this.options.silent) {
                                    console.error(a);
                                    break
                                }
                                throw new Error(a)
                            }
                        } return this.state.top = !0, t
                }
                inline(n, t = []) {
                    return this.inlineQueue.push({
                        src: n,
                        tokens: t
                    }), t
                }
                inlineTokens(n, t = []) {
                    let r, o, i, a, l, c, s = n;
                    if (this.tokens.links) {
                        const u = Object.keys(this.tokens.links);
                        if (u.length > 0)
                            for (; null != (a = this.tokenizer.rules.inline.reflinkSearch.exec(s));) u.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) && (s = s.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))
                    }
                    for (; null != (a = this.tokenizer.rules.inline.blockSkip.exec(s));) s = s.slice(0, a.index) + "[" + "a".repeat(a[0].length - 2) + "]" + s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
                    for (; null != (a = this.tokenizer.rules.inline.anyPunctuation.exec(s));) s = s.slice(0, a.index) + "++" + s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
                    for (; n;)
                        if (l || (c = ""), l = !1, !(this.options.extensions && this.options.extensions.inline && this.options.extensions.inline.some(u => !!(r = u.call({
                                lexer: this
                            }, n, t)) && (n = n.substring(r.raw.length), t.push(r), !0)))) {
                            if (r = this.tokenizer.escape(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.tag(n)) {
                                n = n.substring(r.raw.length), o = t[t.length - 1], o && "text" === r.type && "text" === o.type ? (o.raw += r.raw, o.text += r.text) : t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.link(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.reflink(n, this.tokens.links)) {
                                n = n.substring(r.raw.length), o = t[t.length - 1], o && "text" === r.type && "text" === o.type ? (o.raw += r.raw, o.text += r.text) : t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.emStrong(n, s, c)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.codespan(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.br(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.del(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (r = this.tokenizer.autolink(n)) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (!this.state.inLink && (r = this.tokenizer.url(n))) {
                                n = n.substring(r.raw.length), t.push(r);
                                continue
                            }
                            if (i = n, this.options.extensions && this.options.extensions.startInline) {
                                let u = 1 / 0;
                                const d = n.slice(1);
                                let f;
                                this.options.extensions.startInline.forEach(h => {
                                    f = h.call({
                                        lexer: this
                                    }, d), "number" == typeof f && f >= 0 && (u = Math.min(u, f))
                                }), u < 1 / 0 && u >= 0 && (i = n.substring(0, u + 1))
                            }
                            if (r = this.tokenizer.inlineText(i)) {
                                n = n.substring(r.raw.length), "_" !== r.raw.slice(-1) && (c = r.raw.slice(-1)), l = !0, o = t[t.length - 1], o && "text" === o.type ? (o.raw += r.raw, o.text += r.text) : t.push(r);
                                continue
                            }
                            if (n) {
                                const u = "Infinite loop on byte: " + n.charCodeAt(0);
                                if (this.options.silent) {
                                    console.error(u);
                                    break
                                }
                                throw new Error(u)
                            }
                        } return t
                }
            }
            class oo {
                options;
                constructor(n) {
                    this.options = n || ro
                }
                code(n, t, r) {
                    const o = (t || "").match(/^\S*/)?.[0];
                    return n = n.replace(/\n$/, "") + "\n", o ? '<pre><code class="language-' + Bt(o) + '">' + (r ? n : Bt(n, !0)) + "</code></pre>\n" : "<pre><code>" + (r ? n : Bt(n, !0)) + "</code></pre>\n"
                }
                blockquote(n) {
                    return `<blockquote>\n${n}</blockquote>\n`
                }
                html(n, t) {
                    return n
                }
                heading(n, t, r) {
                    return `<h${t}>${n}</h${t}>\n`
                }
                hr() {
                    return "<hr>\n"
                }
                list(n, t, r) {
                    const o = t ? "ol" : "ul";
                    return "<" + o + (t && 1 !== r ? ' start="' + r + '"' : "") + ">\n" + n + "</" + o + ">\n"
                }
                listitem(n, t, r) {
                    return `<li>${n}</li>\n`
                }
                checkbox(n) {
                    return "<input " + (n ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
                }
                paragraph(n) {
                    return `<p>${n}</p>\n`
                }
                table(n, t) {
                    return t && (t = `<tbody>${t}</tbody>`), "<table>\n<thead>\n" + n + "</thead>\n" + t + "</table>\n"
                }
                tablerow(n) {
                    return `<tr>\n${n}</tr>\n`
                }
                tablecell(n, t) {
                    const r = t.header ? "th" : "td";
                    return (t.align ? `<${r} align="${t.align}">` : `<${r}>`) + n + `</${r}>\n`
                }
                strong(n) {
                    return `<strong>${n}</strong>`
                }
                em(n) {
                    return `<em>${n}</em>`
                }
                codespan(n) {
                    return `<code>${n}</code>`
                }
                br() {
                    return "<br>"
                }
                del(n) {
                    return `<del>${n}</del>`
                }
                link(n, t, r) {
                    const o = ex(n);
                    if (null === o) return r;
                    let i = '<a href="' + (n = o) + '"';
                    return t && (i += ' title="' + t + '"'), i += ">" + r + "</a>", i
                }
                image(n, t, r) {
                    const o = ex(n);
                    if (null === o) return r;
                    let i = `<img src="${n=o}" alt="${r}"`;
                    return t && (i += ` title="${t}"`), i += ">", i
                }
                text(n) {
                    return n
                }
            }
            class Yg {
                strong(n) {
                    return n
                }
                em(n) {
                    return n
                }
                codespan(n) {
                    return n
                }
                del(n) {
                    return n
                }
                html(n) {
                    return n
                }
                text(n) {
                    return n
                }
                link(n, t, r) {
                    return "" + r
                }
                image(n, t, r) {
                    return "" + r
                }
                br() {
                    return ""
                }
            }
            class Pn {
                options;
                renderer;
                textRenderer;
                constructor(n) {
                    this.options = n || ro, this.options.renderer = this.options.renderer || new oo, this.renderer = this.options.renderer, this.renderer.options = this.options, this.textRenderer = new Yg
                }
                static parse(n, t) {
                    return new Pn(t).parse(n)
                }
                static parseInline(n, t) {
                    return new Pn(t).parseInline(n)
                }
                parse(n, t = !0) {
                    let r = "";
                    for (let o = 0; o < n.length; o++) {
                        const i = n[o];
                        if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type]) {
                            const s = i,
                                a = this.options.extensions.renderers[s.type].call({
                                    parser: this
                                }, s);
                            if (!1 !== a || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(s.type)) {
                                r += a || "";
                                continue
                            }
                        }
                        switch (i.type) {
                            case "space":
                                continue;
                            case "hr":
                                r += this.renderer.hr();
                                continue;
                            case "heading": {
                                const s = i;
                                r += this.renderer.heading(this.parseInline(s.tokens), s.depth, this.parseInline(s.tokens, this.textRenderer).replace(XH, (n, t) => "colon" === (t = t.toLowerCase()) ? ":" : "#" === t.charAt(0) ? "x" === t.charAt(1) ? String.fromCharCode(parseInt(t.substring(2), 16)) : String.fromCharCode(+t.substring(1)) : ""));
                                continue
                            }
                            case "code":
                                r += this.renderer.code(i.text, i.lang, !!i.escaped);
                                continue;
                            case "table": {
                                const s = i;
                                let a = "",
                                    l = "";
                                for (let u = 0; u < s.header.length; u++) l += this.renderer.tablecell(this.parseInline(s.header[u].tokens), {
                                    header: !0,
                                    align: s.align[u]
                                });
                                a += this.renderer.tablerow(l);
                                let c = "";
                                for (let u = 0; u < s.rows.length; u++) {
                                    const d = s.rows[u];
                                    l = "";
                                    for (let f = 0; f < d.length; f++) l += this.renderer.tablecell(this.parseInline(d[f].tokens), {
                                        header: !1,
                                        align: s.align[f]
                                    });
                                    c += this.renderer.tablerow(l)
                                }
                                r += this.renderer.table(a, c);
                                continue
                            }
                            case "blockquote": {
                                const a = this.parse(i.tokens);
                                r += this.renderer.blockquote(a);
                                continue
                            }
                            case "list": {
                                const s = i,
                                    a = s.ordered,
                                    l = s.start,
                                    c = s.loose;
                                let u = "";
                                for (let d = 0; d < s.items.length; d++) {
                                    const f = s.items[d],
                                        h = f.checked,
                                        p = f.task;
                                    let g = "";
                                    if (f.task) {
                                        const m = this.renderer.checkbox(!!h);
                                        c ? f.tokens.length > 0 && "paragraph" === f.tokens[0].type ? (f.tokens[0].text = m + " " + f.tokens[0].text, f.tokens[0].tokens && f.tokens[0].tokens.length > 0 && "text" === f.tokens[0].tokens[0].type && (f.tokens[0].tokens[0].text = m + " " + f.tokens[0].tokens[0].text)) : f.tokens.unshift({
                                            type: "text",
                                            text: m + " "
                                        }) : g += m + " "
                                    }
                                    g += this.parse(f.tokens, c), u += this.renderer.listitem(g, p, !!h)
                                }
                                r += this.renderer.list(u, a, l);
                                continue
                            }
                            case "html":
                                r += this.renderer.html(i.text, i.block);
                                continue;
                            case "paragraph":
                                r += this.renderer.paragraph(this.parseInline(i.tokens));
                                continue;
                            case "text": {
                                let s = i,
                                    a = s.tokens ? this.parseInline(s.tokens) : s.text;
                                for (; o + 1 < n.length && "text" === n[o + 1].type;) s = n[++o], a += "\n" + (s.tokens ? this.parseInline(s.tokens) : s.text);
                                r += t ? this.renderer.paragraph(a) : a;
                                continue
                            }
                            default: {
                                const s = 'Token with "' + i.type + '" type was not found.';
                                if (this.options.silent) return console.error(s), "";
                                throw new Error(s)
                            }
                        }
                    }
                    return r
                }
                parseInline(n, t) {
                    t = t || this.renderer;
                    let r = "";
                    for (let o = 0; o < n.length; o++) {
                        const i = n[o];
                        if (this.options.extensions && this.options.extensions.renderers && this.options.extensions.renderers[i.type]) {
                            const s = this.options.extensions.renderers[i.type].call({
                                parser: this
                            }, i);
                            if (!1 !== s || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(i.type)) {
                                r += s || "";
                                continue
                            }
                        }
                        switch (i.type) {
                            case "escape":
                            case "text":
                                r += t.text(i.text);
                                break;
                            case "html":
                                r += t.html(i.text);
                                break;
                            case "link":
                                r += t.link(i.href, i.title, this.parseInline(i.tokens, t));
                                break;
                            case "image":
                                r += t.image(i.href, i.title, i.text);
                                break;
                            case "strong":
                                r += t.strong(this.parseInline(i.tokens, t));
                                break;
                            case "em":
                                r += t.em(this.parseInline(i.tokens, t));
                                break;
                            case "codespan":
                                r += t.codespan(i.text);
                                break;
                            case "br":
                                r += t.br();
                                break;
                            case "del":
                                r += t.del(this.parseInline(i.tokens, t));
                                break;
                            default: {
                                const s = 'Token with "' + i.type + '" type was not found.';
                                if (this.options.silent) return console.error(s), "";
                                throw new Error(s)
                            }
                        }
                    }
                    return r
                }
            }
            class Su {
                options;
                constructor(n) {
                    this.options = n || ro
                }
                static passThroughHooks = new Set(["preprocess", "postprocess", "processAllTokens"]);
                preprocess(n) {
                    return n
                }
                postprocess(n) {
                    return n
                }
                processAllTokens(n) {
                    return n
                }
            }
            const io = new class x4 {
                defaults = {
                    async: !1,
                    breaks: !1,
                    extensions: null,
                    gfm: !0,
                    hooks: null,
                    pedantic: !1,
                    renderer: null,
                    silent: !1,
                    tokenizer: null,
                    walkTokens: null
                };
                options = this.setOptions;
                parse = this.#e(Rn.lex, Pn.parse);
                parseInline = this.#e(Rn.lexInline, Pn.parseInline);
                Parser = Pn;
                Renderer = oo;
                TextRenderer = Yg;
                Lexer = Rn;
                Tokenizer = Eu;
                Hooks = Su;
                constructor(...n) {
                    this.use(...n)
                }
                walkTokens(n, t) {
                    let r = [];
                    for (const o of n) switch (r = r.concat(t.call(this, o)), o.type) {
                        case "table": {
                            const i = o;
                            for (const s of i.header) r = r.concat(this.walkTokens(s.tokens, t));
                            for (const s of i.rows)
                                for (const a of s) r = r.concat(this.walkTokens(a.tokens, t));
                            break
                        }
                        case "list":
                            r = r.concat(this.walkTokens(o.items, t));
                            break;
                        default: {
                            const i = o;
                            this.defaults.extensions?.childTokens?.[i.type] ? this.defaults.extensions.childTokens[i.type].forEach(s => {
                                const a = i[s].flat(1 / 0);
                                r = r.concat(this.walkTokens(a, t))
                            }) : i.tokens && (r = r.concat(this.walkTokens(i.tokens, t)))
                        }
                    }
                    return r
                }
                use(...n) {
                    const t = this.defaults.extensions || {
                        renderers: {},
                        childTokens: {}
                    };
                    return n.forEach(r => {
                        const o = {
                            ...r
                        };
                        if (o.async = this.defaults.async || o.async || !1, r.extensions && (r.extensions.forEach(i => {
                                if (!i.name) throw new Error("extension name required");
                                if ("renderer" in i) {
                                    const s = t.renderers[i.name];
                                    t.renderers[i.name] = s ? function(...a) {
                                        let l = i.renderer.apply(this, a);
                                        return !1 === l && (l = s.apply(this, a)), l
                                    } : i.renderer
                                }
                                if ("tokenizer" in i) {
                                    if (!i.level || "block" !== i.level && "inline" !== i.level) throw new Error("extension level must be 'block' or 'inline'");
                                    const s = t[i.level];
                                    s ? s.unshift(i.tokenizer) : t[i.level] = [i.tokenizer], i.start && ("block" === i.level ? t.startBlock ? t.startBlock.push(i.start) : t.startBlock = [i.start] : "inline" === i.level && (t.startInline ? t.startInline.push(i.start) : t.startInline = [i.start]))
                                }
                                "childTokens" in i && i.childTokens && (t.childTokens[i.name] = i.childTokens)
                            }), o.extensions = t), r.renderer) {
                            const i = this.defaults.renderer || new oo(this.defaults);
                            for (const s in r.renderer) {
                                if (!(s in i)) throw new Error(`renderer '${s}' does not exist`);
                                if ("options" === s) continue;
                                const l = r.renderer[s],
                                    c = i[s];
                                i[s] = (...u) => {
                                    let d = l.apply(i, u);
                                    return !1 === d && (d = c.apply(i, u)), d || ""
                                }
                            }
                            o.renderer = i
                        }
                        if (r.tokenizer) {
                            const i = this.defaults.tokenizer || new Eu(this.defaults);
                            for (const s in r.tokenizer) {
                                if (!(s in i)) throw new Error(`tokenizer '${s}' does not exist`);
                                if (["options", "rules", "lexer"].includes(s)) continue;
                                const l = r.tokenizer[s],
                                    c = i[s];
                                i[s] = (...u) => {
                                    let d = l.apply(i, u);
                                    return !1 === d && (d = c.apply(i, u)), d
                                }
                            }
                            o.tokenizer = i
                        }
                        if (r.hooks) {
                            const i = this.defaults.hooks || new Su;
                            for (const s in r.hooks) {
                                if (!(s in i)) throw new Error(`hook '${s}' does not exist`);
                                if ("options" === s) continue;
                                const l = r.hooks[s],
                                    c = i[s];
                                i[s] = Su.passThroughHooks.has(s) ? u => {
                                    if (this.defaults.async) return Promise.resolve(l.call(i, u)).then(f => c.call(i, f));
                                    const d = l.call(i, u);
                                    return c.call(i, d)
                                } : (...u) => {
                                    let d = l.apply(i, u);
                                    return !1 === d && (d = c.apply(i, u)), d
                                }
                            }
                            o.hooks = i
                        }
                        if (r.walkTokens) {
                            const i = this.defaults.walkTokens,
                                s = r.walkTokens;
                            o.walkTokens = function(a) {
                                let l = [];
                                return l.push(s.call(this, a)), i && (l = l.concat(i.call(this, a))), l
                            }
                        }
                        this.defaults = {
                            ...this.defaults,
                            ...o
                        }
                    }), this
                }
                setOptions(n) {
                    return this.defaults = {
                        ...this.defaults,
                        ...n
                    }, this
                }
                lexer(n, t) {
                    return Rn.lex(n, t ?? this.defaults)
                }
                parser(n, t) {
                    return Pn.parse(n, t ?? this.defaults)
                }
                #e(n, t) {
                    return (r, o) => {
                        const i = {
                                ...o
                            },
                            s = {
                                ...this.defaults,
                                ...i
                            };
                        !0 === this.defaults.async && !1 === i.async && (s.silent || console.warn("marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."), s.async = !0);
                        const a = this.#t(!!s.silent, !!s.async);
                        if (typeof r > "u" || null === r) return a(new Error("marked(): input parameter is undefined or null"));
                        if ("string" != typeof r) return a(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(r) + ", string expected"));
                        if (s.hooks && (s.hooks.options = s), s.async) return Promise.resolve(s.hooks ? s.hooks.preprocess(r) : r).then(l => n(l, s)).then(l => s.hooks ? s.hooks.processAllTokens(l) : l).then(l => s.walkTokens ? Promise.all(this.walkTokens(l, s.walkTokens)).then(() => l) : l).then(l => t(l, s)).then(l => s.hooks ? s.hooks.postprocess(l) : l).catch(a);
                        try {
                            s.hooks && (r = s.hooks.preprocess(r));
                            let l = n(r, s);
                            s.hooks && (l = s.hooks.processAllTokens(l)), s.walkTokens && this.walkTokens(l, s.walkTokens);
                            let c = t(l, s);
                            return s.hooks && (c = s.hooks.postprocess(c)), c
                        } catch (l) {
                            return a(l)
                        }
                    }
                }
                #t(n, t) {
                    return r => {
                        if (r.message += "\nPlease report this to https://github.com/markedjs/marked.", n) {
                            const o = "<p>An error occurred:</p><pre>" + Bt(r.message + "", !0) + "</pre>";
                            return t ? Promise.resolve(o) : o
                        }
                        if (t) return Promise.reject(r);
                        throw r
                    }
                }
            };

            function X(e, n) {
                return io.parse(e, n)
            }
            X.options = X.setOptions = function(e) {
                return io.setOptions(e), YI(X.defaults = io.defaults), X
            }, X.getDefaults = function Hg() {
                return {
                    async: !1,
                    breaks: !1,
                    extensions: null,
                    gfm: !0,
                    hooks: null,
                    pedantic: !1,
                    renderer: null,
                    silent: !1,
                    tokenizer: null,
                    walkTokens: null
                }
            }, X.defaults = ro, X.use = function(...e) {
                return io.use(...e), YI(X.defaults = io.defaults), X
            }, X.walkTokens = function(e, n) {
                return io.walkTokens(e, n)
            }, X.parseInline = io.parseInline, X.Parser = Pn, X.parser = Pn.parse, X.Renderer = oo, X.TextRenderer = Yg, X.Lexer = Rn, X.lexer = Rn.lex, X.Tokenizer = Eu, X.Hooks = Su, X.parse = X;
            const S4 = ["*"];
            let dx = (() => {
                class e {
                    constructor() {
                        this._buttonClick$ = new ze, this.copied$ = this._buttonClick$.pipe(Zt(() => function FH(...e) {
                            const n = ta(e),
                                t = function D$(e, n) {
                                    return "number" == typeof kp(e) ? e.pop() : n
                                }(e, 1 / 0),
                                r = e;
                            return r.length ? 1 === r.length ? $t(r[0]) : hi(t)(Fe(r, n)) : an
                        }(R(!0), function BH(e = 0, n, t = $H) {
                            let r = -1;
                            return null != n && (gE(n) ? t = n : r = n), new Ie(o => {
                                let i = function UH(e) {
                                    return e instanceof Date && !isNaN(e)
                                }(e) ? +e - t.now() : e;
                                i < 0 && (i = 0);
                                let s = 0;
                                return t.schedule(function() {
                                    o.closed || (o.next(s++), 0 <= r ? this.schedule(void 0, r) : o.complete())
                                }, i)
                            })
                        }(3e3).pipe(ZM(!1)))), function HH(e, n = tr) {
                            return e = e ?? zH, Le((t, r) => {
                                let o, i = !0;
                                t.subscribe(Oe(r, s => {
                                    const a = n(s);
                                    (i || !e(o, a)) && (i = !1, o = a, r.next(s))
                                }))
                            })
                        }(), function WH(e, n, t) {
                            let r, o = !1;
                            return e && "object" == typeof e ? ({
                                    bufferSize: r = 1 / 0,
                                    windowTime: n = 1 / 0,
                                    refCount: o = !1,
                                    scheduler: t
                                } = e) : r = e ?? 1 / 0,
                                function qH(e = {}) {
                                    const {
                                        connector: n = (() => new ze),
                                        resetOnError: t = !0,
                                        resetOnComplete: r = !0,
                                        resetOnRefCountZero: o = !0
                                    } = e;
                                    return i => {
                                        let s, a, l, c = 0,
                                            u = !1,
                                            d = !1;
                                        const f = () => {
                                                a?.unsubscribe(), a = void 0
                                            },
                                            h = () => {
                                                f(), s = l = void 0, u = d = !1
                                            },
                                            p = () => {
                                                const g = s;
                                                h(), g?.unsubscribe()
                                            };
                                        return Le((g, m) => {
                                            c++, !d && !u && f();
                                            const y = l = l ?? n();
                                            m.add(() => {
                                                c--, 0 === c && !d && !u && (a = Bg(p, o))
                                            }), y.subscribe(m), !s && c > 0 && (s = new Ri({
                                                next: v => y.next(v),
                                                error: v => {
                                                    d = !0, f(), a = Bg(h, t, v), y.error(v)
                                                },
                                                complete: () => {
                                                    u = !0, f(), a = Bg(h, r), y.complete()
                                                }
                                            }), $t(g).subscribe(s))
                                        })(i)
                                    }
                                }({
                                    connector: () => new GH(r, n, t),
                                    resetOnError: !0,
                                    resetOnComplete: !1,
                                    resetOnRefCountZero: o
                                })
                        }(1)), this.copiedText$ = this.copied$.pipe(qM(!1), Z(t => t ? "Copied" : "Copy"))
                    }
                    onCopyToClipboardClick() {
                        this._buttonClick$.next()
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275cmp = Ln({
                        type: e,
                        selectors: [
                            ["markdown-clipboard"]
                        ],
                        standalone: !0,
                        features: [gc],
                        decls: 4,
                        vars: 7,
                        consts: [
                            [1, "markdown-clipboard-button", 3, "click"]
                        ],
                        template: function(r, o) {
                            1 & r && (O(0, "button", 0), Lh(1, "async"), Re("click", function() {
                                return o.onCopyToClipboardClick()
                            }), qe(2), Lh(3, "async"), F()), 2 & r && (Ns("copied", Vh(1, 3, o.copied$)), U(2), rt(Vh(3, 5, o.copiedText$)))
                        },
                        dependencies: [D0],
                        encapsulation: 2,
                        changeDetection: 0
                    })
                }
                return e
            })();
            const N4 = new M("CLIPBOARD_OPTIONS");
            var Xg = function(e) {
                return e.CommandLine = "command-line", e.LineHighlight = "line-highlight", e.LineNumbers = "line-numbers", e
            }(Xg || {});
            const fx = new M("MARKED_EXTENSIONS"),
                R4 = new M("MARKED_OPTIONS"),
                hx = new M("SECURITY_CONTEXT");
            let Kg = (() => {
                    class e {
                        get options() {
                            return this._options
                        }
                        set options(t) {
                            this._options = {
                                ...this.DEFAULT_MARKED_OPTIONS,
                                ...t
                            }
                        }
                        get renderer() {
                            return this.options.renderer
                        }
                        set renderer(t) {
                            this.options.renderer = t
                        }
                        constructor(t, r, o, i, s, a, l) {
                            this.clipboardOptions = t, this.extensions = r, this.platform = i, this.securityContext = s, this.http = a, this.sanitizer = l, this.DEFAULT_MARKED_OPTIONS = {
                                renderer: new oo
                            }, this.DEFAULT_KATEX_OPTIONS = {
                                delimiters: [{
                                    left: "$$",
                                    right: "$$",
                                    display: !0
                                }, {
                                    left: "$",
                                    right: "$",
                                    display: !1
                                }, {
                                    left: "\\(",
                                    right: "\\)",
                                    display: !1
                                }, {
                                    left: "\\begin{equation}",
                                    right: "\\end{equation}",
                                    display: !0
                                }, {
                                    left: "\\begin{align}",
                                    right: "\\end{align}",
                                    display: !0
                                }, {
                                    left: "\\begin{alignat}",
                                    right: "\\end{alignat}",
                                    display: !0
                                }, {
                                    left: "\\begin{gather}",
                                    right: "\\end{gather}",
                                    display: !0
                                }, {
                                    left: "\\begin{CD}",
                                    right: "\\end{CD}",
                                    display: !0
                                }, {
                                    left: "\\[",
                                    right: "\\]",
                                    display: !0
                                }]
                            }, this.DEFAULT_MERMAID_OPTIONS = {
                                startOnLoad: !1
                            }, this.DEFAULT_CLIPBOARD_OPTIONS = {
                                buttonComponent: void 0
                            }, this.DEFAULT_PARSE_OPTIONS = {
                                decodeHtml: !1,
                                inline: !1,
                                emoji: !1,
                                mermaid: !1,
                                markedOptions: void 0,
                                disableSanitizer: !1
                            }, this.DEFAULT_RENDER_OPTIONS = {
                                clipboard: !1,
                                clipboardOptions: void 0,
                                katex: !1,
                                katexOptions: void 0,
                                mermaid: !1,
                                mermaidOptions: void 0
                            }, this._reload$ = new ze, this.reload$ = this._reload$.asObservable(), this.options = o
                        }
                        parse(t, r = this.DEFAULT_PARSE_OPTIONS) {
                            const {
                                decodeHtml: o,
                                inline: i,
                                emoji: s,
                                mermaid: a,
                                disableSanitizer: l
                            } = r, c = {
                                ...this.options,
                                ...r.markedOptions
                            }, u = c.renderer || this.renderer || new oo;
                            this.extensions && (this.renderer = this.extendsRendererForExtensions(u)), a && (this.renderer = this.extendsRendererForMermaid(u));
                            const d = this.trimIndentation(t),
                                f = o ? this.decodeHtml(d) : d,
                                h = s ? this.parseEmoji(f) : f,
                                p = this.parseMarked(h, c, i);
                            return (l ? p : this.sanitizer.sanitize(this.securityContext, p)) || ""
                        }
                        render(t, r = this.DEFAULT_RENDER_OPTIONS, o) {
                            const {
                                clipboard: i,
                                clipboardOptions: s,
                                katex: a,
                                katexOptions: l,
                                mermaid: c,
                                mermaidOptions: u
                            } = r;
                            i && this.renderClipboard(t, o, {
                                ...this.DEFAULT_CLIPBOARD_OPTIONS,
                                ...this.clipboardOptions,
                                ...s
                            }), a && this.renderKatex(t, {
                                ...this.DEFAULT_KATEX_OPTIONS,
                                ...l
                            }), c && this.renderMermaid(t, {
                                ...this.DEFAULT_MERMAID_OPTIONS,
                                ...u
                            }), this.highlight(t)
                        }
                        reload() {
                            this._reload$.next()
                        }
                        getSource(t) {
                            if (!this.http) throw new Error("[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information");
                            return this.http.get(t, {
                                responseType: "text"
                            }).pipe(Z(r => this.handleExtension(t, r)))
                        }
                        highlight(t) {
                            if (!Yr(this.platform) || typeof Prism > "u" || typeof Prism.highlightAllUnder > "u") return;
                            t || (t = document);
                            const r = t.querySelectorAll('pre code:not([class*="language-"])');
                            Array.prototype.forEach.call(r, o => o.classList.add("language-none")), Prism.highlightAllUnder(t)
                        }
                        decodeHtml(t) {
                            if (!Yr(this.platform)) return t;
                            const r = document.createElement("textarea");
                            return r.innerHTML = t, r.value
                        }
                        extendsRendererForExtensions(t) {
                            const r = t;
                            return !0 === r.\u0275NgxMarkdownRendererExtendedForExtensions || (this.extensions?.length > 0 && X.use(...this.extensions), r.\u0275NgxMarkdownRendererExtendedForExtensions = !0), t
                        }
                        extendsRendererForMermaid(t) {
                            const r = t;
                            if (!0 === r.\u0275NgxMarkdownRendererExtendedForMermaid) return t;
                            const o = t.code;
                            return t.code = function(i, s, a) {
                                return "mermaid" === s ? `<div class="mermaid">${i}</div>` : o.call(this, i, s, a)
                            }, r.\u0275NgxMarkdownRendererExtendedForMermaid = !0, t
                        }
                        handleExtension(t, r) {
                            const o = t.lastIndexOf("://"),
                                i = o > -1 ? t.substring(o + 4) : t,
                                s = i.lastIndexOf("/"),
                                a = s > -1 ? i.substring(s + 1).split("?")[0] : "",
                                l = a.lastIndexOf("."),
                                c = l > -1 ? a.substring(l + 1) : "";
                            return c && "md" !== c ? "```" + c + "\n" + r + "\n```" : r
                        }
                        parseMarked(t, r, o = !1) {
                            if (r.renderer) {
                                const i = {
                                    ...r.renderer
                                };
                                delete i.\u0275NgxMarkdownRendererExtendedForExtensions, delete i.\u0275NgxMarkdownRendererExtendedForMermaid, delete r.renderer, X.use({
                                    renderer: i
                                })
                            }
                            return o ? X.parseInline(t, r) : X.parse(t, r)
                        }
                        parseEmoji(t) {
                            if (!Yr(this.platform)) return t;
                            if (typeof joypixels > "u" || typeof joypixels.shortnameToUnicode > "u") throw new Error("[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information");
                            return joypixels.shortnameToUnicode(t)
                        }
                        renderKatex(t, r) {
                            if (Yr(this.platform)) {
                                if (typeof katex > "u" || typeof renderMathInElement > "u") throw new Error("[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information");
                                renderMathInElement(t, r)
                            }
                        }
                        renderClipboard(t, r, o) {
                            if (!Yr(this.platform)) return;
                            if (typeof ClipboardJS > "u") throw new Error("[ngx-markdown] When using the `clipboard` attribute you *have to* include Clipboard files to `angular.json` or use imports. See README for more information");
                            if (!r) throw new Error("[ngx-markdown] When using the `clipboard` attribute you *have to* provide the `viewContainerRef` parameter to `MarkdownService.render()` function");
                            const {
                                buttonComponent: i,
                                buttonTemplate: s
                            } = o, a = t.querySelectorAll("pre");
                            for (let l = 0; l < a.length; l++) {
                                const c = a.item(l),
                                    u = document.createElement("div");
                                u.style.position = "relative", c.parentNode.insertBefore(u, c), u.appendChild(c);
                                const d = document.createElement("div");
                                let f, h;
                                d.style.position = "absolute", d.style.top = ".5em", d.style.right = ".5em", d.style.opacity = "0", d.style.transition = "opacity 250ms ease-out", u.insertAdjacentElement("beforeend", d), c.onmouseover = () => d.style.opacity = "1", c.onmouseout = () => d.style.opacity = "0", f = i ? r.createComponent(i).hostView : s ? r.createEmbeddedView(s) : r.createComponent(dx).hostView, f.rootNodes.forEach(p => {
                                    p.onmouseover = () => d.style.opacity = "1", d.appendChild(p), h = new ClipboardJS(p, {
                                        text: () => c.innerText
                                    })
                                }), f.onDestroy(() => h.destroy())
                            }
                        }
                        renderMermaid(t, r = this.DEFAULT_MERMAID_OPTIONS) {
                            if (!Yr(this.platform)) return;
                            if (typeof mermaid > "u" || typeof mermaid.initialize > "u") throw new Error("[ngx-markdown] When using the `mermaid` attribute you *have to* include Mermaid files to `angular.json` or use imports. See README for more information");
                            const o = t.querySelectorAll(".mermaid");
                            0 !== o.length && (mermaid.initialize(r), mermaid.run({
                                nodes: o
                            }))
                        }
                        trimIndentation(t) {
                            if (!t) return "";
                            let r;
                            return t.split("\n").map(o => {
                                let i = r;
                                return o.length > 0 && (i = isNaN(i) ? o.search(/\S|$/) : Math.min(o.search(/\S|$/), i)), isNaN(r) && (r = i), i ? o.substring(i) : o
                            }).join("\n")
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(x(N4, 8), x(fx, 8), x(R4, 8), x(Hn), x(hx), x(sg, 8), x(Ap))
                        };
                        static #t = this.\u0275prov = I({
                            token: e,
                            factory: e.\u0275fac
                        })
                    }
                    return e
                })(),
                px = (() => {
                    class e {
                        get disableSanitizer() {
                            return this._disableSanitizer
                        }
                        set disableSanitizer(t) {
                            this._disableSanitizer = this.coerceBooleanProperty(t)
                        }
                        get inline() {
                            return this._inline
                        }
                        set inline(t) {
                            this._inline = this.coerceBooleanProperty(t)
                        }
                        get clipboard() {
                            return this._clipboard
                        }
                        set clipboard(t) {
                            this._clipboard = this.coerceBooleanProperty(t)
                        }
                        get emoji() {
                            return this._emoji
                        }
                        set emoji(t) {
                            this._emoji = this.coerceBooleanProperty(t)
                        }
                        get katex() {
                            return this._katex
                        }
                        set katex(t) {
                            this._katex = this.coerceBooleanProperty(t)
                        }
                        get mermaid() {
                            return this._mermaid
                        }
                        set mermaid(t) {
                            this._mermaid = this.coerceBooleanProperty(t)
                        }
                        get lineHighlight() {
                            return this._lineHighlight
                        }
                        set lineHighlight(t) {
                            this._lineHighlight = this.coerceBooleanProperty(t)
                        }
                        get lineNumbers() {
                            return this._lineNumbers
                        }
                        set lineNumbers(t) {
                            this._lineNumbers = this.coerceBooleanProperty(t)
                        }
                        get commandLine() {
                            return this._commandLine
                        }
                        set commandLine(t) {
                            this._commandLine = this.coerceBooleanProperty(t)
                        }
                        constructor(t, r, o) {
                            this.element = t, this.markdownService = r, this.viewContainerRef = o, this.error = new _e, this.load = new _e, this.ready = new _e, this._clipboard = !1, this._commandLine = !1, this._disableSanitizer = !1, this._emoji = !1, this._inline = !1, this._katex = !1, this._lineHighlight = !1, this._lineNumbers = !1, this._mermaid = !1, this.destroyed$ = new ze
                        }
                        ngOnChanges() {
                            this.loadContent()
                        }
                        loadContent() {
                            null == this.data ? null == this.src || this.handleSrc() : this.handleData()
                        }
                        ngAfterViewInit() {
                            !this.data && !this.src && this.handleTransclusion(), this.markdownService.reload$.pipe(QM(this.destroyed$)).subscribe(() => this.loadContent())
                        }
                        ngOnDestroy() {
                            this.destroyed$.next(), this.destroyed$.complete()
                        }
                        render(t, r = !1) {
                            var o = this;
                            return function xr(e) {
                                return function() {
                                    var n = this,
                                        t = arguments;
                                    return new Promise(function(r, o) {
                                        var i = e.apply(n, t);

                                        function s(l) {
                                            Ai(i, r, o, s, a, "next", l)
                                        }

                                        function a(l) {
                                            Ai(i, r, o, s, a, "throw", l)
                                        }
                                        s(void 0)
                                    })
                                }
                            }(function*() {
                                const i = {
                                        decodeHtml: r,
                                        inline: o.inline,
                                        emoji: o.emoji,
                                        mermaid: o.mermaid,
                                        disableSanitizer: o.disableSanitizer
                                    },
                                    s = {
                                        clipboard: o.clipboard,
                                        clipboardOptions: {
                                            buttonComponent: o.clipboardButtonComponent,
                                            buttonTemplate: o.clipboardButtonTemplate
                                        },
                                        katex: o.katex,
                                        katexOptions: o.katexOptions,
                                        mermaid: o.mermaid,
                                        mermaidOptions: o.mermaidOptions
                                    },
                                    a = yield o.markdownService.parse(t, i);
                                o.element.nativeElement.innerHTML = a, o.handlePlugins(), o.markdownService.render(o.element.nativeElement, s, o.viewContainerRef), o.ready.emit()
                            })()
                        }
                        coerceBooleanProperty(t) {
                            return null != t && "false" != `${String(t)}`
                        }
                        handleData() {
                            this.render(this.data)
                        }
                        handleSrc() {
                            this.markdownService.getSource(this.src).subscribe({
                                next: t => {
                                    this.render(t).then(() => {
                                        this.load.emit(t)
                                    })
                                },
                                error: t => this.error.emit(t)
                            })
                        }
                        handleTransclusion() {
                            this.render(this.element.nativeElement.innerHTML, !0)
                        }
                        handlePlugins() {
                            this.commandLine && (this.setPluginClass(this.element.nativeElement, Xg.CommandLine), this.setPluginOptions(this.element.nativeElement, {
                                dataFilterOutput: this.filterOutput,
                                dataHost: this.host,
                                dataPrompt: this.prompt,
                                dataOutput: this.output,
                                dataUser: this.user
                            })), this.lineHighlight && this.setPluginOptions(this.element.nativeElement, {
                                dataLine: this.line,
                                dataLineOffset: this.lineOffset
                            }), this.lineNumbers && (this.setPluginClass(this.element.nativeElement, Xg.LineNumbers), this.setPluginOptions(this.element.nativeElement, {
                                dataStart: this.start
                            }))
                        }
                        setPluginClass(t, r) {
                            const o = t.querySelectorAll("pre");
                            for (let i = 0; i < o.length; i++) {
                                const s = r instanceof Array ? r : [r];
                                o.item(i).classList.add(...s)
                            }
                        }
                        setPluginOptions(t, r) {
                            const o = t.querySelectorAll("pre");
                            for (let i = 0; i < o.length; i++) Object.keys(r).forEach(s => {
                                const a = r[s];
                                if (a) {
                                    const l = this.toLispCase(s);
                                    o.item(i).setAttribute(l, a.toString())
                                }
                            })
                        }
                        toLispCase(t) {
                            const r = t.match(/([A-Z])/g);
                            if (!r) return t;
                            let o = t.toString();
                            for (let i = 0, s = r.length; i < s; i++) o = o.replace(new RegExp(r[i]), "-" + r[i].toLowerCase());
                            return "-" === o.slice(0, 1) && (o = o.slice(1)), o
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)(D(ut), D(Kg), D(kt))
                        };
                        static #t = this.\u0275cmp = Ln({
                            type: e,
                            selectors: [
                                ["markdown"],
                                ["", "markdown", ""]
                            ],
                            inputs: {
                                data: "data",
                                src: "src",
                                disableSanitizer: "disableSanitizer",
                                inline: "inline",
                                clipboard: "clipboard",
                                clipboardButtonComponent: "clipboardButtonComponent",
                                clipboardButtonTemplate: "clipboardButtonTemplate",
                                emoji: "emoji",
                                katex: "katex",
                                katexOptions: "katexOptions",
                                mermaid: "mermaid",
                                mermaidOptions: "mermaidOptions",
                                lineHighlight: "lineHighlight",
                                line: "line",
                                lineOffset: "lineOffset",
                                lineNumbers: "lineNumbers",
                                start: "start",
                                commandLine: "commandLine",
                                filterOutput: "filterOutput",
                                host: "host",
                                prompt: "prompt",
                                output: "output",
                                user: "user"
                            },
                            outputs: {
                                error: "error",
                                load: "load",
                                ready: "ready"
                            },
                            standalone: !0,
                            features: [At, gc],
                            ngContentSelectors: S4,
                            decls: 1,
                            vars: 0,
                            template: function(r, o) {
                                1 & r && (function nw(e) {
                                    const n = _()[Ee][Ke];
                                    if (!n.projection) {
                                        const r = n.projection = function Ga(e, n) {
                                                const t = [];
                                                for (let r = 0; r < e; r++) t.push(n);
                                                return t
                                            }(e ? e.length : 1, null),
                                            o = r.slice();
                                        let i = n.child;
                                        for (; null !== i;) {
                                            const s = e ? vk(i, e) : 0;
                                            null !== s && (o[s] ? o[s].projectionNext = i : r[s] = i, o[s] = i), i = i.next
                                        }
                                    }
                                }(), function rw(e, n = 0, t) {
                                    const r = _(),
                                        o = W(),
                                        i = ko(o, j + e, 16, null, t || null);
                                    null === i.projection && (i.projection = n), Id(), (!r[Tt] || Eo()) && 32 & ~i.flags && function xN(e, n, t) {
                                        Jv(n[P], 0, n, t, _f(e, t, n), Wv(t.parent || n[Ke], t, n))
                                    }(o, r, i)
                                }(0))
                            },
                            encapsulation: 2
                        })
                    }
                    return e
                })();

            function U4(e) {
                return [Kg, e?.loader ?? [], e?.clipboardOptions ?? [], e?.markedOptions ?? [], {
                    provide: fx,
                    useValue: e?.markedExtensions ?? []
                }, {
                    provide: hx,
                    useValue: e?.sanitize ?? Rt.HTML
                }]
            }
            let B4 = (() => {
                class e {
                    static forRoot(t) {
                        return {
                            ngModule: e,
                            providers: [U4(t)]
                        }
                    }
                    static forChild() {
                        return {
                            ngModule: e
                        }
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)
                    };
                    static #t = this.\u0275mod = zt({
                        type: e
                    });
                    static #n = this.\u0275inj = xt({
                        imports: [b0]
                    })
                }
                return e
            })();
            var gx;
            ! function(e) {
                let n;
                var o;
                let t, r;
                (o = n = e.SecurityLevel || (e.SecurityLevel = {})).Strict = "strict", o.Loose = "loose", o.Antiscript = "antiscript", o.Sandbox = "sandbox",
                    function(o) {
                        o.Base = "base", o.Forest = "forest", o.Dark = "dark", o.Default = "default", o.Neutral = "neutral"
                    }(t = e.Theme || (e.Theme = {})),
                    function(o) {
                        o[o.Debug = 1] = "Debug", o[o.Info = 2] = "Info", o[o.Warn = 3] = "Warn", o[o.Error = 4] = "Error", o[o.Fatal = 5] = "Fatal"
                    }(r = e.LogLevel || (e.LogLevel = {}))
            }(gx || (gx = {}));
            const H4 = (e, n) => ({
                    "--color1": e,
                    "--color2": n
                }),
                z4 = e => ({
                    "background-image": e
                }),
                G4 = (e, n, t, r, o, i, s, a) => ({
                    online: e,
                    idle: n,
                    dnd: t,
                    offline: r,
                    streaming: o,
                    invisible: i,
                    unknown: s,
                    default: a
                });

            function q4(e, n) {
                if (1 & e && Ce(0, "img", 11), 2 & e) {
                    const t = we(2);
                    xn("src", "https://cdn.discordapp.com/avatar-decoration-presets/", null == t.userData || null == t.userData.user || null == t.userData.user.avatar_decoration_data ? null : t.userData.user.avatar_decoration_data.asset, ".png", Ct)
                }
            }

            function W4(e, n) {
                if (1 & e && (O(0, "div", 16)(1, "a", 30), Ce(2, "img", 31), O(3, "div", 32), qe(4), F()()()), 2 & e) {
                    const t = n.$implicit,
                        r = we(2);
                    U(), In("href", t.link || "", Ct), U(), xn("src", "", r.apiUrl + "badge/" + t.icon, ".png", Ct), In("alt", t.id), U(2), rt(t.description)
                }
            }

            function Z4(e, n) {
                1 & e && (il(), O(0, "svg", 20), Ce(1, "path", 33), F()), 2 & e && wt("fill", we(2).statusColor)
            }

            function Q4(e, n) {
                1 & e && (il(), O(0, "svg", 21), Ce(1, "path", 34), F()), 2 & e && wt("fill", we(2).statusColor)
            }

            function Y4(e, n) {
                1 & e && (il(), O(0, "svg", 22), Ce(1, "path", 35), F()), 2 & e && wt("fill", we(2).statusColor)
            }

            function X4(e, n) {
                if (1 & e && (O(0, "div", 25)(1, "div", 36), qe(2, "About Me"), F(), Ce(3, "markdown", 37), F()), 2 & e) {
                    const t = we(2);
                    U(3), pr("data", t.userBioFormatted)("inline", !1)
                }
            }

            function K4(e, n) {
                if (1 & e) {
                    const t = qr();
                    O(0, "img", 44), Re("error", function(o) {
                        return jn(t), $n(we(5).handleImageError(o))
                    }), F()
                }
                if (2 & e) {
                    const t = we(2).$implicit,
                        r = we(3);
                    In("alt", t.type), pr("src", "https://i.scdn.co/image/" + r.getActivityImageId((null == t.assets ? null : t.assets.small_image) || ""), Ct)
                }
            }

            function J4(e, n) {
                if (1 & e) {
                    const t = qr();
                    O(0, "a", 40)(1, "img", 42), Re("error", function(o) {
                        return jn(t), $n(we(4).handleImageError(o))
                    }), F(), Ft(2, K4, 1, 2, "img", 43), F()
                }
                if (2 & e) {
                    const t = we().$implicit,
                        r = we(3);
                    xn("href", "https://open.spotify.com/track/", t.sync_id, "", Ct), U(), In("alt", t.type), pr("src", "https://i.scdn.co/image/" + r.getActivityImageId((null == t.assets ? null : t.assets.large_image) || ""), Ct), U(), Vt(2, null != t.assets && t.assets.small_image ? 2 : -1)
                }
            }

            function e5(e, n) {
                if (1 & e) {
                    const t = qr();
                    O(0, "img", 44), Re("error", function(o) {
                        return jn(t), $n(we(5).handleImageError(o))
                    }), F()
                }
                if (2 & e) {
                    const t = we(2).$implicit;
                    pc("src", "https://cdn.discordapp.com/app-assets/", t.application_id, "/", null == t.assets ? null : t.assets.small_image, ".png", Ct), In("alt", t.type)
                }
            }

            function t5(e, n) {
                if (1 & e) {
                    const t = qr();
                    O(0, "img", 42), Re("error", function(o) {
                        return jn(t), $n(we(4).handleImageError(o))
                    }), F(), Ft(1, e5, 1, 4, "img", 43)
                }
                if (2 & e) {
                    const t = we().$implicit;
                    pc("src", "https://cdn.discordapp.com/app-assets/", t.application_id, "/", null == t.assets ? null : t.assets.large_image, ".png", Ct), In("alt", t.type), U(), Vt(1, null != t.assets && t.assets.small_image ? 1 : -1)
                }
            }

            function n5(e, n) {
                if (1 & e && (O(0, "p", 45), qe(1), F(), O(2, "a", 46), qe(3), F()), 2 & e) {
                    const t = we().$implicit;
                    U(), rt(t.name), U(), xn("href", "https://open.spotify.com/track/", t.sync_id, "", Ct), U(), rt(t.details)
                }
            }

            function r5(e, n) {
                if (1 & e && (O(0, "p", 47), qe(1), F(), O(2, "p"), qe(3), F()), 2 & e) {
                    const t = we().$implicit;
                    U(), rt(t.name), U(2), rt(t.details)
                }
            }

            function o5(e, n) {
                if (1 & e && (O(0, "div", 38)(1, "div", 39), Ft(2, J4, 3, 5, "a", 40)(3, t5, 2, 5), F(), O(4, "div", 41), Ft(5, n5, 4, 4)(6, r5, 4, 2), O(7, "p"), qe(8), F(), O(9, "p"), qe(10), F()()()), 2 & e) {
                    const t = n.$implicit;
                    U(2), Vt(2, "Spotify" === t.name ? 2 : 3), U(3), Vt(5, "Spotify" === t.name ? 5 : 6), U(3), rt(t.state), U(2), rt(null == t.timestamps ? null : t.timestamps.start)
                }
            }

            function i5(e, n) {
                if (1 & e && (O(0, "div", 26)(1, "div", 36), qe(2), F(), lc(3, o5, 11, 4, "div", 38, ac), F()), 2 & e) {
                    const t = we(2);
                    U(2), rt(t.lanyardActivities.length > 1 ? "Activities" : "Activity"), U(), cc(t.lanyardActivities)
                }
            }

            function s5(e, n) {
                if (1 & e && (O(0, "div", 49), Ce(1, "img", 50), O(2, "div", 51), qe(3), F()()), 2 & e) {
                    const t = n.$implicit;
                    U(), xn("src", "../../../assets/images/connections/", t.type, ".svg", Ct), In("alt", t.type), U(2), rt(t.name)
                }
            }

            function a5(e, n) {
                if (1 & e && (O(0, "div", 27)(1, "div", 36), qe(2, "Connected accounts"), F(), O(3, "div", 48), lc(4, s5, 4, 4, "div", 49, ac), F()()), 2 & e) {
                    const t = we(2);
                    U(4), cc(null == t.userData ? null : t.userData.connected_accounts)
                }
            }

            function l5(e, n) {
                if (1 & e) {
                    const t = qr();
                    O(0, "div", 4)(1, "div", 5)(2, "div", 6), Ce(3, "div", 7), F(), O(4, "div", 8)(5, "div", 9)(6, "a", 10), Ft(7, q4, 1, 2, "img", 11), O(8, "div", 12), Ce(9, "img", 13)(10, "div", 14), F()(), O(11, "div", 15), lc(12, W4, 5, 5, "div", 16, ac), F()(), O(14, "div", 17)(15, "div", 18)(16, "p"), qe(17), F(), O(18, "div", 19), Ft(19, Z4, 2, 1, ":svg:svg", 20)(20, Q4, 2, 1, ":svg:svg", 21)(21, Y4, 2, 1, ":svg:svg", 22), F()(), O(22, "div", 23)(23, "p"), qe(24), F()(), O(25, "div", 24)(26, "p"), qe(27), F()(), Ce(28, "hr"), Ft(29, X4, 4, 2, "div", 25)(30, i5, 5, 1, "div", 26)(31, a5, 6, 0, "div", 27), O(32, "div", 28)(33, "input", 29), Oh("ngModelChange", function(o) {
                        jn(t);
                        const i = we();
                        return function Aw(e, n) {
                            const t = aC(e);
                            return t && e.set(n), t
                        }(i.message, o) || (i.message = o), $n(o)
                    }), Re("keyup.enter", function() {
                        return jn(t), $n(we().sendMessage())
                    }), F()()()()()()
                }
                if (2 & e) {
                    const t = we();
                    U(), pr("ngStyle", Pw(19, H4, t.themesColor[0], t.themesColor[1])), U(2), pr("ngStyle", function Rw(e, n, t, r) {
                        return Fw(_(), lt(), e, n, t, r)
                    }(22, z4, "url(" + t.apiUrl + "banner/" + t.ProfileId + ")")), U(3), xn("href", "https://discord.com/users/", t.ProfileId, "", Ct), U(), Vt(7, null != t.userData && null != t.userData.user && null != t.userData.user.avatar_decoration_data && t.userData.user.avatar_decoration_data.asset ? 7 : -1), U(2), In("src", t.apiUrl + "avatar/" + t.ProfileId + ".jpg", Ct), U(), pr("ngClass", function kw(e, n, t, r, o, i, s, a, l, c, u) {
                        const d = lt() + e,
                            f = _(),
                            h = Gt(f, d, t, r, o, i);
                        return Gt(f, d + 4, s, a, l, c) || h ? bn(f, d + 8, u ? n.call(u, t, r, o, i, s, a, l, c) : n(t, r, o, i, s, a, l, c)) : function Is(e, n) {
                            return e[n]
                        }(f, d + 8)
                    }(24, G4, "online" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "idle" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "dnd" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "offline" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "streaming" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "invisible" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), "unknown" === (null == t.lanyardData || null == t.lanyardData.d ? null : t.lanyardData.d.discord_status), !(null != t.lanyardData && null != t.lanyardData.d && t.lanyardData.d.discord_status))), U(2), cc(null == t.userData ? null : t.userData.badges), U(5), rt((null == t.userData || null == t.userData.user ? null : t.userData.user.global_name) || (null == t.userData || null == t.userData.user ? null : t.userData.user.username)), U(2), Vt(19, null != t.lanyardData && null != t.lanyardData.d && t.lanyardData.d.active_on_discord_desktop ? 19 : -1), U(), Vt(20, null != t.lanyardData && null != t.lanyardData.d && t.lanyardData.d.active_on_discord_web ? 20 : -1), U(), Vt(21, null != t.lanyardData && null != t.lanyardData.d && t.lanyardData.d.active_on_discord_mobile ? 21 : -1), U(3), rt(null == t.userData || null == t.userData.user ? null : t.userData.user.username), U(3), rt((null == t.userData || null == t.userData.user_profile ? null : t.userData.user_profile.pronouns) || ""), U(2), Vt(29, (null == t.userData || null == t.userData.user_profile ? null : t.userData.user_profile.bio.length) > 0 ? 29 : -1), U(), Vt(30, t.lanyardActivities.length > 0 ? 30 : -1), U(), Vt(31, (null == t.userData ? null : t.userData.connected_accounts.length) > 0 ? 31 : -1), U(2), xn("placeholder", "Send a message to @", null == t.userData || null == t.userData.user ? null : t.userData.user.username, ""), Nh("ngModel", t.message)
                }
            }
            let c5 = (() => {
                class e {782
                    constructor(t, r) {
                        this.discordApiService = t, this.lanyardService = r, this.ProfileId = "998545961548783656", this.userId = "998545961548783656", this.apiUrl = Ti_apiUrl, this.userDataStatus = !1, this.themesColor = [], this.message = "", this.lanyardActivities = [], this.statusColor = "#43b581"
                    }
                    ngOnInit() {
                        this.getDiscordUserData(), this.getLanyardData()
                    }
                    getDiscordUserData() {
                        this.discordApiService.getDiscordUser(this.ProfileId).subscribe({
                            next: t => {
                                this.userDataStatus = !0, this.userData = t, this.userBioFormatted = this.userData.user_profile?.bio?.replace(/\n/g, "<br>");
                                const r = this.userData.user_profile?.theme_colors || [];
                                this.themesColor = 0 === r.length ? ["#5C5C5C", "#5C5C5C"] : r.map(o => "#" + o.toString(16).padStart(6, "0").toUpperCase())
                            },
                            error: t => {
                                this.userDataStatus = !1, console.log(t)
                            }
                        }).add(() => {
                            window.loadAtropos()
                        })
                    }
                    getLanyardData() {
                        this.lanyardService.setInitialData(this.ProfileId), this.lanyardService.setupWebSocket(), this.lanyardService.getLanyardData().subscribe({
                            next: t => {
                                switch (this.lanyardData = t, this.lanyardActivities = this.lanyardData.d?.activities || [], this.lanyardActivities.forEach(r => {
                                        if (r.timestamps) {
                                            const o = new Date(r.timestamps.start || 0),
                                                s = (new Date).getTime() - o.getTime(),
                                                a = Math.floor(s / 36e5),
                                                l = Math.floor(s % 36e5 / 6e4);
                                            let c = "";
                                            a > 0 && (c += `${a} ${1===a?"hour":"hours"}`), l > 0 && (c += "" !== c ? ` and ${l} ${1===l?"minute elapsed":"minutes elapsed"}` : `${l} ${1===l?"minute elapsed":"minutes elapsed"}`), r.timestamps.start = c || ""
                                        }
                                    }), this.lanyardData.d?.discord_status) {
                                    case "online":
                                        this.statusColor = "#43b581";
                                        break;
                                    case "idle":
                                        this.statusColor = "#faa61a";
                                        break;
                                    case "dnd":
                                        this.statusColor = "#f04747";
                                        break;
                                    case "offline":
                                    case "invisible":
                                    case "unknown":
                                    default:
                                        this.statusColor = "#747f8d";
                                        break;
                                    case "streaming":
                                        this.statusColor = "#593695"
                                }
                            },
                            error: t => {
                                console.log(t)
                            }
                        })
                    }
                    getActivityImageId(t) {
                        return t && t.startsWith("spotify:") ? t.split(":")[1] : t
                    }
                    sendMessage() {
                        window.open(`https://discord.com/users/${this.userId}`, "_blank"), this.message = ""
                    }
                    handleImageError(t) {
                        t.target.src = "../../../assets/images/no-image-found.jpg"
                    }
                    static #e = this.\u0275fac = function(r) {
                        return new(r || e)(D(PH), D(kH))
                    };
                    static #t = this.\u0275cmp = Ln({
                        type: e,
                        selectors: [
                            ["app-card-profile"]
                        ],
                        inputs: {
                            ProfileId: "ProfileId"
                        },
                        decls: 5,
                        vars: 1,
                        consts: [
                            [1, "atropos", "atropos-card"],
                            [1, "atropos-scale"],
                            [1, "atropos-rotate"],
                            [1, "atropos-inner"],
                            ["data-atropos-opacity", "0.9;1", 1, "my-[0.45rem]"],
                            [1, "card", "nitro-card", 3, "ngStyle"],
                            [1, "card-header"],
                            [1, "banner-img", 3, "ngStyle"],
                            [1, "card-body"],
                            ["data-atropos-offset", "2.5", 1, "profile-header"],
                            ["target", "_blank", 3, "href"],
                            ["alt", "Avatar decoration", 1, "avatar-decoration", 3, "src"],
                            [1, "profile-logo"],
                            ["alt", "Avatar", 3, "src"],
                            [1, "presence-state", 3, "ngClass"],
                            [1, "badges-container"],
                            [1, "badge-item"],
                            ["data-atropos-offset", "2.5", 1, "profile-body"],
                            [1, "global-name", "flex", "justify-between", "items-center"],
                            [1, "flex", "flex-wrap", "gap-2", "items-center"],
                            ["aria-label", "Desktop", "height", "20", "width", "20", "viewBox", "0 0 24 24"],
                            ["aria-label", "Web", "height", "20", "width", "20", "viewBox", "0 0 24 24"],
                            ["aria-label", "Mobile", "height", "18", "width", "18", "viewBox", "0 0 1000 1500"],
                            [1, "username"],
                            [1, "pronouns"],
                            [1, "basic-infos"],
                            [1, "activities"],
                            [1, "connected-accounts"],
                            [1, "message"],
                            ["type", "text", 3, "ngModelChange", "keyup.enter", "placeholder", "ngModel"],
                            ["target", "_blank", 1, "badge-link", 3, "href"],
                            [3, "src", "alt"],
                            [1, "tooltip", "tooltip-up"],
                            ["d", "M4 2.5c-1.103 0-2 .897-2 2v11c0 1.104.897 2 2 2h7v2H7v2h10v-2h-4v-2h7c1.103 0 2-.896 2-2v-11c0-1.103-.897-2-2-2H4Zm16 2v9H4v-9h16Z"],
                            ["d", "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z"],
                            ["d", "M 187 0 L 813 0 C 916.277 0 1000 83.723 1000 187 L 1000 1313 C 1000 1416.277 916.277 1500 813 1500 L 187 1500 C 83.723 1500 0 1416.277 0 1313 L 0 187 C 0 83.723 83.723 0 187 0 Z M 125 1000 L 875 1000 L 875 250 L 125 250 Z M 500 1125 C 430.964 1125 375 1180.964 375 1250 C 375 1319.036 430.964 1375 500 1375 C 569.036 1375 625 1319.036 625 1250 C 625 1180.964 569.036 1125 500 1125 Z"],
                            [1, "category-title"],
                            [1, "markdown", 3, "data", "inline"],
                            [1, "flex", "items-center", "gap-4", "my-4"],
                            [1, "activity-icon"],
                            ["target", "_blank", 1, "link", 3, "href"],
                            [1, "activity-info"],
                            [1, "large-img", 3, "error", "src", "alt"],
                            [1, "small-img", 3, "src", "alt"],
                            [1, "small-img", 3, "error", "src", "alt"],
                            [1, "font-bold", "spotify-title"],
                            ["target", "_blank", 1, "spotify-link", 3, "href"],
                            [1, "font-bold"],
                            [1, "badges-connected-accounts"],
                            [1, "badge-connected-account"],
                            ["width", "24px", "height", "24px", 3, "src", "alt"],
                            [1, "tooltip", "tooltip-down"]
                        ],
                        template: function(r, o) {
                            1 & r && (O(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3), Ft(4, l5, 34, 33, "div", 4), F()()()()), 2 & r && (U(4), Vt(4, o.userDataStatus ? 4 : -1))
                        },
                        dependencies: [g0, C0, zc, zE, Yp, px],
                        styles: ['.tooltip[_ngcontent-%COMP%]{display:block;position:absolute;color:#b6b7b7;background:#18191c;padding:.4rem;border-radius:3px;max-width:160px;width:max-content;font-size:.9rem;transform:scale(0);transition:55ms ease-in-out transform;z-index:10;box-shadow:0 0 5px #00000059;-webkit-box-shadow:0 0 5px 0 rgba(0,0,0,.35)}.tooltip-up[_ngcontent-%COMP%]{bottom:42px}.tooltip-up[_ngcontent-%COMP%]:before{content:"";position:absolute;bottom:-6px;left:50%;transform:translate(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:6px solid #18191c}.tooltip-down[_ngcontent-%COMP%]{top:45px}.tooltip-down[_ngcontent-%COMP%]:after{content:"";position:absolute;top:-6px;left:50%;transform:translate(-50%);width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #18191c}a[_ngcontent-%COMP%]{cursor:url(link.38d1de5d4c03b83a.png),default}.atropos-inner[_ngcontent-%COMP%]{border-radius:10px}.atropos-card[_ngcontent-%COMP%]{display:block;margin:0 auto;width:358px}.card[_ngcontent-%COMP%]{background:#292b2f;width:345px;max-height:100%;height:max-content;border-radius:9px;box-shadow:0 0 16px 3px #0003;-webkit-box-shadow:0px 0px 16px 3px rgba(0,0,0,.2);scrollbar-width:none}.card[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.card-header[_ngcontent-%COMP%]   .banner[_ngcontent-%COMP%]{width:100%;height:60px;background:#ff8527;border-radius:6px 6px 0 0;overflow:hidden}.card-header[_ngcontent-%COMP%]   .banner-img[_ngcontent-%COMP%]{width:100%;height:120px;background-position:center!important;background-size:100% auto!important;border-radius:6px 6px 0 0;overflow:hidden}.card-body[_ngcontent-%COMP%]{padding:15px;position:relative}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]{position:absolute;display:flex;flex-direction:row;align-items:flex-end;justify-content:space-between;width:calc(100% - 30px);top:-50px}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{position:relative}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .avatar-decoration[_ngcontent-%COMP%]{position:absolute;width:100%;height:100%;z-index:1}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]{position:relative;border:6px solid #292b2f;border-radius:50%;border-color:var(--color1)}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{display:block;width:80px;height:80px;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]:before{content:"See Profile";position:absolute;right:0;top:0;cursor:url(link.38d1de5d4c03b83a.png),default;opacity:0;width:100%;height:100%;color:#eee;background:#0000007e;display:flex;align-items:center;justify-content:center;border-radius:50%;font-size:.7rem;font-weight:600;text-transform:uppercase;transition-duration:.15s;z-index:1}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]:after{content:"";position:absolute;inset:0;z-index:-1;margin:-6px;border-radius:50%;background-color:var(--color1)}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]:hover:before{opacity:1}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state[_ngcontent-%COMP%]{position:absolute;bottom:0;right:0;width:20px;height:20px;border-radius:50%;border:2px solid #292b2f;z-index:1}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.online[_ngcontent-%COMP%]{background:#43b581}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.dnd[_ngcontent-%COMP%]{background:#f04747}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.dnd[_ngcontent-%COMP%]:before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:8px;height:3px;background:#292b2f}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.idle[_ngcontent-%COMP%]{background:#faa61a}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.idle[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;width:11px;height:11px;background:#292b2f;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.offline[_ngcontent-%COMP%]{background:#747f8d}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.offline[_ngcontent-%COMP%]:before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:9px;height:9px;background:#292b2f;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.streaming[_ngcontent-%COMP%]{background:#593695}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.invisible[_ngcontent-%COMP%]{background:#747f8d}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.invisible[_ngcontent-%COMP%]:before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:9px;height:9px;background:#292b2f;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.default[_ngcontent-%COMP%]{background:#747f8d}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.default[_ngcontent-%COMP%]:before{content:"";position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:9px;height:9px;background:#292b2f;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]   .profile-logo[_ngcontent-%COMP%]   .presence-state.unknown[_ngcontent-%COMP%]{background:#747f8d}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   .badges-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:flex-end;background:#18191c;border-radius:7px;padding:3px}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   .badges-container[_ngcontent-%COMP%]   .badge-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{height:100%}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   .badges-container[_ngcontent-%COMP%]   .badge-item[_ngcontent-%COMP%]   .badge-link[_ngcontent-%COMP%]{position:relative;margin:3px;width:22px;height:22px;display:flex;justify-content:center;align-items:center;cursor:url(link.38d1de5d4c03b83a.png),default}.card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   .badges-container[_ngcontent-%COMP%]   .badge-item[_ngcontent-%COMP%]   .badge-link[_ngcontent-%COMP%]:hover > .tooltip[_ngcontent-%COMP%]{transform:scale(1)}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]{background:#18191c;border-radius:7px;padding:13px;margin-top:40px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .global-name[_ngcontent-%COMP%]{color:#eee;font-weight:700;font-size:1.2rem;align-items:center}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .username[_ngcontent-%COMP%]{color:#eee;font-weight:600;font-size:.9rem;align-items:center}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .pronouns[_ngcontent-%COMP%]{color:#eee;margin-bottom:13px;font-weight:400;font-size:.9rem;align-items:center}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   hr[_ngcontent-%COMP%]{border:none;border-top:.5px solid #33353b}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .category-title[_ngcontent-%COMP%]{color:#fff;font-weight:700;text-transform:uppercase;font-size:.8rem;margin-bottom:8px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .connected-accounts[_ngcontent-%COMP%]{margin-top:12px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]{color:#fff;margin-top:12px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-icon[_ngcontent-%COMP%]{position:relative;width:80px;height:auto}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-icon[_ngcontent-%COMP%]   .large-img[_ngcontent-%COMP%]{border-radius:.5rem}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-icon[_ngcontent-%COMP%]   .small-img[_ngcontent-%COMP%]{position:absolute;bottom:0;right:0;transform:translate(6px,6px);width:30px;height:30px;border-radius:50%}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-info[_ngcontent-%COMP%]{font-size:.9rem;text-wrap:nowrap;overflow:overlay}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-info[_ngcontent-%COMP%]   .spotify-title[_ngcontent-%COMP%]{color:#1ed760}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-info[_ngcontent-%COMP%]   .spotify-link[_ngcontent-%COMP%]{color:#2b98ff;text-decoration:underline;font-weight:700}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-info[_ngcontent-%COMP%]   .spotify-link[_ngcontent-%COMP%]:hover{color:#257dcf}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-info[_ngcontent-%COMP%]::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);border-radius:10px;background-color:#f5f5f595}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-info[_ngcontent-%COMP%]::-webkit-scrollbar{width:12px;height:8px;background-color:#f5f5f55e;border-radius:10px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .activities[_ngcontent-%COMP%]   .activity-info[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{border-radius:10px;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);background-color:#55555581}.markdown[_ngcontent-%COMP%]{color:#ddd;font-size:.9rem;line-height:1.5}.badges-connected-accounts[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;justify-content:center;gap:.5rem;padding:.4rem;border-radius:.6rem}.badges-connected-accounts[_ngcontent-%COMP%]   .badge-connected-account[_ngcontent-%COMP%]{position:relative;display:flex;justify-content:center;align-items:center;cursor:url(link.38d1de5d4c03b83a.png),default;padding:.4rem;border-radius:.6rem;background-blend-mode:multiply;background-color:#00000026}.badges-connected-accounts[_ngcontent-%COMP%]   .badge-connected-account[_ngcontent-%COMP%]:hover > .tooltip[_ngcontent-%COMP%]{transform:scale(1)}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .basic-infos[_ngcontent-%COMP%]{margin-bottom:14px;margin-top:12px;color:#bdbebf}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .basic-infos[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#bdbebf;font-size:.9rem}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .basic-infos[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#02a5e6;text-decoration:none}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .basic-infos[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .basic-infos[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   b[_ngcontent-%COMP%]{color:#ddd}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .roles[_ngcontent-%COMP%]{margin-bottom:14px}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .roles[_ngcontent-%COMP%]   .roles-list[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background:transparent;outline:none;border:1.2px solid #4b4b4b;padding:13px;font-size:.8rem;width:100%;border-radius:4px;color:#eee;margin-top:14px}.nitro-card[_ngcontent-%COMP%]{display:block;margin:0 auto;position:relative;background-image:linear-gradient(0,var(--color2),var(--color1));background-blend-mode:multiply;background-color:#0000006c}.nitro-card[_ngcontent-%COMP%]:before{content:"";position:absolute;inset:0;z-index:-1;margin:-5px;border-radius:12px;background:linear-gradient(0,var(--color2),var(--color1))}.nitro-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .profile-body[_ngcontent-%COMP%]{background:#18191c91}.nitro-card[_ngcontent-%COMP%]   .card-body[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%]   .badges-container[_ngcontent-%COMP%]{background:#18191c77}.link[_ngcontent-%COMP%]:hover{text-decoration:underline}']
                    })
                }
                return e
            })();
            const u5 = ["bgVideo"],
                d5 = ["iconVolume"],
                f5 = ["volumeInput"],
                h5 = [{
                    path: "",
                    component: (() => {
                        class e {
                            constructor(t) {
                                this.renderer = t, this.isMuted = !0, this.volume = 0
                            }
                            ngAfterViewInit() {
                                this.bgVideo.nativeElement.muted = this.isMuted
                            }
                            changeVolume(t) {
                                const r = t.target.value;
                                this.volume = r, this.bgVideo.nativeElement.volume = r / 100, localStorage.setItem("volume", r), this.iconVolume && (0 == r ? (this.renderer.removeClass(this.iconVolume.nativeElement, "bxs-volume-full"), this.renderer.addClass(this.iconVolume.nativeElement, "bxs-volume-mute"), this.renderer.addClass(this.iconVolume.nativeElement, "bx-tada"), this.renderer.addClass(this.iconVolume.nativeElement, "bx-flip-vertical")) : (this.renderer.removeClass(this.iconVolume.nativeElement, "bxs-volume-mute"), this.renderer.removeClass(this.iconVolume.nativeElement, "bx-tada"), this.renderer.removeClass(this.iconVolume.nativeElement, "bx-flip-vertical"), this.renderer.addClass(this.iconVolume.nativeElement, "bxs-volume-full"))), this.isMuted = 0 == r, this.bgVideo.nativeElement.muted = this.isMuted
                            }
                            toggleMute() {
                                if (this.bgVideo && (this.isMuted = !this.isMuted, this.bgVideo.nativeElement.muted = this.isMuted, this.iconVolume))
                                    if (this.isMuted) this.volume = 0, this.volumeInput.nativeElement.value = 0, this.renderer.removeClass(this.iconVolume.nativeElement, "bxs-volume-full"), this.renderer.addClass(this.iconVolume.nativeElement, "bxs-volume-mute"), this.renderer.addClass(this.iconVolume.nativeElement, "bx-tada"), this.renderer.addClass(this.iconVolume.nativeElement, "bx-flip-vertical");
                                    else {
                                        const t = localStorage.getItem("volume");
                                        this.volume = t ? parseInt(t) : 100, this.volumeInput.nativeElement.value = this.volume, this.bgVideo.nativeElement.volume = this.volume / 100, this.renderer.removeClass(this.iconVolume.nativeElement, "bxs-volume-mute"), this.renderer.removeClass(this.iconVolume.nativeElement, "bx-tada"), this.renderer.removeClass(this.iconVolume.nativeElement, "bx-flip-vertical"), this.renderer.addClass(this.iconVolume.nativeElement, "bxs-volume-full")
                                    }
                            }
                            static #e = this.\u0275fac = function(r) {
                                return new(r || e)(D(Dn))
                            };
                            static #t = this.\u0275cmp = Ln({
                                type: e,
                                selectors: [
                                    ["app-main"]
                                ],
                                viewQuery: function(r, o) {
                                    if (1 & r && (js(u5, 5), js(d5, 5), js(f5, 5)), 2 & r) {
                                        let i;
                                        ri(i = oi()) && (o.bgVideo = i.first), ri(i = oi()) && (o.iconVolume = i.first), ri(i = oi()) && (o.volumeInput = i.first)
                                    }
                                },
                                decls: 32,
                                vars: 1,
                                consts: [
                                    ["bgVideo", ""],
                                    ["iconVolume", ""],
                                    ["volumeInput", ""],
                                    [1, "video-container"],
                                    ["id", "video_cover"],
                                    ["id", "myVideo", "autoplay", "", "muted", "", "loop", "", "playsinline", "", "webkit-playsinline", ""],
                                    ["src", "../../../assets/videos/bgVideo.mp4", "type", "video/mp4"],
                                    [1, "video-overlay"],
                                    [1, "container-info"],
                                    [1, "grid", "content-center", "justify-items-center", "text-white"],
                                    [1, "glowing-icons"],
                                    [1, "flex", "flex-wrap", "gap-2"],
                                    ["href", "https://t.me/livefortoday4", "target", "_blank", 1, "hovered"],
                                    [1, "fa-brands", "fa-telegram"],
                                    ["href", "mailto:krezuran@gmail.com", "target", "_blank", 1, "hovered"],
                                    [1, "fa-solid", "fa-envelope"],
                                    ["href", "https://www.mayapin.com", "target", "_blank", 1, "hovered"],
                                    [1, "fa-solid", "fa-store"],
                                    ["href", "mailto:krezuran@gmail.com", "target", "_blank", 1, "hovered"],
                                    [1, "fa-solid", "fa-envelope"],
                                    ["id", "sound-slider__container", 1, "mt-5"],
                                    [1, "iconVolume", "text-white", "hovered", "bx", "bxs-volume-mute", "bx-tada", "bx-flip-vertical", 3, "click"],
                                    ["type", "range", "value", "0", "min", "0", "max", "100", "id", "sound-slider", 1, "hovered", 3, "input"],
                                    ["id", "volume"]
                                ],
                                template: function(r, o) {
                                    if (1 & r) {
                                        const i = qr();
                                        Ce(0, "app-custom-cursor"), O(1, "div", 3), Ce(2, "div", 4), O(3, "video", 5, 0), Ce(5, "source", 6), F(), Ce(6, "div", 7), F(), O(7, "div", 8)(8, "div", 9), Ce(9, "app-clock"), O(10, "section", 10)(11, "ul", 11)(12, "li")(13, "a", 12), Ce(14, "i", 13), F()(), O(15, "li")(16, "a", 14), Ce(17, "i", 15), F()(), O(18, "li")(19, "a", 16), Ce(20, "i", 17), F()(), O(21, "li")(22, "a", 18), Ce(23, "i", 19), F()()()(), O(24, "div", 20)(25, "i", 21, 1), Re("click", function() {
                                            return jn(i), $n(o.toggleMute())
                                        }), F(), O(27, "input", 22, 2), Re("input", function(a) {
                                            return jn(i), $n(o.changeVolume(a))
                                        }), F(), O(29, "p", 23), qe(30), F()()(), Ce(31, "app-card-profile"), F()
                                    }
                                    2 & r && (U(30), rt(o.volume))
                                },
                                dependencies: [OH, RH, c5],
                                styles: ['.myAtropos[_ngcontent-%COMP%]{position:relative;overflow:hidden}.glowing-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{cursor:url(link.38d1de5d4c03b83a.png),default;position:relative;background:#202020;text-decoration:none;border-radius:50%;color:gray;transition:.5s;display:flex;justify-content:center;align-items:center;width:50px;height:50px}.glowing-icons[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem}.glowing-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:before{content:"";position:absolute;top:0;left:0;width:100%;height:100%;border-radius:50%;background:#fff;transition:.5s;transform:scale(.9);z-index:-1}.glowing-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover:before{transform:scale(1.1);box-shadow:0 0 15px #fff}.glowing-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{color:#fff}@media screen and (max-width: 768px){.rxps[_ngcontent-%COMP%]{position:relative;display:inline-block;list-style-type:none;margin:0rem .5rem 1rem}.glowing-icons[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{width:55px;height:55px}.glowing-icons[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{font-size:1.5rem}}.video-container[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{position:absolute;overflow:hidden;top:50%;left:50%;transform:translate(-50%,-50%);object-fit:cover;height:100%;width:100%}.video-overlay[_ngcontent-%COMP%]{-webkit-backdrop-filter:blur(1px);backdrop-filter:blur(1px)}.container-info[_ngcontent-%COMP%]{height:100vh;width:100vw;overflow-y:auto;display:flex;justify-content:center;align-items:center;flex-direction:column;gap:2rem}@media screen and (max-height: 816px){.container-info[_ngcontent-%COMP%]{justify-content:flex-start;padding:4rem 0rem}}#video_cover[_ngcontent-%COMP%]{position:absolute;overflow:hidden;width:100%;height:100%;z-index:-100;background:url(video_cover.8f49fdf525be9ddd.gif) no-repeat;background-size:cover;background-position:center}#myVideo[_ngcontent-%COMP%]{position:absolute;overflow:hidden;top:50%;left:50%;transform:translate(-50%,-50%);z-index:-100;object-fit:cover;height:100%;width:100%}.video-overlay[_ngcontent-%COMP%]{position:fixed;overflow:hidden;top:0;left:0;height:100vh;width:100vw;background-color:#000000bf;z-index:-10}@media screen and (max-width: 768px){.video-container[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{width:100vw;height:auto}}.iconVolume[_ngcontent-%COMP%]{font-size:20px!important;cursor:url(link.38d1de5d4c03b83a.png),default}#sound-slider__container[_ngcontent-%COMP%]{display:flex;gap:10px;width:300px;height:20px;padding:20px 40px;background:#ffffff12;border:1px solid rgba(255,255,255,.03);border-radius:1in;align-items:center;justify-content:center;position:relative;overflow:hidden}#sound-slider[_ngcontent-%COMP%]{margin:0 10px;appearance:none;width:100%;border-radius:1in;outline:none;transition:.2s;cursor:pointer;background:#fff6;cursor:url(link.38d1de5d4c03b83a.png),default}#sound-slider[_ngcontent-%COMP%]:hover{background:#fff9}#sound-slider[_ngcontent-%COMP%]::-webkit-slider-thumb{appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;cursor:pointer;cursor:url(link.38d1de5d4c03b83a.png),default;-webkit-transition:.2s;transition:.2s}#sound-slider[_ngcontent-%COMP%]::-moz-range-thumb{appearance:none;width:15px;height:15px;border-radius:50%;background:#fff;cursor:pointer;cursor:url(link.38d1de5d4c03b83a.png),default;-moz-transition:.2s;transition:.2s}#sound-slider[_ngcontent-%COMP%]::-webkit-slider-thumb:hover{transform:scale(1.2)}#volume[_ngcontent-%COMP%]{color:#dcdcdc;text-align:right}']
                            })
                        }
                        return e
                    })()
                }, {
                    path: "**",
                    redirectTo: "",
                    pathMatch: "full"
                }];
            let p5 = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275mod = zt({
                            type: e
                        });
                        static #n = this.\u0275inj = xt({
                            imports: [ZI.forRoot(h5), ZI]
                        })
                    }
                    return e
                })(),
                g5 = (() => {
                    class e {
                        constructor() {
                            this.title = "k r e z u r a n", this.animSeq = ["/", "$", "\\", "|", "$"], this.animIndex = 0, this.titleIndex = 0
                        }
                        ngOnInit() {
                            this.doInverseSpinZeroPitch(), setInterval(() => {
                                this.doInverseSpinZeroPitch()
                            }, 100), document.addEventListener("contextmenu", function(t) {
                                t.preventDefault()
                            }, !1), document.addEventListener("keydown", function(t) {
                                t.ctrlKey && ("KeyU" === t.code || "KeyI" === t.code || "KeyC" === t.code || "KeyV" === t.code || "KeyS" === t.code || "F12" === t.code) && t.preventDefault()
                            }, !1)
                        }
                        doInverseSpinZeroPitch() {
                            const t = this.title.substring(0, this.titleIndex);
                            this.titleIndex > this.title.length && (this.animIndex = 0, this.titleIndex = 0), this.animIndex > 3 && (this.titleIndex++, this.animIndex = 0), document.title = t + this.animSeq[this.animIndex], this.animIndex++
                        }
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275cmp = Ln({
                            type: e,
                            selectors: [
                                ["app-root"]
                            ],
                            decls: 1,
                            vars: 0,
                            template: function(r, o) {
                                1 & r && Ce(0, "router-outlet")
                            },
                            dependencies: [Tg]
                        })
                    }
                    return e
                })(),
                m5 = (() => {
                    class e {
                        static #e = this.\u0275fac = function(r) {
                            return new(r || e)
                        };
                        static #t = this.\u0275mod = zt({
                            type: e,
                            bootstrap: [g5]
                        });
                        static #n = this.\u0275inj = xt({
                            imports: [Aj, DU, wU, p5, XU, B4.forRoot()]
                        })
                    }
                    return e
                })();
            Sj().bootstrapModule(m5).catch(e => console.error(e))
        }
    },
    Ai => {
        Ai(Ai.s = 315)
    }
]);