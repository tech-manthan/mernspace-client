"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useMemo, useState } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { CreditCard, Coins, Plus } from "lucide-react";
import z from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const paymentMethods = {
  CARD: "card",
  CASH: "cash",
} as const;

const paymentMethodsIcon = {
  CARD: CreditCard,
  CASH: Coins,
} as const;

const customerDetailSchema = z.object({
  firstName: z
    .string({
      error: "firstName is required",
    })
    .min(3, "firstName must have atleast 3 characters")
    .max(20, "firstName must have atmost 20 characters"),
  lastName: z
    .string({
      error: "firstName is required",
    })
    .min(3, "firstName must have atleast 3 characters")
    .max(20, "firstName must have atmost 20 characters"),
  email: z
    .email({
      error: "email is invalid",
    })
    .nonempty("email is required"),
  address: z
    .string({
      error: "address is required",
    })
    .min(20, "address must have atleast 20 characters")
    .max(100, "address must have atmost 100 characters"),
  paymentMethod: z.enum(Object.values(paymentMethods), {
    error: "paymentMethod must be card or cash",
  }),
  comment: z.string().optional(),
});

type CustomerDetail = z.infer<typeof customerDetailSchema>;

const couponSchema = z.object({
  couponCode: z.string().optional(),
});

type Coupon = z.infer<typeof couponSchema>;

const addressSchema = z.object({
  address: z
    .string()
    .min(20, "Address must have minimum length of 20 characters")
    .max(100, "Address must not have more than 100 characters"),
});

type AddressSchemaType = z.infer<typeof addressSchema>;

type Address = {
  _id: string;
  address: string;
};

const CheckoutForm = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      _id: "1",
      address: "123, ABC Street, Malad West Mumbai Maharashtra, India 400064",
    },
    {
      _id: "2",
      address:
        "Flat No. 501, Sunshine Apartments, Andheri East, Mumbai, Maharastra, India 400069",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const defaultAddress = useMemo(() => addresses?.at(0)?.address, [addresses]);

  const customerForm = useForm<CustomerDetail>({
    resolver: zodResolver(customerDetailSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: defaultAddress ?? "",
      paymentMethod: "card",
      comment: "",
      email: "",
    },
  });

  const couponForm = useForm<Coupon>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      couponCode: "",
    },
  });

  const addessForm = useForm<AddressSchemaType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: "",
    },
  });

  function handleCustomerFormSubmit(values: CustomerDetail) {
    console.log(values);
    customerForm.reset();
  }

  function handleCouponFormSubmit(values: Coupon) {
    console.log(values);
    couponForm.reset();
  }

  function handleAddressFormSubmit(values: AddressSchemaType) {
    setAddresses((prev) => [
      {
        _id: String(Date.now()),
        address: values.address,
      },
      ...prev,
    ]);
    addessForm.reset();
    setModalOpen(false);
  }

  return (
    <>
      <Card className="col-span-2 rounded-md">
        <CardHeader>
          <CardTitle className="text-2xl">Customer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...customerForm}>
            <form
              className="space-y-6"
              onSubmit={customerForm.handleSubmit(handleCustomerFormSubmit)}
            >
              {/* First Name */}
              <FormField
                control={customerForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Manthan"
                        {...field}
                        className="bg-background text-base md:text-base h-10 py-4 md:py-4 focus-visible:ring-0 rounded-sm border-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={customerForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Sharma"
                        {...field}
                        className="bg-background text-base md:text-base h-10 py-4 md:py-4 focus-visible:ring-0 rounded-sm border-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={customerForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="manthan@gmail.com"
                        type="email"
                        className="bg-background text-base md:text-base h-10 py-4 md:py-4 focus-visible:ring-0 rounded-sm border-2"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address */}
              <FormField
                control={customerForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel>Address</FormLabel>
                      <Dialog
                        open={modalOpen}
                        onOpenChange={(open) => {
                          addessForm.reset();
                          setModalOpen(open);
                        }}
                      >
                        <DialogTrigger className="flex items-center gap-2 text-primary text-sm">
                          <Plus className="size-5" />
                          <span>Add New Address</span>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Address</DialogTitle>
                            <DialogDescription></DialogDescription>
                          </DialogHeader>
                          <Form {...addessForm}>
                            <form>
                              {/* Comment */}
                              <FormField
                                control={addessForm.control}
                                name="address"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Address"
                                        {...field}
                                        className="h-24 mt-2 resize-none bg-background border-2 text-base md:text-base focus-visible:ring-0"
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </form>
                          </Form>
                          <DialogFooter>
                            <Button
                              onClick={addessForm.handleSubmit(
                                handleAddressFormSubmit
                              )}
                            >
                              Submit
                            </Button>
                            <DialogClose asChild>
                              <Button variant={"outline"}>Cancel</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className="grid grid-cols-2 gap-4 mt-2"
                      >
                        {addresses.map((option) => (
                          <div
                            key={option._id}
                            className={cn(
                              "flex items-center gap-3 py-8 px-6 hover:bg-accent hover:text-accent-foreground rounded-sm border-2 overflow-clip",
                              option.address.includes(field.value) &&
                                "border-primary"
                            )}
                          >
                            {/* 👇 yaha radio ka gol gol dikhai dega */}
                            <RadioGroupItem
                              value={option.address}
                              id={option._id}
                            />
                            <Label
                              htmlFor={option._id}
                              className="flex-1 cursor-pointer"
                            >
                              {option.address}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Payment Method */}
              <FormField
                control={customerForm.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-5 gap-4 mt-2"
                      >
                        {Object.entries(paymentMethods).map(([key, value]) => {
                          const Icon =
                            paymentMethodsIcon[
                              key as keyof typeof paymentMethodsIcon
                            ];
                          return (
                            <div key={key} className="h-full">
                              <RadioGroupItem
                                value={value}
                                id={value}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={value}
                                className="flex gap-2 h-full w-full items-center justify-center  border-2 bg-white px-2 py-5 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary rounded-sm"
                              >
                                <Icon />
                                {value[0].toUpperCase() + value.slice(1)}
                              </Label>
                            </div>
                          );
                        })}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Comment */}
              <FormField
                control={customerForm.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comment</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any special request..."
                        {...field}
                        className="h-24 mt-2 resize-none bg-background border-2 text-base md:text-base focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="col-span-1 rounded-md h-fit">
        <CardHeader>
          <CardTitle className="text-2xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="mt-4 space-y-4">
          <p className="flex justify-between items-center">
            <span>Subtotal</span>
            <span className="font-semibold">₹ {8100}</span>
          </p>
          <p className="flex justify-between items-center">
            <span>Taxes</span>
            <span className="font-semibold">₹ {82}</span>
          </p>
          <p className="flex justify-between items-center">
            <span>Delivery Charges</span>
            <span className="font-semibold">₹ {100}</span>
          </p>
          <p className="flex justify-between items-center">
            <span>Discount</span>
            <span className="font-semibold">₹ {0}</span>
          </p>

          <hr />

          <p className="flex justify-between items-center font-semibold">
            <span>Order total</span>
            <span>₹ {100}</span>
          </p>

          <Form {...couponForm}>
            <form
              onSubmit={couponForm.handleSubmit(handleCouponFormSubmit)}
              className="flex gap-3"
            >
              <FormField
                control={couponForm.control}
                name="couponCode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Coupon code"
                        {...field}
                        className="bg-background text-base md:text-base h-10 py-4 md:py-4 focus-visible:ring-0 rounded-sm border-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="" variant={"outline"} size={"lg"}>
                Apply
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            onClick={customerForm.handleSubmit(handleCustomerFormSubmit)}
            size={"lg"}
          >
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CheckoutForm;
