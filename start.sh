#!/bin/bash

# helm update
helm dependency update cluster/ingress-nginx
helm dependency update cluster/argocd

# kind
./kind create cluster --name infra --config cluster.yaml
kubectl cluster-info --context kind-infra

sleep 10

# ingress-nginx
kubectl create ns ingress-nginx
helm upgrade --namespace ingress-nginx --install ingress-nginx cluster/ingress-nginx

sleep 60

# argocd
kubectl create ns argocd
helm upgrade --namespace argocd --install argocd cluster/argocd

ARGO_ADMIN_PASSWORD=$(kubectl get pods -n argocd -l app.kubernetes.io/name=argocd-server -o name | cut -d'/' -f 2)
echo "**************************************************************"
echo "***** argocd admin password: ${ARGO_ADMIN_PASSWORD}"
echo "**************************************************************"
