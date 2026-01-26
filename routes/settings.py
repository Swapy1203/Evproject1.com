# routes/settings.py
from flask import Blueprint, render_template, request, redirect, session
from DBConnection import Db

settings_bp = Blueprint('settings', __name__, url_prefix='/settings')

@settings_bp.route('/payment-methods')
def payment_methods_page():
    uid = session.get('uid')
    if not uid: return redirect('/login')
    db = Db()
    methods = db.select("SELECT * FROM payment_methods WHERE login_id=%s ORDER BY is_default DESC, created_at DESC", (uid,))
    return render_template('user/payment_methods.html', methods=methods, current_page='settings')

@settings_bp.route('/payment-methods/add', methods=['POST'])
def payment_methods_add():
    uid = session.get('uid')
    if not uid: return redirect('/login')
    method_type = request.form.get('method_type')
    provider = request.form.get('provider') or None
    identifier_mask = request.form.get('identifier_mask')
    nickname = request.form.get('nickname') or None
    is_default = 1 if request.form.get('is_default') == 'on' else 0

    db = Db()
    if is_default:
        db.update("UPDATE payment_methods SET is_default=0 WHERE login_id=%s", (uid,))
    db.insert("INSERT INTO payment_methods (login_id, method_type, provider, identifier_mask, nickname, is_default) VALUES (%s,%s,%s,%s,%s,%s)",
              (uid, method_type, provider, identifier_mask, nickname, is_default))
    return redirect('/settings/payment-methods')

@settings_bp.route('/payment-methods/edit/<int:pmid>', methods=['POST'])
def payment_methods_edit(pmid):
    uid = session.get('uid')
    if not uid: return redirect('/login')
    nickname = request.form.get('nickname') or None
    provider = request.form.get('provider') or None
    db = Db()
    db.update("UPDATE payment_methods SET nickname=%s, provider=%s WHERE id=%s AND login_id=%s",
              (nickname, provider, pmid, uid))
    return redirect('/settings/payment-methods')

@settings_bp.route('/payment-methods/delete/<int:pmid>', methods=['POST'])
def payment_methods_delete(pmid):
    uid = session.get('uid')
    if not uid: return redirect('/login')
    db = Db()
    db.delete("DELETE FROM payment_methods WHERE id=%s AND login_id=%s", (pmid, uid))
    return redirect('/settings/payment-methods')

@settings_bp.route('/payment-methods/default/<int:pmid>', methods=['POST'])
def payment_methods_default(pmid):
    uid = session.get('uid')
    if not uid: return redirect('/login')
    db = Db()
    db.update("UPDATE payment_methods SET is_default=0 WHERE login_id=%s", (uid,))
    db.update("UPDATE payment_methods SET is_default=1 WHERE id=%s AND login_id=%s", (pmid, uid))
    return redirect('/settings/payment-methods')
