document.addEventListener("DOMContentLoaded",function(){function x(){const e=localStorage.getItem("playerstall_cart");return e?JSON.parse(e):[]}function F(){const e=x(),c=document.getElementById("checkout-items-body"),n=document.getElementById("checkout-subtotal"),m=document.getElementById("order-total-amount");if(!c)return;let p=0,o="";if(e.length===0)o='<tr><td colspan="3" style="text-align: center; padding: 40px;">Your cart is empty. <a href="/shop">Return to shop</a></td></tr>',n&&(n.textContent="0.00"),m&&(m.textContent="0.00");else{let i="";e.forEach(t=>{const u=t.price*t.quantity;p+=u;const S=t.planner||t.id&&t.id.startsWith("planner-");if(S&&t.accessories){const s=t.roomName||"Room Planner";s!==i&&(i=s,o+=`<tr class="ot-room-header"><td colspan="3">${i}</td></tr>`);let l="";t.accessories.length&&(l=`<ul class="ot-acc-list" style="margin-left:20px">${t.accessories.map(d=>`<li><span class="ot-acc-label">${d.label}</span><span class="ot-acc-price">+$${d.price}</span></li>`).join("")}</ul>`),o+=`
							<tr class="cart_item">
								<td class="product-name">
									<span class="ot-item-name">${t.name} <span class="ot-base-price">$${(t.basePrice??0).toLocaleString("en-US",{minimumFractionDigits:2})}</span></span>
									<span class="ot-item-spec">${t.widthIn}″W × ${t.depthIn}″D</span><ul class="ot-item-spec-bullets"><li>${t.colorLabel}</li></ul>
									${l}
								</td>
								<td class="product-quantity">${t.quantity}</td>
								<td class="product-total">
									<span class="woocommerce-Price-amount amount">
										<bdi><span class="woocommerce-Price-currencySymbol">$</span>${u.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</bdi>
									</span>
								</td>
							</tr>
						`}else if(S&&t.model){const s=t.model.split(" · "),l=s[0]||"Room Planner",d=[],h=[];for(let a=1;a<s.length;a++)s[a].includes("(+$")?h.push(s[a]):d.push(s[a]);const _=d.join(" · ");let q="";h.length&&(q=`<ul class="ot-acc-list" style="margin-left:20px">${h.map(a=>`<li>${a}</li>`).join("")}</ul>`),l!==i&&(i=l,o+=`<tr class="ot-room-header"><td colspan="3">${i}</td></tr>`),o+=`
							<tr class="cart_item">
								<td class="product-name">
									<span class="ot-item-name">${t.name}</span>
									<span class="ot-item-spec">${_}</span>
									${q}
								</td>
								<td class="product-quantity">${t.quantity}</td>
								<td class="product-total">
									<span class="woocommerce-Price-amount amount">
										<bdi><span class="woocommerce-Price-currencySymbol">$</span>${u.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</bdi>
									</span>
								</td>
							</tr>
						`}else o+=`
							<tr class="cart_item">
								<td class="product-name">
									<span class="cart-item-name">${t.name}</span>${t.model?`<br /><span class="cart-item-description">${t.model}</span>`:""}
								</td>
								<td class="product-quantity">${t.quantity}</td>
								<td class="product-total">
									<span class="woocommerce-Price-amount amount">
										<bdi><span class="woocommerce-Price-currencySymbol">$</span>${u.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}</bdi>
									</span>
								</td>
							</tr>
						`})}c.innerHTML=o;const $=0;n&&(n.textContent=p.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),m&&(m.textContent=(p+$).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}));const b=document.getElementById("checkout-shipping-amount");return b&&(b.textContent=$.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})),p}F();const y=document.getElementById("ship-to-different-address-checkbox"),r=document.getElementById("shippingFields");y&&r&&y.addEventListener("change",()=>{y.checked?(r.style.display="block",r.querySelectorAll('[id$="_field"] input[required], [id$="_field"] select[required]').forEach(n=>{n.setAttribute("required","required")})):(r.style.display="none",r.querySelectorAll('[id$="_field"] input, [id$="_field"] select').forEach(n=>{n.removeAttribute("required")}))}),document.querySelectorAll('.wc_payment_method input[type="radio"]').forEach(e=>{e.addEventListener("change",()=>{const c=e;if(document.querySelectorAll(".payment_box").forEach(n=>{n.style.display="none"}),c.checked){const n=c.closest(".wc_payment_method")?.querySelector(".payment_box");n&&(n.style.display="block")}})});const g=document.querySelector('.wc_payment_method input[type="radio"]:checked');if(g){const e=g.closest(".wc_payment_method")?.querySelector(".payment_box");e&&(e.style.display="block")}const f=document.querySelector("form.checkout");f&&f.addEventListener("submit",function(e){e.preventDefault(),alert("Order placed successfully! (This is a demo - no actual order was placed)")})});
