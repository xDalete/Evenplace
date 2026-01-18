"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { createEvento, updateEvento } from "@/api/Evento";
import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Grid from "@/components/common/Grid";
import ImageFileInput from "@/components/common/ImageFileInput";
import Input from "@/components/common/Input";
import Loading from "@/components/common/Loading";
import Select from "@/components/common/Select";
import Textarea from "@/components/common/Textarea";
import { eventoSchema, eventoSchemaType } from "@/lib/schemas/eventoSchema";
import { Evento, EventoStatusEnum } from "@/lib/Types/EventTypes";

import styles from "./EventForm.module.scss";

type EventFormProps = {
  evento?: Evento;
  loading: boolean;
};

/**
 * Componente `EventForm` para criar ou editar eventos.
 * 
 * @param {Evento} [props.evento] - Objeto do evento a ser editado. Se não for fornecido, o formulário será usado para criar um novo evento.
 * @param {boolean} props.loading - Indica se os dados do evento estão sendo carregados.
 *
 * @example
 * // Exemplo de uso para criar um novo evento:
 * <EventForm loading={false} />
 *
 * @example
 * // Exemplo de uso para editar um evento existente:
 * const evento = {
 *   id: 1,
 *   nome: "Evento de Exemplo",
 *   data: "2023-12-25",
 *   descricao: "Descrição do evento",
 *   horario: "18:00",
 *   local: "Local do evento",
 *   meta_vendas: 100,
 *   quantidade_vagas: 200,
 *   status: "PROXIMO",
 *   vagas_disponiveis: 150,
 *   valor_ingresso: 50.0,
 *   banner: "url-do-banner.jpg"
 * };
 *
 * <EventForm evento={evento} loading={false} />
 */
export const EventForm: FC<EventFormProps> = ({ evento, loading }) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    watch
  } = useForm<eventoSchemaType>({
    defaultValues: evento
      ? {
          ...evento,
          banner: null
        }
      : {
          banner: null,
          data: "",
          descricao: "",
          horario: "",
          local: "",
          meta_vendas: 0,
          nome: "",
          quantidade_vagas: 0,
          status: EventoStatusEnum.PROXIMO,
          vagas_disponiveis: 0,
          valor_ingresso: 0
        },
    resolver: zodResolver(eventoSchema)
  });

  const onSubmit = async (formData: eventoSchemaType) => {
    setSubmitting(true);
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "banner" && value instanceof File) {
        formDataToSend.append("banner", value);
      } else if (value !== null && value !== undefined && value !== "") {
        formDataToSend.append(key, value.toString());
      }
    });
    console.log(formDataToSend);
    
    if (evento) {
      try {
        await toast.promise(updateEvento(evento?.id, formDataToSend), {
          error: "Erro ao salvar o evento.",
          loading: "Salvando evento...",
          success: "Evento salvo com sucesso!"
        });
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
    } else {
      try {
        await toast.promise(createEvento(formDataToSend), {
          error: "Erro ao salvar o evento.",
          loading: "Salvando evento...",
          success: "Evento salvo com sucesso!"
        });
      } catch (error) {
        console.log(error);
      } finally {
        setSubmitting(false);
      }
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
    <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
      <Grid gap="md">
        <Grid item md={4} xs={12}>
          <ImageFileInput
            fullWidth
            initialPreviewUrl={evento?.banner}
            label="Banner do Evento"
            name="banner"
            onChange={file => setValue("banner", file)}
            value={watch("banner")}
          />
          {errors.banner && <p className={styles.error}>{errors.banner.message}</p>}
        </Grid>
        <Grid item md={8} xs={12}>
          <Grid gap="md">
            <Grid item sm={6} xs={12}>
              <Input label="Nome do Evento" {...register("nome")} error={errors.nome?.message} fullWidth />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Input label="Data do Evento" type="date" {...register("data")} error={errors.data?.message} fullWidth />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Input label="Local do Evento" {...register("local")} error={errors.local?.message} fullWidth />
            </Grid>
            <Grid item sm={6} xs={12}>
              <Input
                label="Horário do Evento"
                step="1" // For seconds
                type="time"
                {...register("horario")}
                error={errors.horario?.message}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid gap="md">
        <Grid item md={6} xs={12}>
          <Textarea
            label="Descrição do Evento"
            placeholder="INSIRA UMA DESCRIÇÃO"
            {...register("descricao")}
            error={errors.descricao?.message}
            fullWidth
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Select
            label="Status do Evento"
            {...register("status")}
            error={!!errors.status?.message}
            fullWidth
            helperText={errors.status?.message}
            options={Object.values(EventoStatusEnum).map(status => ({
              label: status.charAt(0).toUpperCase() + status.slice(1),
              value: status
            }))}
          />
        </Grid>
      </Grid>
      <Grid gap="md">
        <Grid item md={3} sm={6} xs={12}>
          <Input
            label="Valor do Ingresso"
            step="0.01"
            type="number"
            {...register("valor_ingresso", { valueAsNumber: true })}
            error={errors.valor_ingresso?.message}
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Input
            label="Quantidade de Vagas Totais"
            type="number"
            {...register("quantidade_vagas", { valueAsNumber: true })}
            error={errors.quantidade_vagas?.message}
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Input
            label="Vagas disponíveis"
            type="number"
            {...register("vagas_disponiveis", { valueAsNumber: true })}
            error={errors.vagas_disponiveis?.message}
            fullWidth
          />
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <Input
            label="Meta de Vendas"
            type="number"
            {...register("meta_vendas", { valueAsNumber: true })}
            error={errors.meta_vendas?.message}
            fullWidth
          />
        </Grid>
      </Grid>
      <Button loading={submitting} type="submit">
        Salvar Evento
      </Button>
    </form>
  );
};

export default EventForm;
