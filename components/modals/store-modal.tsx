"use client";

import * as z from "zod";
import i18next from "i18next";
import { zodI18nMap } from "zod-i18n-map";
import { zodResolver } from "@hookform/resolvers/zod";
import translation from "zod-i18n-map/locales/ja/zod.json";
import axios from "axios";

import { useStoreModal } from "@/hooks/user-store-modal";
import Modal from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "react-hot-toast";

i18next.init({
  lng: "ja",
  resources: {
    ja: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const res = await axios.post("/api/stores", values);

      window.location.assign(`/${res.data.id}`);
    } catch (error) {
      toast.error("ネットワークに問題があります。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="ストアを作成"
      description="商品を効率的に管理できる新しいストアを追加しましょう"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4 ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ストア名</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="例）アルバトロス"
                        {...field}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  disabled={loading}
                  variant="outline"
                  onClick={storeModal.onClose}
                >
                  取消
                </Button>
                <Button disabled={loading} type="submit">
                  次へ
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
