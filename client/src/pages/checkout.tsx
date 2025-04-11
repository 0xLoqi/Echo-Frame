import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { initialGalleryItems, frameOptions, sizeOptions, generateOrderId } from "@/lib/art-data";

// Form schema
const checkoutSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  zip: z.string().min(5, { message: "ZIP code is required" }),
  country: z.string().min(2, { message: "Country is required" }),
  giftWrap: z.boolean().default(false),
  giftMessage: z.string().optional(),
  paymentMethod: z.string().min(1, { message: "Payment method is required" }),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [processing, setProcessing] = useState(false);
  const [artwork] = useState(initialGalleryItems[0]);
  const [selectedSize, setSelectedSize] = useState(sizeOptions[2].id); // Default to "large"
  const [selectedFrame, setSelectedFrame] = useState(frameOptions[0].id); // Default to "black"

  // Calculate price based on selected size
  const calculatePrice = () => {
    const sizeOption = sizeOptions.find((size) => size.id === selectedSize);
    return sizeOption ? sizeOption.price : 49.99;
  };

  // Calculate subtotal
  const subtotal = calculatePrice();
  const shipping = 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  // Get size and frame labels
  const getSizeLabel = () => {
    const sizeOption = sizeOptions.find((size) => size.id === selectedSize);
    return sizeOption ? sizeOption.label : "";
  };

  const getFrameLabel = () => {
    const frameOption = frameOptions.find((frame) => frame.id === selectedFrame);
    return frameOption ? frameOption.label : "";
  };

  // Form setup
  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      country: "USA",
      giftWrap: false,
      giftMessage: "",
      paymentMethod: "creditCard",
    },
  });

  // Handle form submission
  const onSubmit = async (data: CheckoutForm) => {
    setProcessing(true);
    
    try {
      // In a real app, we would submit to an API
      // For now, simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      const orderDetails = {
        orderId: generateOrderId(),
        artwork: artwork,
        size: selectedSize,
        frame: selectedFrame,
        price: total,
        customer: data,
      };
      
      // Log the order
      console.log("Order placed:", orderDetails);
      
      // Show success toast
      toast({
        title: "Order Placed Successfully!",
        description: `Your order #${orderDetails.orderId} has been confirmed.`,
      });
      
      // Redirect to a thank you page (we'll just go back to home for now)
      setLocation("/");
    } catch (error) {
      console.error("Error placing order:", error);
      toast({
        title: "Error",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="py-12 pt-24 bg-neutral-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-center">Checkout</h1>
          <p className="text-center text-neutral-600 mb-10">
            Complete your order to bring your custom artwork home
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Shipping Information
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St, Apt 4B" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem className="col-span-2 md:col-span-2">
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="City" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State</FormLabel>
                              <FormControl>
                                <Input placeholder="State" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="zip"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ZIP Code</FormLabel>
                              <FormControl>
                                <Input placeholder="ZIP" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="mt-4">
                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select country" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="USA">United States</SelectItem>
                                  <SelectItem value="CAN">Canada</SelectItem>
                                  <SelectItem value="GBR">United Kingdom</SelectItem>
                                  <SelectItem value="AUS">Australia</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Gift Options
                      </h2>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <Label htmlFor="gift-wrap" className="font-medium">
                            Add Gift Wrap
                          </Label>
                          <p className="text-sm text-neutral-500">
                            Include premium eco-friendly gift wrapping
                          </p>
                        </div>
                        <FormField
                          control={form.control}
                          name="giftWrap"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  id="gift-wrap"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="giftMessage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gift Message (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Add a personal message"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This will be printed on a premium card.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-xl font-semibold mb-4">
                        Payment Method
                      </h2>
                      
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <FormItem>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select payment method" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="creditCard">
                                  Credit Card
                                </SelectItem>
                                <SelectItem value="paypal">PayPal</SelectItem>
                                <SelectItem value="applepay">Apple Pay</SelectItem>
                                <SelectItem value="googlepay">Google Pay</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="mt-4 bg-neutral-100 p-4 rounded-lg">
                        <div className="flex justify-between items-center text-neutral-500 text-sm">
                          <span>Credit Card fields will appear here</span>
                          <div className="flex gap-2">
                            <i className="fab fa-cc-visa"></i>
                            <i className="fab fa-cc-mastercard"></i>
                            <i className="fab fa-cc-amex"></i>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Button
                    type="submit"
                    className="w-full py-6 bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md hover:shadow-lg transition"
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <i className="fas fa-circle-notch fa-spin mr-2"></i>
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock mr-2"></i>
                        Complete Purchase
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="flex gap-4 mb-6">
                    <div className="w-20 h-20 bg-neutral-100 rounded-md overflow-hidden">
                      <img
                        src={artwork.imageUrl}
                        alt={artwork.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{artwork.title}</h3>
                      <p className="text-sm text-neutral-500">
                        {getSizeLabel()}, {getFrameLabel()} frame
                      </p>
                      <p className="text-sm text-primary font-medium mt-1">
                        ${calculatePrice().toFixed(2)}
                      </p>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="mt-6 bg-neutral-50 p-4 rounded-lg">
                    <div className="flex items-center mb-3">
                      <div className="mr-2 text-success">
                        <i className="fas fa-truck-fast"></i>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Free shipping</span> on orders over $99
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-2 text-success">
                        <i className="fas fa-shield-halved"></i>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Secure checkout</span> with 256-bit encryption
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
