(zz = (...z) => zp(zg(...z))),
  (zp = (...z) => {
    let t = zx.createBufferSource(),
      f = zx.createBuffer(z.length, z[0].length, zr);
    return (
      z.map((z, t) => f.getChannelData(t).set(z)),
      (t.buffer = f),
      t.connect(zx.destination),
      t.start(),
      t
    );
  }),
  (zg = (
    z = 1,
    t = 0.05,
    f = 220,
    a = 0,
    x = 0,
    e = 0.1,
    n = 0,
    h = 1,
    M = 0,
    r = 0,
    R = 0,
    i = 0,
    o = 0,
    s = 0,
    u = 0,
    c = 0,
    d = 0,
    l = 1,
    b = 0,
    m = 0
  ) => {
    let P,
      X,
      g = 2 * Math.PI,
      C = (M *= (500 * g) / zr ** 2),
      p = ((0 < u ? 1 : -1) * g) / 4,
      w = (f *= ((1 + 2 * t * Math.random() - t) * g) / zr),
      A = [],
      B = 0,
      G = 0,
      I = 0,
      V = 1,
      k = 0,
      D = 0,
      S = 0;
    for (
      a = 99 + zr * a,
        b *= zr,
        x *= zr,
        e *= zr,
        d *= zr,
        r *= (500 * g) / zr ** 3,
        u *= g / zr,
        R *= g / zr,
        i *= zr,
        o = (zr * o) | 0,
        X = (a + b + x + e + d) | 0;
      I < X;
      A[I++] = S
    )
      ++D % ((100 * c) | 0) ||
        ((S = n
          ? 1 < n
            ? 2 < n
              ? 3 < n
                ? Math.sin((B % g) ** 3)
                : Math.max(Math.min(Math.tan(B), 1), -1)
              : 1 - (((((2 * B) / g) % 2) + 2) % 2)
            : 1 - 4 * Math.abs(Math.round(B / g) - B / g)
          : Math.sin(B)),
        (S =
          (o ? 1 - m + m * Math.sin((2 * Math.PI * I) / o) : 1) *
          (0 < S ? 1 : -1) *
          Math.abs(S) ** h *
          z *
          zv *
          (I < a
            ? I / a
            : I < a + b
            ? 1 - ((I - a) / b) * (1 - l)
            : I < a + b + x
            ? l
            : I < X - d
            ? ((X - I - d) / e) * l
            : 0)),
        (S = d
          ? S / 2 +
            (d > I ? 0 : ((I < X - d ? 1 : (X - I) / d) * A[(I - d) | 0]) / 2)
          : S)),
        (B +=
          (P = (f += M += r) * Math.sin(G * u - p)) -
          P * s * (1 - ((1e9 * (Math.sin(I) + 1)) % 2))),
        (G += P - P * s * (1 - ((1e9 * (Math.sin(I) ** 2 + 1)) % 2))),
        V && ++V > i && ((f += R), (w += R), (V = 0)),
        !o || ++k % o || ((f = w), (M = C), (V = V || 1));
    return A;
  }),
  (zv = 0.3),
  (zr = 4e4),
  (zx = new AudioContext()),
  (zm = (n, f, t, e = 125) => {
    let l,
      o,
      z,
      r,
      g,
      h,
      x,
      a,
      u,
      c,
      d,
      i,
      m,
      p,
      G,
      M = 0,
      R = [],
      b = [],
      j = [],
      k = 0,
      q = 0,
      s = 1,
      v = {},
      w = ((zr / e) * 60) >> 2;
    for (; s; k++)
      (R = [(s = a = d = m = 0)]),
        t.map((e, d) => {
          for (
            x = f[e][k] || [0, 0, 0],
              s |= !!f[e][k],
              G = m + (f[e][0].length - 2 - !a) * w,
              p = d == t.length - 1,
              o = 2,
              r = m;
            o < x.length + p;
            a = ++o
          ) {
            for (
              g = x[o],
                u = (o == x.length + p - 1 && p) || (c != (x[0] || 0)) | g | 0,
                z = 0;
              z < w && a;
              z++ > w - 99 && u ? (i += (i < 1) / 99) : 0
            )
              (h = ((1 - i) * R[M++]) / 2 || 0),
                (b[r] = (b[r] || 0) - h * q + h),
                (j[r] = (j[r++] || 0) + h * q + h);
            g &&
              ((i = g % 1),
              (q = x[1] || 0),
              (g |= 0) &&
                (R = v[[(c = x[(M = 0)] || 0), g]] =
                  v[[c, g]] ||
                  ((l = [...n[c]]),
                  (l[2] *= 2 ** ((g - 12) / 12)),
                  g > 0 ? zg(...l) : [])));
          }
          m = G;
        });
    return [b, j];
  });
