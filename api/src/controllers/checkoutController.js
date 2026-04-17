const stripeModule = require('stripe');
const Pedido = require('../models/pedidoModel'); 

exports.createSession = async (req, res) => {
    try {
        const { orderId, products } = req.body;
        
        if (!products || products.length === 0) {
            return res.status(400).json({ status: 'error', message: 'No hay productos para hacer checkout' });
        }
        
        const stripe = stripeModule(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            client_reference_id: orderId,
            line_items: products.map(p => ({
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: p.nombre || p.name
                    },
                    unit_amount: Math.round((p.precio || p.price) * 100) 
                },
                quantity: p.cantidad || p.quantity
            })),
            mode: 'payment',
            success_url: process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/checkout/success` : 'http://localhost:5173/checkout/success',
            cancel_url: process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/checkout/cancel` : 'http://localhost:5173/checkout/cancel'
        });

        res.json({ sessionId: session.id, url: session.url });
    } catch (error) {
        console.error('Error creando sesión Stripe:', error);
        res.status(500).json({ status: 'error', message: error.message });
    }
};

exports.webhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
        if (!endpointSecret) {
            // Mock mode for local testing if no secret is established
            event = Buffer.isBuffer(req.body) ? JSON.parse(req.body.toString()) : req.body;
        } else {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        }
    } catch (err) {
        console.error('Webhook Error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Gestionar el pago completado
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const orderId = session.client_reference_id;

        if (orderId) {
            try {
                // Actualitzem l'estat a completado
                await Pedido.findOneAndUpdate({ id_pedido: orderId }, { estado: 'completado' });
                console.log(`Pedido ${orderId} actualizado a pagado.`);
            } catch (err) {
                console.error('Error al actualizar el estado del pedido:', err);
            }
        }
    }

    res.json({ received: true });
};
