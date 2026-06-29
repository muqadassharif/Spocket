# Spocket — Referral & Earning Platform

A web application that simulates a referral-based earning platform. Users deposit funds, activate VIP membership plans, place orders on a marketplace, and earn commissions automatically. A two-level referral system distributes commissions from profits to upline members.

Built with vanilla HTML, CSS, and JavaScript — no frameworks. Firebase handles authentication and the database.

---

## Live Demo

Add link after deployment.

---

## Test Credentials

### New User
Register directly from the Sign Up page. Referral code is optional in the demo.

### Admin Panel
Open `/admin.html` or click the Admin button on the dashboard.

- Username: `admin`
- Password: `admin123`

---

## Testing the Full Flow

**1. Register**
Go to the app and create a new account. Referral code field is optional.

**2. Request a Deposit**
After login, go to Membership, choose a VIP plan, and submit a deposit request.

**3. Admin Approves**
Open the Admin Panel, go to Deposit Requests, and approve the request. The user's wallet is funded and the plan activates.

**4. Place an Order**
Go to Marketplace and place an order on any product. The amount moves to frozen balance.

**5. Order Completes Automatically**
After 2 minutes (demo mode), the order completes without any refresh. Commission is credited to the wallet and referral commissions are distributed to the upline.

**6. Withdraw**
Go to Withdraw, enter a TRC-20 address, amount (minimum $30), and PIN. Admin approves from the Withdrawals tab.

---

## VIP Plans

| Plan      | Deposit   | Commission |
|-----------|-----------|------------|
| VIP 1     | $100      | 0.8%       |
| VIP 2     | $500      | 2%         |
| VIP 3     | $1,500    | 5%         |
| VIP 4     | $3,500    | 8%         |
| Super VIP | $10,000   | 11%        |

---

## Referral System

Level 1 — Direct referral earns 5% of the referred user's commission profit.
Level 2 — One level deeper earns 3% of the same profit.

Commissions are taken from profit only, not from the deposit amount.

---

## Tech Stack

- HTML / CSS / JavaScript
- Firebase Authentication
- Firebase Firestore
- Google Fonts (Poppins)

---

## Project Structure

```
index.html        — Login and Register
splash.html       — Splash screen (entry point)
dashboard.html    — User dashboard
admin.html        — Admin panel
coming-soon.html  — Placeholder
app.js            — Application logic
style.css         — Styles
images/           — Product images
```

---

## Key Features

- Firebase authentication with referral code validation
- Five-tier VIP membership system
- Marketplace with 80+ products across multiple categories
- Automatic order completion with commission crediting
- Two-level referral commission distribution from profits
- USDT TRC-20 withdrawal system with PIN verification
- Admin panel for managing users, deposits, withdrawals, orders, and notifications
- Fully responsive design
- Floating live support button (WhatsApp)
