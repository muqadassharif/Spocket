// ===== FIREBASE SETUP =====
let auth, db;

document.addEventListener('DOMContentLoaded', function() {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: "AIzaSyCwB-7YO9vQYZZ9x514Y5hcP-rOM2Nc5E0",
      authDomain: "spocket-demo.firebaseapp.com",
      projectId: "spocket-demo",
      storageBucket: "spocket-demo.firebasestorage.app",
      messagingSenderId: "450822852501",
      appId: "1:450822852501:web:4fac2ca4cb31654145709c"
    });
  }
  auth = firebase.auth();
  db   = firebase.firestore();

  if (document.getElementById('page-dashboard')) {
    auth.onAuthStateChanged(user => {
      if (!user) { window.location.href = 'index.html'; return; }
      initDashboard();
    });
  }
});

// ===== FIRESTORE HELPERS =====
async function getUserData(email) {
  const snap = await db.collection('users').doc(email).get();
  return snap.exists ? snap.data() : null;
}
async function saveUserData(email, data) {
  await db.collection('users').doc(email).set(data, { merge: true });
}

// ===== CONFIG =====
const VIP_PLANS = [
  { id:'VIP1',     label:'VIP 1',     icon:'diamond', recharge:100,   earningPct:0.8,  storeMin:100,   storeMax:499,   color:'vip1' },
  { id:'VIP2',     label:'VIP 2',     icon:'diamond', recharge:500,   earningPct:2,    storeMin:500,   storeMax:1499,  color:'vip2' },
  { id:'VIP3',     label:'VIP 3',     icon:'diamond', recharge:1500,  earningPct:5,    storeMin:1500,  storeMax:3499,  color:'vip3' },
  { id:'VIP4',     label:'VIP 4',     icon:'diamond', recharge:3500,  earningPct:8,    storeMin:3500,  storeMax:5999,  color:'vip4' },
  { id:'SuperVIP', label:'Super VIP', icon:'star',    recharge:10000, earningPct:11,   storeMin:10000, storeMax:null,  color:'supervip' },
];

const PRODUCTS = {
  VIP1: [
    { id:'p1',  name:'CeraVe Moisturizing Cream 19oz',    price:18.99,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop' },
    { id:'p2',  name:'Neutrogena Hydro Boost Gel',        price:24.99,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
    { id:'p3',  name:'The Ordinary Niacinamide Serum',    price:12.90,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
    { id:'p4',  name:'Cetaphil Gentle Skin Cleanser',     price:14.99,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' },
    { id:'p5',  name:'Rose Gold Stud Earrings',           price:10.99,  cat:'Jewelry',     image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop' },
    { id:'p6',  name:'Silver Princess Ring',              price:9.99,   cat:'Jewelry',     image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop' },
    { id:'p7',  name:'Slim Fit Cotton T-Shirt',           price:22.30,  cat:'Clothing',    image:'images/tshirt.jpg' },
    { id:'p8',  name:'Mens Casual Slim Fit Shirt',        price:15.99,  cat:'Clothing',    image:'images/casual.jpg' },
    { id:'p9',  name:'Women Solid Short Sleeve Top',      price:9.85,   cat:'Clothing',    image:'images/wshirt1.jpg' },
    { id:'p10', name:'Women Casual Cotton Shirt',         price:12.99,  cat:'Clothing',    image:'images/wshirt3.jpg' },
    { id:'p11', name:'WD 2TB External Hard Drive',        price:64.00,  cat:'Electronics', image:'images/hdd1.jpg' },
    { id:'p12', name:'SanDisk 256GB Flash Drive',         price:29.99,  cat:'Electronics', image:'images/ssd2.jpg' },
  ],
  VIP2: [
    { id:'p13', name:'La Mer Moisturizing Cream 2oz',     price:195.00, cat:'Skincare',    image:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop' },
    { id:'p14', name:'SK-II Facial Treatment Essence',    price:185.00, cat:'Skincare',    image:'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop' },
    { id:'p15', name:'Tatcha The Water Cream',            price:68.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
    { id:'p16', name:'Drunk Elephant C-Firma Serum',      price:90.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
    { id:'p17', name:'Sterling Silver Tennis Bracelet',   price:89.99,  cat:'Jewelry',     image:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop' },
    { id:'p18', name:'Gold Plated Micropave Ring',        price:168.00, cat:'Jewelry',     image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop' },
    { id:'p19', name:'Women Snowboard Jacket',            price:56.99,  cat:'Clothing',    image:'images/wjacket1.jpg' },
    { id:'p20', name:'Faux Leather Moto Jacket',          price:29.95,  cat:'Clothing',    image:'images/wjacket2.jpg' },
    { id:'p21', name:'Rain Jacket Windbreaker',           price:39.99,  cat:'Clothing',    image:'images/wjacket3.jpg' },
    { id:'p22', name:'Fjallraven Kanken Backpack',        price:109.95, cat:'Bags',        image:'images/bag.jpg' },
    { id:'p23', name:'SanDisk SSD Plus 1TB',              price:109.00, cat:'Electronics', image:'images/ssd1.jpg' },
    { id:'p24', name:'WD 4TB Gaming Hard Drive',          price:114.00, cat:'Electronics', image:'images/hdd2.jpg' },
  ],
  VIP3: [
    { id:'p25', name:'La Mer The Concentrate Serum',      price:395.00, cat:'Skincare',    image:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop' },
    { id:'p26', name:'Sisley Black Rose Cream Mask',      price:145.00, cat:'Skincare',    image:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' },
    { id:'p27', name:'Estee Lauder Advanced Night Repair',price:115.00, cat:'Skincare',    image:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
    { id:'p28', name:'Chanel No.5 Perfume 100ml',         price:185.00, cat:'Skincare',    image:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop' },
    { id:'p29', name:'14K Gold Diamond Stud Earrings',    price:299.00, cat:'Jewelry',     image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop' },
    { id:'p30', name:'18K Gold Chain Necklace',           price:450.00, cat:'Jewelry',     image:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop' },
    { id:'p31', name:'Gold Sapphire Ring',                price:380.00, cat:'Jewelry',     image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop' },
    { id:'p32', name:'Mens Premium Leather Jacket',       price:199.00, cat:'Clothing',    image:'images/jacket.jpg' },
    { id:'p33', name:'Women Designer Trench Coat',        price:245.00, cat:'Clothing',    image:'images/wjacket3.jpg' },
    { id:'p34', name:'Acer 27" Full HD IPS Monitor',      price:599.00, cat:'Electronics', image:'images/monitor1.jpg' },
    { id:'p35', name:'Silicon Power SSD 1TB Pro',         price:109.00, cat:'Electronics', image:'images/ssd2.jpg' },
    { id:'p36', name:'Fjallraven Premium Laptop Bag',     price:149.95, cat:'Bags',        image:'images/bag.jpg' },
  ],
  VIP4: [
    { id:'p37', name:'La Prairie Skin Caviar Luxe Cream', price:595.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop' },
    { id:'p38', name:'La Mer The Regenerating Serum',     price:650.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop' },
    { id:'p39', name:'Augustinus Bader The Rich Cream',   price:280.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
    { id:'p40', name:'Dior Prestige La Creme Rose',       price:420.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop' },
    { id:'p41', name:'18K Gold Diamond Tennis Bracelet',  price:895.00,  cat:'Jewelry',     image:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop' },
    { id:'p42', name:'Platinum Diamond Engagement Ring',  price:1200.00, cat:'Jewelry',     image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop' },
    { id:'p43', name:'18K Gold Ruby Pendant Necklace',    price:750.00,  cat:'Jewelry',     image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop' },
    { id:'p44', name:'Diamond Hoop Earrings 14K Gold',    price:480.00,  cat:'Jewelry',     image:'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop' },
    { id:'p45', name:'Samsung 49" QLED Gaming Monitor',   price:999.99,  cat:'Electronics', image:'images/monitor2.jpg' },
    { id:'p46', name:'Acer Predator 32" 4K Monitor',      price:799.00,  cat:'Electronics', image:'images/monitor1.jpg' },
    { id:'p47', name:'WD 8TB External Drive',             price:189.00,  cat:'Electronics', image:'images/hdd2.jpg' },
    { id:'p48', name:'Designer Leather Tote Bag',         price:350.00,  cat:'Bags',        image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop' },
  ],
  SuperVIP: [
    { id:'p49', name:'Olaplex No.3 Hair Perfector',       price:28.00,   cat:'Skincare',    image:'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop' },
    { id:'p50', name:'Bioderma Sensibio Micellar Water',  price:15.99,   cat:'Skincare',    image:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' },
    { id:'p51', name:'Crystal Drop Earrings',             price:12.99,   cat:'Jewelry',     image:'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop' },
    { id:'p52', name:'Dainty Silver Bracelet',            price:19.99,   cat:'Jewelry',     image:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop' },
    { id:'p53', name:'Mens Premium Polo Shirt',           price:34.99,   cat:'Clothing',    image:'images/tshirt.jpg' },
    { id:'p54', name:'Women Ribbed Knit Top',             price:22.99,   cat:'Clothing',    image:'images/wshirt2.jpg' },
    { id:'p55', name:'WD 2TB Portable Drive',             price:64.00,   cat:'Electronics', image:'images/hdd1.jpg' },
    { id:'p56', name:'SanDisk SSD 256GB',                 price:49.00,   cat:'Electronics', image:'images/ssd2.jpg' },
    { id:'p57', name:'Leather Card Wallet',               price:29.99,   cat:'Bags',        image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop' },
    { id:'p58', name:'Casual Linen Blazer',               price:59.99,   cat:'Clothing',    image:'images/jacket.jpg' },
    { id:'p59', name:'SK-II Pitera Essence Full Set',     price:320.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop' },
    { id:'p60', name:'Sulwhasoo Concentrated Ginseng',    price:275.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop' },
    { id:'p61', name:'Guerlain Abeille Royale Serum',     price:195.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop' },
    { id:'p62', name:'14K Gold Diamond Earrings',         price:299.00,  cat:'Jewelry',     image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop' },
    { id:'p63', name:'18K Gold Micropave Ring',           price:168.00,  cat:'Jewelry',     image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop' },
    { id:'p64', name:'Gold Rope Chain Bracelet',          price:245.00,  cat:'Jewelry',     image:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop' },
    { id:'p65', name:'Gucci Ophidia Mini Bag',            price:450.00,  cat:'Bags',        image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop' },
    { id:'p66', name:'Apple iPad Pro 12.9"',              price:399.00,  cat:'Electronics', image:'images/monitor1.jpg' },
    { id:'p67', name:'Samsung 49" QLED Monitor',          price:999.99,  cat:'Electronics', image:'images/monitor2.jpg' },
    { id:'p68', name:'WD 4TB Gaming Drive',               price:114.00,  cat:'Electronics', image:'images/hdd2.jpg' },
    { id:'p69', name:'La Prairie Caviar Luxe Cream 50ml', price:595.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop' },
    { id:'p70', name:'Cle de Peau Beaute Serum',          price:880.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
    { id:'p71', name:'Tom Ford Black Orchid Perfume',     price:320.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop' },
    { id:'p72', name:'18K Gold Diamond Tennis Bracelet',  price:895.00,  cat:'Jewelry',     image:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop' },
    { id:'p73', name:'Platinum Sapphire Halo Ring',       price:980.00,  cat:'Jewelry',     image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop' },
    { id:'p74', name:'18K Gold Ruby Drop Earrings',       price:750.00,  cat:'Jewelry',     image:'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop' },
    { id:'p75', name:'Louis Vuitton Neverfull MM',        price:1500.00, cat:'Bags',        image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop' },
    { id:'p76', name:'Apple MacBook Air M2',              price:1099.00, cat:'Electronics', image:'images/monitor1.jpg' },
    { id:'p77', name:'La Mer Creme de la Mer 250ml',      price:1200.00, cat:'Skincare',    image:'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop' },
    { id:'p78', name:'Creed Aventus Perfume 100ml',       price:495.00,  cat:'Skincare',    image:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop' },
    { id:'p79', name:'Platinum Diamond Solitaire Ring',   price:3500.00, cat:'Jewelry',     image:'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop' },
    { id:'p80', name:'18K Gold Diamond Necklace 2ct',     price:2800.00, cat:'Jewelry',     image:'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop' },
    { id:'p81', name:'Diamond Eternity Band 18K',         price:2200.00, cat:'Jewelry',     image:'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop' },
    { id:'p82', name:'Emerald Diamond Drop Earrings',     price:1850.00, cat:'Jewelry',     image:'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop' },
    { id:'p83', name:'Chanel Classic Flap Bag',           price:8500.00, cat:'Bags',        image:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop' },
    { id:'p84', name:'Apple MacBook Pro 16" M3 Max',      price:3499.00, cat:'Electronics', image:'images/monitor2.jpg' },
  ],
};

// ===== HELPERS =====
const genId  = () => 'SPK-' + Math.random().toString(36).slice(2,8).toUpperCase();
const genRef = () => Math.random().toString(36).slice(2,8).toUpperCase();
let currentUserData = null;
let currentUserEmail = null;

// ===== AUTH =====
function showTab(tab) {
  document.querySelectorAll('.aform').forEach(f => f.classList.remove('active'));
  document.querySelectorAll('.atab').forEach(b => b.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
  document.getElementById(tab === 'login' ? 'tabLogin' : 'tabReg').classList.add('active');
}

async function registerUser() {
  const name  = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('regPass').value;
  const ref   = document.getElementById('refCode').value.trim().toUpperCase();
  const msg   = document.getElementById('regMsg');

  if (!name || !email || !pass) { msg.textContent = 'Please fill all required fields.'; return; }
  if (pass.length < 6)          { msg.textContent = 'Password must be at least 6 characters.'; return; }
  if (!/[A-Z]/.test(pass))      { msg.textContent = 'Password must contain at least one uppercase letter.'; return; }
  if (!/[a-z]/.test(pass))      { msg.textContent = 'Password must contain at least one lowercase letter.'; return; }
  if (!/[0-9]/.test(pass))      { msg.textContent = 'Password must contain at least one number.'; return; }

  // ===== CHECK REFERRAL CODE IS VALID =====
  let validRefSnap = { empty: true, docs: [] };
  if (ref) {
    validRefSnap = await db.collection('users').where('refCode', '==', ref).get();
    if (!validRefSnap.empty === false) {
      msg.textContent = 'Invalid referral code.'; return;
    }
  }
  const refSnap = validRefSnap;

  try {
    await firebase.auth().createUserWithEmailAndPassword(email, pass);
    const referrerEmail = refSnap.empty || !refSnap.docs[0] ? '' : (refSnap.docs[0].data().email || '');
    const newUser = {
      name, email, pass,
      id: genId(), refCode: genRef(),
      plan: 'None', wallet: 0, pendingEarnings: 0,
      inviteCount: 0, inviteEarnings: 0,
      membershipBonus: 0, depositBalance: 0,
      transactions: [], referredBy: referrerEmail,
      usedRefCode: ref, withdrawPin: null,
      joinDate: new Date().toLocaleDateString()
    };
    await saveUserData(email, newUser);
    if (referrerEmail) {
      const referrerDoc = refSnap.docs[0].data();
      await saveUserData(referrerEmail, { inviteCount: (referrerDoc.inviteCount || 0) + 1 });
    }

    msg.style.color = '#22c55e';
    msg.textContent = 'Account created! Redirecting...';
    setTimeout(() => { msg.textContent = ''; msg.style.color = '#ef4444'; showTab('login'); }, 1600);
  } catch(e) {
    msg.textContent = e.code === 'auth/email-already-in-use' ? 'This email is already registered.' : e.message;
  }
}

async function loginUser() {
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pass  = document.getElementById('loginPass').value;
  const msg   = document.getElementById('loginMsg');
  if (!email || !pass) { msg.textContent = 'Please enter email and password.'; return; }
  try {
    await firebase.auth().signInWithEmailAndPassword(email, pass);
    window.location.href = 'dashboard.html';
  } catch(e) {
    msg.textContent = e.code === 'auth/user-not-found' ? 'No account found. Please register first.' :
                      e.code === 'auth/wrong-password' ? 'Incorrect password.' : 'Login failed. Try again.';
  }
}

// ===== ORDER PROCESSING =====
async function placeOrder(productId, planId) {
  const user = firebase.auth().currentUser;
  if (!user) return;
  const email = user.email;
  const userData = await getUserData(email);
  if (!userData || userData.plan === 'None') { showToast('Please activate a plan first!'); return; }
  const products = PRODUCTS[planId] || [];
  const product  = products.find(p => p.id === productId);
  if (!product) return;
  const ordersSnap = await db.collection('orders').where('userEmail','==',email).where('productId','==',productId).where('status','==','processing').get();
  if (!ordersSnap.empty) { showToast('Order already placed for this product!'); return; }
  if ((userData.wallet || 0) < product.price) { showToast('Insufficient balance!'); return; }

  const plan       = VIP_PLANS.find(p => p.id === planId);
  const pct        = plan ? plan.earningPct : 0.8;
  const commission = parseFloat((product.price * pct / 100).toFixed(2));

  const orderRef = await db.collection('orders').add({
    id: 'ORD-' + Date.now(), userEmail: email,
    productId, productName: product.name,
    price: product.price, commission, planId,
    status: 'processing',
    orderedAt: new Date().toLocaleDateString(),
    orderedTimestamp: Date.now()
  });

  // Deduct price, move to frozen
  const newWallet = (userData.wallet || 0) - product.price;
  const newFrozen = (userData.pendingEarnings || 0) + product.price;
  const txs = userData.transactions || [];
  txs.push({ type:'order', desc:'Order placed: ' + product.name, amount: -product.price, date: new Date().toLocaleDateString(), status:'pending' });
  await saveUserData(email, { wallet: newWallet, pendingEarnings: newFrozen, transactions: txs });

  showToast('Order placed successfully!');

  // Check pending orders on every dashboard load
  initDashboard();
}

// ===== AUTO-COMPLETE ORDERS AFTER 4 DAYS =====
async function checkAndCompletePendingOrders(email) {
  const FOUR_DAYS_MS = 2 * 60 * 1000; // 2 minutes for demo testing
  const now = Date.now();
  const snap = await db.collection('orders')
    .where('userEmail', '==', email)
    .where('status', '==', 'processing')
    .get();
  if (snap.empty) return;

  const userData = await getUserData(email);
  if (!userData) return;

  let anyCompleted = false;
  for (const doc of snap.docs) {
    const order = doc.data();
    if (!order.orderedTimestamp) {
      await db.collection('orders').doc(doc.id).set({ orderedTimestamp: now }, { merge: true });
      continue;
    }
    if ((now - order.orderedTimestamp) >= FOUR_DAYS_MS) {
      const plan       = VIP_PLANS.find(p => p.id === (order.planId || userData.plan));
      const pct        = plan ? plan.earningPct : 0.8;
      const commission = order.commission || parseFloat((order.price * pct / 100).toFixed(2));
      // pass skipCheck=true to completeOrder so it won't trigger initDashboard loop
      await completeOrder(doc.id, email, { price: order.price, name: order.productName }, commission, userData.pendingEarnings || 0, true);
      anyCompleted = true;
    }
  }
  // Refresh UI once after all completions
  if (anyCompleted) {
    showToast('Orders completed! Commission credited.');
    await refreshDashboardUI();
  }
}

// ===== ORDER COMPLETION + COMMISSION DISTRIBUTION =====
async function completeOrder(orderDocId, email, product, commission, currentFrozen, skipRefresh = false) {
  try {
    await db.collection('orders').doc(orderDocId).set({ status: 'completed' }, { merge: true });

    const userData = await getUserData(email);
    if (!userData) return;

    const unfrozen  = Math.max((userData.pendingEarnings || 0) - product.price, 0);
    const newWallet = (userData.wallet || 0) + product.price + commission;
    const txs       = userData.transactions || [];
    txs.push({
      type: 'commission',
      desc: 'Order completed: ' + product.name + ' (+$' + commission.toFixed(2) + ' commission)',
      amount: product.price + commission,
      date: new Date().toLocaleDateString()
    });
    await saveUserData(email, { wallet: newWallet, pendingEarnings: unfrozen, transactions: txs });
    await distributeReferralCommissions(email, commission, product.name);

    if (!skipRefresh) {
      showToast('Order completed! +$' + commission.toFixed(2) + ' commission earned.');
      await refreshDashboardUI();
    }
  } catch(e) {
    console.error('Order completion error:', e);
  }
}

// Refresh UI without triggering order check loop
async function refreshDashboardUI() {
  const user = firebase.auth().currentUser;
  if (!user) return;
  const email    = user.email;
  const userData = await getUserData(email);
  if (!userData) return;
  currentUserData  = userData;
  currentUserEmail = email;

  document.getElementById('sbAvatar').textContent     = userData.name.charAt(0).toUpperCase();
  document.getElementById('sbName').textContent       = userData.name;
  document.getElementById('sbId').textContent         = userData.id;
  document.getElementById('topPlan').textContent      = userData.plan || 'None';
  document.getElementById('wName').textContent        = userData.name.split(' ')[0];
  document.getElementById('statWallet').textContent   = '$' + (userData.wallet||0).toFixed(2);
  document.getElementById('statInvites').textContent  = userData.inviteCount || 0;
  document.getElementById('statInvEarn').textContent  = '$' + (userData.inviteEarnings||0).toFixed(2);
  document.getElementById('statPlan').textContent     = userData.plan || 'None';
  document.getElementById('walletBal').textContent    = '$' + (userData.wallet||0).toFixed(2);
  document.getElementById('wbInvite').textContent     = '$' + (userData.inviteEarnings||0).toFixed(2);
  document.getElementById('wbBonus').textContent      = '$' + (userData.depositBalance||0).toFixed(2);
  document.getElementById('wbPending').textContent    = '$' + (userData.pendingEarnings||0).toFixed(2);
  document.getElementById('invTotal').textContent     = userData.inviteCount || 0;
  document.getElementById('invEarned').textContent    = '$' + (userData.inviteEarnings||0).toFixed(2);
  document.getElementById('refCodeDisplay').textContent = userData.refCode;

  const wdBal = document.getElementById('wdBalDisplay');
  if (wdBal) wdBal.textContent = (userData.wallet||0).toFixed(2) + ' USDT';

  renderMembershipPlans(userData);
  renderProductsPage(userData);
}

// ===== REFERRAL COMMISSION DISTRIBUTION (from profit only) =====
async function distributeReferralCommissions(earnerEmail, profit, productName) {
  try {
    const earner = await getUserData(earnerEmail);
    if (!earner) return;

    // L1: direct referrer gets 5% of earner's profit
    if (earner.referredBy) {
      const l1User = await getUserData(earner.referredBy);
      if (l1User) {
        const l1Bonus = parseFloat((profit * 0.05).toFixed(2));
        if (l1Bonus > 0) {
          const l1Txs = l1User.transactions || [];
          l1Txs.push({
            type: 'referral',
            desc: 'L1 referral commission from ' + earner.name + ' (' + productName + ')',
            amount: l1Bonus,
            date: new Date().toLocaleDateString()
          });
          await saveUserData(earner.referredBy, {
            wallet: (l1User.wallet || 0) + l1Bonus,
            inviteEarnings: (l1User.inviteEarnings || 0) + l1Bonus,
            transactions: l1Txs
          });

          // L2: l1's referrer gets 3% of earner's profit
          if (l1User.referredBy) {
            const l2User = await getUserData(l1User.referredBy);
            if (l2User) {
              const l2Bonus = parseFloat((profit * 0.03).toFixed(2));
              if (l2Bonus > 0) {
                const l2Txs = l2User.transactions || [];
                l2Txs.push({
                  type: 'referral',
                  desc: 'L2 referral commission from ' + earner.name + ' via ' + l1User.name + ' (' + productName + ')',
                  amount: l2Bonus,
                  date: new Date().toLocaleDateString()
                });
                await saveUserData(l1User.referredBy, {
                  wallet: (l2User.wallet || 0) + l2Bonus,
                  inviteEarnings: (l2User.inviteEarnings || 0) + l2Bonus,
                  transactions: l2Txs
                });
              }
            }
          }
        }
      }
    }
  } catch(e) {
    console.error('Referral commission error:', e);
  }
}

// ===== WITHDRAW =====
function updateReceiveAmount() {
  const amt = parseFloat(document.getElementById('withdrawAmount').value) || 0;
  const el = document.getElementById('wdReceiveAmt');
  if (el) el.textContent = amt > 1 ? (amt - 1).toFixed(2) + ' USDT' : '-- USDT';
}

async function submitWithdraw() {
  const user = firebase.auth().currentUser;
  if (!user) return;
  const email    = user.email;
  const userData = await getUserData(email);
  const username = document.getElementById('withdrawUsername') ? document.getElementById('withdrawUsername').value.trim() : '';
  const address  = document.getElementById('withdrawAddress').value.trim();
  const amount   = parseFloat(document.getElementById('withdrawAmount').value);
  const pin      = document.getElementById('withdrawPin').value.trim();
  const msg      = document.getElementById('withdrawMsg');

  const ordersSnap = await db.collection('orders').where('userEmail','==',email).where('status','==','completed').get();
  if (ordersSnap.empty) { msg.style.color='#ef4444'; msg.textContent='You must complete at least one order before withdrawing.'; return; }
  if (!address)               { msg.style.color='#ef4444'; msg.textContent='Enter your TRC-20 address.'; return; }
  if (!amount || amount <= 0) { msg.style.color='#ef4444'; msg.textContent='Enter a valid amount.'; return; }
  if (amount < 30)            { msg.style.color='#ef4444'; msg.textContent='Minimum withdrawal amount is $30.'; return; }
  if (amount > userData.wallet){ msg.style.color='#ef4444'; msg.textContent='Insufficient balance.'; return; }
  if (!pin || pin.length < 4) { msg.style.color='#ef4444'; msg.textContent='Enter your 4-digit PIN.'; return; }
  if (!userData.withdrawPin)  { msg.style.color='#ef4444'; msg.textContent='No PIN set. Contact admin.'; return; }
  if (pin !== userData.withdrawPin){ msg.style.color='#ef4444'; msg.textContent='Incorrect PIN.'; return; }

  await db.collection('withdrawals').add({
    id:'WD-' + Date.now(), email, name: userData.name, username,
    address, amount, fee:1, receive: amount-1, date: new Date().toLocaleDateString(), status:'pending'
  });
  const txs = userData.transactions || [];
  txs.push({ type:'withdraw', desc:'Withdrawal: TRC-20 ' + address.slice(0,10) + '...', amount: -amount, date: new Date().toLocaleDateString() });
  await saveUserData(email, { wallet: (userData.wallet||0) - amount, transactions: txs });
  document.getElementById('withdrawAddress').value = '';
  document.getElementById('withdrawAmount').value  = '';
  document.getElementById('withdrawPin').value     = '';
  if (document.getElementById('withdrawUsername')) document.getElementById('withdrawUsername').value = '';
  document.getElementById('wdReceiveAmt').textContent = '-- USDT';
  msg.style.color = '#10b981';
  msg.textContent = 'Withdrawal request submitted!';
  initDashboard();
}

// ===== DASHBOARD =====
let currentPage = 'dashboard';

async function initDashboard() {
  const user = firebase.auth().currentUser;
  if (!user) { window.location.href = 'index.html'; return; }
  const email = user.email;
  const userData = await getUserData(email);
  if (!userData) { window.location.href = 'index.html'; return; }
  currentUserData = userData;
  currentUserEmail = email;

  document.getElementById('sbAvatar').textContent = userData.name.charAt(0).toUpperCase();
  document.getElementById('sbName').textContent   = userData.name;
  document.getElementById('sbId').textContent     = userData.id;
  document.getElementById('topPlan').textContent  = userData.plan || 'None';
  document.getElementById('wName').textContent    = userData.name.split(' ')[0];
  document.getElementById('statWallet').textContent  = '$' + (userData.wallet||0).toFixed(2);
  document.getElementById('statInvites').textContent = userData.inviteCount || 0;
  document.getElementById('statInvEarn').textContent = '$' + (userData.inviteEarnings||0).toFixed(2);
  document.getElementById('statPlan').textContent    = userData.plan || 'None';

  const dashTx = document.getElementById('dashTx');
  const recent = (userData.transactions||[]).slice(-4).reverse();
  dashTx.innerHTML = recent.length === 0 ? '<p class="no-tx">No transactions yet</p>'
    : recent.map(tx => {
        const amt = tx.amount < 0 ? '-$'+Math.abs(tx.amount).toFixed(2) : '+$'+tx.amount.toFixed(2);
        const col = tx.amount < 0 ? '#ef4444' : '#10b981';
        return '<div class="tx-mini-item"><div><div>'+tx.desc+'</div><div class="txd">'+tx.date+'</div></div><div class="txa" style="color:'+col+'">'+amt+'</div></div>';
      }).join('');

  renderMembershipPlans(userData);
  renderProductsPage(userData);
  await checkAndCompletePendingOrders(email);

  // Auto-check every 30 seconds without refresh
  if (!window._orderCheckInterval) {
    window._orderCheckInterval = setInterval(async () => {
      const u = firebase.auth().currentUser;
      if (u) await checkAndCompletePendingOrders(u.email);
    }, 30000);
  }

  document.getElementById('refCodeDisplay').textContent = userData.refCode;
  document.getElementById('invTotal').textContent       = userData.inviteCount || 0;
  document.getElementById('invEarned').textContent      = '$' + (userData.inviteEarnings||0).toFixed(2);
  document.getElementById('walletBal').textContent      = '$' + (userData.wallet||0).toFixed(2);
  document.getElementById('wbInvite').textContent       = '$' + (userData.inviteEarnings||0).toFixed(2);
  document.getElementById('wbBonus').textContent        = '$' + (userData.depositBalance||0).toFixed(2);
  document.getElementById('wbPending').textContent      = '$' + (userData.pendingEarnings||0).toFixed(2);

  const wdBal = document.getElementById('wdBalDisplay');
  if (wdBal) wdBal.textContent = (userData.wallet||0).toFixed(2) + ' USDT';

  const wdHist = document.getElementById('wdHistory');
  if (wdHist) {
    const wdSnap = await db.collection('withdrawals').where('email','==',email).get();
    const wdReqs = [];
    wdSnap.forEach(d => wdReqs.push(d.data()));
    wdReqs.sort((a,b) => b.id.localeCompare(a.id));
    wdHist.innerHTML = wdReqs.length === 0
      ? '<p style="color:var(--muted);font-size:13px;padding:16px 0;text-align:center;">No withdrawals yet</p>'
      : wdReqs.map(r => {
          const sc = r.status==='approved'?'#10b981':r.status==='rejected'?'#ef4444':'#f59e0b';
          return '<div class="wd-hist-item"><div><div style="font-size:13px;font-weight:600;">$'+r.amount.toFixed(2)+' USDT</div><div style="font-size:11px;color:var(--muted);margin-top:3px;">'+r.address.slice(0,16)+'...</div></div><div style="text-align:right;"><div style="font-size:12px;font-weight:700;color:'+sc+';">'+r.status.toUpperCase()+'</div><div style="font-size:11px;color:var(--muted);">'+r.date+'</div></div></div>';
        }).join('');
  }

  const txHistory = document.getElementById('txHistory');
  if (txHistory) {
    txHistory.innerHTML = (userData.transactions||[]).length === 0
      ? '<p class="no-tx" style="padding:24px 0">No transactions yet</p>'
      : (userData.transactions||[]).slice().reverse().map(tx => {
          const amt = tx.amount < 0 ? '-$'+Math.abs(tx.amount).toFixed(2) : '+$'+tx.amount.toFixed(2);
          const col = tx.amount < 0 ? '#ef4444' : '#10b981';
          const badge = tx.status==='pending' ? '<span style="font-size:10px;color:#f59e0b;margin-left:6px;">Processing</span>' : '';
          return '<div class="tx-full-item"><div class="tx-desc">'+tx.desc+badge+'</div><div class="tx-right"><div class="tx-amt" style="color:'+col+'">'+amt+'</div><div class="tx-date">'+tx.date+'</div></div></div>';
        }).join('');
  }
}

// ===== MEMBERSHIP =====
function renderMembershipPlans(user) {
  const grid = document.getElementById('plansGrid');
  if (!grid) return;
  grid.innerHTML = VIP_PLANS.map(plan => {
    const isActive = user.plan === plan.id;
    const storeRange = plan.storeMax ? '$'+plan.storeMin.toLocaleString()+' - $'+plan.storeMax.toLocaleString() : '$'+plan.storeMin.toLocaleString()+'+';
    return '<div class="plan-card '+plan.color+'-card'+(isActive?' active-plan':'')+(plan.id==='SuperVIP'?' elite-card':'')+'">'+
      (isActive?'<div class="active-plan-tag">Active</div>':'')+
      '<div class="plan-top"><div class="plan-badge '+plan.color+'-b">'+plan.label+'</div></div>'+
      '<h3>'+plan.label+'</h3>'+
      '<div class="plan-price">$'+plan.recharge.toLocaleString()+'<span> recharge</span></div>'+
      '<ul class="plan-features"><li class="yes">Commission on completed orders</li><li class="yes">Store range: '+storeRange+'</li><li class="yes">24/7 Support</li></ul>'+
      '<button class="plan-btn deposit-btn '+(plan.id==='SuperVIP'?'elite':'primary')+'" onclick="goDeposit(\''+plan.id+'\','+plan.recharge+')">'+(isActive?'Active Plan':'Deposit & Activate')+'</button>'+
      (isActive?'<button class="plan-btn primary" style="margin-top:8px;" onclick="showPage(\'products\')">Browse Marketplace</button>':'')+
    '</div>';
  }).join('');
}

// ===== PRODUCTS =====
async function renderProductsPage(user) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  if (!user.plan || user.plan === 'None') {
    grid.innerHTML = '<div style="text-align:center;padding:48px;color:var(--muted)"><div style="font-size:48px;margin-bottom:16px;">??</div><p>Activate a VIP plan to access products</p></div>';
    return;
  }
  const products = PRODUCTS[user.plan] || [];
  const email    = firebase.auth().currentUser.email;
  const ordersSnap = await db.collection('orders').where('userEmail','==',email).get();
  const userOrders = [];
  ordersSnap.forEach(d => userOrders.push(d.data()));
  const plan    = VIP_PLANS.find(p => p.id === user.plan);
  const pct     = plan ? plan.earningPct : 0.8;
  const balance = user.wallet || 0;

  let displayProducts = products;
  if (user.plan === 'SuperVIP') {
    if (balance >= 2000)     displayProducts = products;
    else if (balance >= 500) displayProducts = products.filter(p => p.price <= 700);
    else if (balance >= 100) displayProducts = products.filter(p => p.price <= 200);
    else                     displayProducts = products.filter(p => p.price <= 100);
  }

  if (displayProducts.length === 0) {
    grid.innerHTML = '<div style="text-align:center;padding:48px;color:var(--muted)"><div style="font-size:48px;margin-bottom:16px;">??</div><p>Add more balance to unlock products</p></div>';
    return;
  }

  grid.innerHTML = displayProducts.map(p => {
    const ordered    = userOrders.find(o => o.productId===p.id && o.status==='processing');
    const commission = (p.price * pct / 100).toFixed(2);
    const canAfford  = p.price <= balance;
    const locked     = !canAfford && !ordered;
    return '<div class="product-card'+(locked?' product-locked':'')+'">'+
      '<div class="product-img"><img src="'+p.image+'" alt="'+p.name+'" onerror="this.src=\'https://via.placeholder.com/300x200/12121f/4f46e5?text=Product\'"/>'+
      '<span class="product-cat">'+p.cat+'</span>'+(locked?'<div class="product-lock-overlay">?? Insufficient Balance</div>':'')+
      '</div><div class="product-info">'+
      '<div class="product-name">'+p.name+'</div>'+
      '<div class="product-price">$'+p.price.toFixed(2)+'</div>'+
      '<div class="product-commission-box"><div class="pcb-icon">$</div><div>'+
      '<div class="pcb-line1">You earn <span class="pcb-pct">'+pct+'%</span> commission</div>'+
      '<div class="pcb-line2">'+pct+'% � $'+p.price.toFixed(2)+' = <span class="pcb-amt">$'+commission+'</span></div>'+
      '</div></div></div>'+
      '<button class="product-btn'+(ordered?' ordered':'')+(locked?' locked-btn':'')+'" '+
      (ordered||locked?'disabled':'onclick="placeOrder(\''+p.id+'\',\''+user.plan+'\')"')+'>'+
      (ordered?'Processing...':locked?'Insufficient Balance':'Place Order')+
      '</button>'+
    '</div>';
  }).join('');
}

// ===== DEPOSIT MODAL =====
function goDeposit(planId, amount) {
  if (!currentUserData) return;
  if (currentUserData.plan === planId) { showToast('You already have this plan!'); return; }
  const plan = VIP_PLANS.find(p => p.id === planId);
  document.getElementById('depositModalPlan').textContent   = plan.label;
  document.getElementById('depositModalAmount').textContent = '$' + amount.toLocaleString();
  document.getElementById('depositReqPlan').value   = planId;
  document.getElementById('depositReqAmount').value = amount;
  document.getElementById('depositReqMsg').value    = '';
  document.getElementById('depositModal').classList.add('open');
}

async function submitDepositRequest() {
  const user   = firebase.auth().currentUser;
  const email  = user.email;
  const userData = await getUserData(email);
  const planId = document.getElementById('depositReqPlan').value;
  const amount = parseFloat(document.getElementById('depositReqAmount').value);
  const note   = document.getElementById('depositReqMsg').value.trim();
  const plan   = VIP_PLANS.find(p => p.id === planId);
  await db.collection('deposit_requests').add({
    id:'REQ-'+Date.now(), userId:userData.id, name:userData.name,
    email, planId, planLabel:plan.label,
    amount, note, status:'pending', date:new Date().toLocaleDateString()
  });
  document.getElementById('depositModal').classList.remove('open');
  showToast('Deposit request sent! Admin will activate your plan shortly.');
}

function closeDepositModal() {
  document.getElementById('depositModal').classList.remove('open');
}

// ===== NAVIGATION =====
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sb-link').forEach(l => l.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  const map = { dashboard:0, membership:1, invite:2, wallet:3, products:4 };
  const links = document.querySelectorAll('.sb-link');
  if (links[map[name]]) links[map[name]].classList.add('active');
  const titles = { dashboard:'Dashboard', membership:'VIP Membership', invite:'Invite & Earn', wallet:'My Wallet', products:'Marketplace', withdraw:'Withdraw Funds' };
  document.getElementById('pageTitle').textContent = titles[name] || 'Dashboard';
  currentPage = name;
  initDashboard();
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) overlay.classList.remove('show');
  }
}

function copyRef() {
  const code = document.getElementById('refCodeDisplay').textContent;
  navigator.clipboard.writeText(code).then(() => showToast('Referral code copied!'));
}

async function logout() {
  await firebase.auth().signOut();
  window.location.href = 'index.html';
}

function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  const overlay = document.getElementById('sidebarOverlay');
  if (overlay) overlay.classList.toggle('show');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ===== EXPOSE TO WINDOW =====
window.showTab = showTab;
window.registerUser = registerUser;
window.loginUser = loginUser;
window.showPage = showPage;
window.logout = logout;
window.toggleSidebar = toggleSidebar;
window.copyRef = copyRef;
window.placeOrder = placeOrder;
window.completeOrder = completeOrder;
window.checkAndCompletePendingOrders = checkAndCompletePendingOrders;
window.distributeReferralCommissions = distributeReferralCommissions;
window.goDeposit = goDeposit;
window.submitDepositRequest = submitDepositRequest;
window.closeDepositModal = closeDepositModal;
window.submitWithdraw = submitWithdraw;
window.updateReceiveAmount = updateReceiveAmount;
