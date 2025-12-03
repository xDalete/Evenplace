// Updated EventForm component with Zod schema matching Laravel rules
"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import Grid from "@/components/common/Grid";
import Select from "@/components/common/Select"; // Assume you have a Select component; create if needed
import styles from "./EventForm.module.scss";
import ImageFileInput from "@/components/common/ImageFileInput";
import { getEventoById, updateEvento } from "@/api/Evento";
import { Evento, EventoStatusEnum } from "@/lib/Types/EventTypes";
import Container from "@/components/common/Container";
import Loading from "@/components/common/Loading";
import { z } from "zod";
import Button from "@/components/common/Button";

// Updated Zod schema to match Laravel rules
const eventSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").max(255, "Nome deve ter no máximo 255 caracteres"),
  data: z.string().refine(val => !val || /^\d{4}-\d{2}-\d{2}$/.test(val), "Data deve estar no formato Y-m-d"),
  local: z.string().min(1, "Local é obrigatório").max(255, "Local deve ter no máximo 255 caracteres"),
  horario: z.string().refine(val => !val || /^\d{2}:\d{2}:\d{2}$/.test(val), "Horário deve estar no formato H:i:s"),
  valor_ingresso: z
    .number()
    .min(0, "Valor deve ser positivo")
    .refine(val => Number.isFinite(val) && Math.abs(val * 100) % 1 === 0, "Valor deve ter no máximo 2 casas decimais"),
  quantidade_vagas: z.number().int("Quantidade deve ser um inteiro").min(0, "Quantidade deve ser positiva"),
  meta_vendas: z.number().int("Meta deve ser um inteiro").min(0, "Meta deve ser positiva"),
  vagas_disponiveis: z
    .number()
    .int("Vagas disponíveis deve ser um inteiro")
    .min(0, "Vagas disponíveis deve ser positiva"),
  descricao: z.string(), // Just string, no min/max
  banner: z.instanceof(File).optional().or(z.null()),
  status: z.enum(EventoStatusEnum, { message: "Status inválido" })
});

type EventFormData = z.infer<typeof eventSchema>;

export const EventForm: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [submitting, setSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      nome: "",
      data: "",
      local: "",
      horario: "",
      descricao: "",
      valor_ingresso: 0,
      quantidade_vagas: 0,
      vagas_disponiveis: 0,
      meta_vendas: 0,
      banner: null,
      status: EventoStatusEnum.PROXIMO
    }
  });

  useEffect(() => {
    getEventoById(1)
      .then(response => {
        const data = response.data;
        reset({
          nome: data.nome,
          data: data.data,
          local: data.local,
          horario: data.horario,
          descricao: data.descricao || "",
          valor_ingresso: data.valor_ingresso || 0,
          quantidade_vagas: data.quantidade_vagas || 0,
          vagas_disponiveis: data.vagas_disponiveis || 0,
          meta_vendas: data.meta_vendas || 0,
          banner: null,
          status: data.status || EventoStatusEnum.PROXIMO
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [reset]);
  console.log(watch());

  const onSubmit = async (formData: EventFormData) => {
    setSubmitting(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "banner" && value instanceof File) {
        formDataToSend.append("banner", value);
      } else if (value !== null && value !== undefined && value !== "") {
        formDataToSend.append(key, value.toString());
      }
    });
    formDataToSend.append("_method", "PUT");
    console.log(formDataToSend);

    try {
      await updateEvento(1, formDataToSend);
      // Handle success
    } catch (error) {
      // Handle error
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className={styles.loadingContainer}>
        <Loading />
      </Container>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer} encType="multipart/form-data">
      <Grid gap="md">
        <Grid item xs={12} md={4}>
          <ImageFileInput
            name="banner"
            label="Banner do Evento"
            value={watch("banner")}
            onChange={file => setValue("banner", file)}
            fullWidth
          />
          {errors.banner && <p className={styles.error}>{errors.banner.message}</p>}
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid gap="md">
            <Grid item xs={12} sm={6}>
              <Input label="Nome do Evento" {...register("nome")} error={errors.nome?.message} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label="Data do Evento" type="date" {...register("data")} error={errors.data?.message} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input label="Local do Evento" {...register("local")} error={errors.local?.message} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Input
                label="Horário do Evento"
                type="time"
                step="1" // For seconds
                {...register("horario")}
                error={errors.horario?.message}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid gap="md">
        <Grid item xs={12} md={6}>
          <Textarea
            label="Descrição do Evento"
            placeholder="INSIRA UMA DESCRIÇÃO"
            {...register("descricao")}
            error={errors.descricao?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Select
            label="Status do Evento"
            {...register("status")}
            options={Object.values(EventoStatusEnum).map(status => ({
              value: status,
              label: status.charAt(0).toUpperCase() + status.slice(1)
            }))}
            error={!!errors.status?.message}
            helperText={errors.status?.message}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid gap="md">
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Valor do Ingresso"
            type="number"
            step="0.01"
            {...register("valor_ingresso", { valueAsNumber: true })}
            error={errors.valor_ingresso?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Quantidade de Vagas Totais"
            type="number"
            {...register("quantidade_vagas", { valueAsNumber: true })}
            error={errors.quantidade_vagas?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Vagas disponíveis"
            type="number"
            {...register("vagas_disponiveis", { valueAsNumber: true })}
            error={errors.vagas_disponiveis?.message}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Input
            label="Meta de Vendas"
            type="number"
            {...register("meta_vendas", { valueAsNumber: true })}
            error={errors.meta_vendas?.message}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Salvando..." : "Salvar Evento"}
      </Button>
    </form>
  );
};

export default EventForm;
