function AdminLogin({
  email,
  setEmail,
  password,
  setPassword,
  loading,
  authError,
  handleLogin
}) {
  return (
    <div className="bg-background min-h-screen py-16 flex items-center justify-center px-4 animate-fade-in">
      <div className="max-w-md w-full bg-white rounded-custom p-8 shadow-custom border border-gray-100">
        <div className="text-center mb-6">
          <span className="text-4xl">🌿</span>
          <h2 className="text-2xl font-bold text-dark mt-2">Admin Login</h2>
          <p className="text-lightText text-sm">Sign in to manage Eachur Agro Store</p>
        </div>

        {authError && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
            {authError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-dark mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="admin@eachuragro.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-dark mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-accent text-white py-2.5 rounded-full font-semibold transition-colors duration-300 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
