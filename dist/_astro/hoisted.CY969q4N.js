import"./hoisted.Bs9XmLrN.js";document.addEventListener("DOMContentLoaded",function(){function l(){const t=localStorage.getItem("playerstall_cart");return t?JSON.parse(t):[]}function y(t){localStorage.setItem("playerstall_cart",JSON.stringify(t)),h(),p()}function h(){const e=l().reduce((o,c)=>o+c.quantity,0),n=document.querySelector(".cart-count");n&&(n.textContent=e),window.dispatchEvent(new CustomEvent("cartUpdated",{detail:{count:e}}))}function p(){const t=l(),e=document.getElementById("cart-items-container"),n=document.getElementById("cart-empty-message"),o=document.getElementById("cart-items-body"),c=document.getElementById("cart-subtotal"),u=document.getElementById("cart-total");if(t.length===0){e&&(e.style.display="none"),n&&(n.style.display="block");return}e&&(e.style.display="block"),n&&(n.style.display="none");let i=0,x="";t.forEach((a,s)=>{const r=a.price*a.quantity;i+=r,x+=`
					<tr class="cart_item">
						<td class="product-remove">
							<a href="#" class="remove" data-index="${s}" aria-label="Remove this item">×</a>
						</td>
						<td class="product-thumbnail">
							<img src="${a.image}" alt="${a.name}" width="32" height="32" style="width: 32px !important; height: 32px !important; max-width: 32px !important; max-height: 32px !important; min-width: 32px !important; min-height: 32px !important; object-fit: cover; display: block; margin: 0; padding: 0; background: #ffffff;" />
						</td>
						<td class="product-name" data-title="Product">
							${a.name}
						</td>
						<td class="product-price" data-title="Price">
							<span class="woocommerce-Price-amount amount">
								<bdi><span class="woocommerce-Price-currencySymbol">$</span>${a.price.toFixed(2)}</bdi>
							</span>
						</td>
						<td class="product-quantity" data-title="Quantity">
							<input type="number" class="quantity-input qty-input" value="${a.quantity}" min="1" data-index="${s}" />
						</td>
						<td class="product-subtotal" data-title="Subtotal">
							<span class="woocommerce-Price-amount amount">
								<bdi><span class="woocommerce-Price-currencySymbol">$</span>${r.toFixed(2)}</bdi>
							</span>
						</td>
					</tr>
				`}),o&&(o.innerHTML=x),c&&(c.textContent=i.toFixed(2));const b=document.getElementById("shipping-cost"),E=b?parseFloat(b.textContent):50,C=i+E;u&&(u.textContent=C.toFixed(2)),document.querySelectorAll(".remove").forEach(a=>{a.addEventListener("click",function(s){s.preventDefault();const r=parseInt(this.getAttribute("data-index")),d=l();d.splice(r,1),y(d)})}),document.querySelectorAll(".qty-input").forEach(a=>{a.addEventListener("change",function(){const s=parseInt(this.getAttribute("data-index")),r=parseInt(this.value)||1,d=l();d[s].quantity=r,y(d)})})}p(),h(),window.addEventListener("cartUpdated",function(){p()}),setTimeout(function(){const t=document.querySelector(".shipping-calculator-button"),e=document.querySelector(".woocommerce-shipping-calculator-form");t&&e&&t.addEventListener("click",function(n){n.preventDefault();const o=e.style.display==="none"||!e.style.display;e.style.display=o?"block":"none",this.textContent=o?"Cancel":"Change address"})},100);const g=document.querySelectorAll('.woocommerce-shipping-methods input[type="radio"]'),m=document.getElementById("shipping-cost"),f=document.getElementById("cart-total");g.length&&m&&f&&g.forEach(t=>{t.addEventListener("change",function(){const n=l().reduce((u,i)=>u+i.price*i.quantity,0);let o=50;this.value==="flat_rate"?(o=50,m.textContent="50.00"):this.value==="local_pickup"&&(o=0,m.textContent="0.00");const c=n+o;f.textContent=c.toFixed(2)})})});
