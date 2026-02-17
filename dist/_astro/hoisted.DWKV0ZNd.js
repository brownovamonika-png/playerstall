import"./hoisted.B74hoRpg.js";document.addEventListener("DOMContentLoaded",function(){function y(){const e=localStorage.getItem("playerstall_cart");return e?JSON.parse(e):[]}function h(){const e=y(),t=document.getElementById("checkout-items-body"),o=document.getElementById("checkout-subtotal"),c=document.getElementById("order-total-amount");if(!t)return;let i=0,d="";e.length===0?(d='<tr><td colspan="3" style="text-align: center; padding: 40px;">Your cart is empty. <a href="/shop">Return to shop</a></td></tr>',o&&(o.textContent="0.00"),c&&(c.textContent="0.00")):e.forEach(s=>{const m=s.price*s.quantity;i+=m,d+=`
						<tr class="cart_item">
							<td class="product-name">
								${s.name}
							</td>
							<td class="product-quantity">
								${s.quantity}
							</td>
							<td class="product-total">
								<span class="woocommerce-Price-amount amount">
									<bdi><span class="woocommerce-Price-currencySymbol">$</span>${m.toFixed(2)}</bdi>
								</span>
							</td>
						</tr>
					`}),t.innerHTML=d;const u=0;o&&(o.textContent=i.toFixed(2)),c&&(c.textContent=(i+u).toFixed(2));const p=document.getElementById("checkout-shipping-amount");return p&&(p.textContent=u.toFixed(2)),i}h();const r=document.getElementById("ship-to-different-address-checkbox"),n=document.getElementById("shippingFields");r&&n&&r.addEventListener("change",function(){this.checked?(n.style.display="block",n.querySelectorAll('[id$="_field"] input[required], [id$="_field"] select[required]').forEach(t=>{t.setAttribute("required","required")})):(n.style.display="none",n.querySelectorAll('[id$="_field"] input, [id$="_field"] select').forEach(t=>{t.removeAttribute("required")}))}),document.querySelectorAll('.wc_payment_method input[type="radio"]').forEach(e=>{e.addEventListener("change",function(){if(document.querySelectorAll(".payment_box").forEach(t=>{t.style.display="none"}),this.checked){const t=this.closest(".wc_payment_method").querySelector(".payment_box");t&&(t.style.display="block")}})});const l=document.querySelector('.wc_payment_method input[type="radio"]:checked');if(l){const e=l.closest(".wc_payment_method").querySelector(".payment_box");e&&(e.style.display="block")}const a=document.querySelector("form.checkout");a&&a.addEventListener("submit",function(e){e.preventDefault(),alert("Order placed successfully! (This is a demo - no actual order was placed)")})});
