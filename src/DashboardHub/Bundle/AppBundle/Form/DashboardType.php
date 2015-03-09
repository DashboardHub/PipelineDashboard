<?php

namespace DashboardHub\Bundle\AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * Class DashboardType
 * @package DashboardHub\Bundle\AppBundle\Form
 */
class DashboardType extends AbstractType
{
    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(
            array(
                'data_class' => 'DashboardHub\Bundle\AppBundle\Entity\Dashboard'
            )
        );
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('repository')
            ->add(
                'theme',
                'choice',
                array(
                    'choices'  => array('default' => 'Default'),
                    'required' => true,
                )
            )
            ->add(
                'public',
                'radio',
                array(
                    'data'  => true,
                    'label' => 'Public Dashboard'
                )
            )
            ->add(
                'save',
                'submit',
                array('label' => 'Save')
            );
    }

    public function getName()
    {
        return 'dashboard';
    }
}
